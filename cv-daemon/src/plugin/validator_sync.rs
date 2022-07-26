use appbase::prelude::*;
use clap::Arg;
use serde_json::Value;

use crate::error::error::ExpectedError;
use crate::libs;
use crate::libs::request;
use crate::libs::serde::{get_array, get_object};
use crate::libs::sync_helper::load_sync_state;
use crate::plugin::postgres::{Postgres, PostgresMsg};
use crate::types::channel::MultiSender;
use crate::types::sync::SyncState;

#[appbase_plugin(Postgres)]
pub struct ValidatorSync {
  sync_state: Option<SyncState>,
  senders: Option<MultiSender>,
  receiver: Option<Receiver>,
}

impl Plugin for ValidatorSync {
  fn new() -> Self {
    APP.options.arg(Arg::new("validator::poll-interval").long("validator-poll-interval").takes_value(true));
    ValidatorSync {
      sync_state: None,
      senders: None,
      receiver: None,
    }
  }

  fn init(&mut self) {
    self.senders = Some(MultiSender::new(vec!("postgres", "slack")));
    self.receiver = Some(APP.channels.subscribe("validator_sync"));
    self.sync_state = Some(load_sync_state("validator_sync.json").unwrap());
  }

  fn startup(&mut self) {
    let receiver = self.receiver.take().unwrap();
    let sync_state = self.sync_state.take().unwrap();
    let senders = self.senders.take().unwrap();
    let app = APP.quit_handle().unwrap();

    Self::process(receiver, sync_state, senders, app);
  }

  fn shutdown(&mut self) {}
}

impl ValidatorSync {
  fn process(mut receiver: Receiver, mut sync_state: SyncState, senders: MultiSender, app: QuitHandle) {
    APP.spawn(async move {
      log::debug!("start to validator sync process");
      if let Ok(msg) = receiver.try_recv() {
        if let Err(err) = libs::sync_helper::message_handler(msg, &mut sync_state) {
          let _ = libs::error::warn_handler(senders.get("slack"), err);
        }
      }
      if sync_state.is_workable() {
        if let Err(err) = Self::sync(&mut sync_state, &senders).await {
          libs::sync_helper::error_handler(err, &mut sync_state, &senders);
        } else {
          sync_state.next_idx();
        }
      }
      if !app.is_quitting() {
        let poll_interval = libs::opt::get_value::<u64>("validator::poll-interval").unwrap_or(10000);
        tokio::time::sleep(tokio::time::Duration::from_millis(poll_interval)).await;
        Self::process(receiver, sync_state, senders, app);
      }
    });
  }

  async fn sync(sync_state: &mut SyncState, senders: &MultiSender) -> Result<(), ExpectedError> {
    let mut curr_offset = 0;
    loop {
      let sync_validator_api = format!("/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.offset={}", curr_offset);
      let validator_req = libs::sync_helper::create_req_url(sync_state.active_node(), sync_validator_api);
      let validator_res = request::get_async(validator_req.as_str()).await?;
      let pagination = get_object(&validator_res, "pagination")?;
      let next_key_opt = pagination.get("next_key");
      if next_key_opt.is_none() {
        return Err(ExpectedError::NoneError("validator next_key is none".to_string()));
      }

      let validators = get_array(&validator_res, "validators")?;
      let pg_sender = senders.get("postgres");
      let _ = pg_sender.send(PostgresMsg::new(String::from("cosmos_validator"), Value::Array(validators.to_owned()), sync_state.sync_idx as i64))?;

      let next_key = next_key_opt.unwrap();
      if next_key.is_null() {
        libs::sync_helper::save_state(&sync_state)?;
        break;
      }
      curr_offset += 100;
    }

    Ok(())
  }
}
