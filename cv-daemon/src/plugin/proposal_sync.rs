use appbase::prelude::*;
use clap::Arg;
use serde_json::{from_str, Value};

use crate::error::error::ExpectedError;
use crate::libs;
use crate::libs::opt::get_value;
use crate::libs::request;
use crate::libs::serde::{get_array, get_object, get_str};
use crate::libs::sync_helper::load_sync_state;
use crate::plugin::postgres::{Postgres, PostgresMsg};
use crate::types::channel::MultiSender;
use crate::types::sync::SyncState;

#[appbase_plugin(Postgres)]
pub struct ProposalSync {
  sync_state: Option<SyncState>,
  senders: Option<MultiSender>,
  receiver: Option<Receiver>,
}

impl Plugin for ProposalSync {
  fn new() -> Self {
    APP.options.arg(Arg::new("proposal::poll-interval").long("proposal-poll-interval").takes_value(true));
    ProposalSync {
      sync_state: None,
      senders: None,
      receiver: None,
    }
  }

  fn init(&mut self) {
    self.senders = Some(MultiSender::new(vec!("postgres", "slack")));
    self.receiver = Some(APP.channels.subscribe("proposal_sync"));
    self.sync_state = Some(load_sync_state("proposal_sync.json").unwrap());
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

impl ProposalSync {
  fn process(mut receiver: Receiver, mut sync_state: SyncState, senders: MultiSender, app: QuitHandle) {
    APP.spawn(async move {
      log::debug!("start to proposal sync process");
      if let Ok(msg) = receiver.try_recv() {
        if let Err(err) = libs::sync_helper::message_handler(msg, &mut sync_state) {
          let _ = libs::error::warn_handler(senders.get("slack"), err);
        }
      }
      if sync_state.is_workable() {
        if let Err(err) = Self::sync(&mut sync_state, &senders).await {
          libs::sync_helper::error_handler(err, &mut sync_state, &senders);
        } else {}
      }
      if !app.is_quitting() {
        let poll_interval = get_value::<u64>("proposal::poll-interval").unwrap_or(10000);
        tokio::time::sleep(tokio::time::Duration::from_millis(poll_interval)).await;
        Self::process(receiver, sync_state, senders, app);
      }
    });
  }

  async fn sync(sync_state: &mut SyncState, senders: &MultiSender) -> Result<(), ExpectedError> {
    let mut curr_offset = (sync_state.sync_idx / 100) * 100;
    let pg_sender = senders.get("postgres");
    let mut max_idx = sync_state.sync_idx;
    loop {
      let sync_proposal_api = format!("cosmos/gov/v1beta1/proposals?pagination.offset={}", curr_offset);
      let proposal_req = libs::sync_helper::create_req_url(sync_state.active_node(), sync_proposal_api);
      let proposal_res = request::get_async(proposal_req.as_str()).await?;
      let pagination = get_object(&proposal_res, "pagination")?;
      let next_key_opt = pagination.get("next_key");
      if next_key_opt.is_none() {
        return Err(ExpectedError::NoneError("proposal next_key is none".to_string()));
      }

      let proposals = get_array(&proposal_res, "proposals")?;
      for proposal_value in proposals {
        let proposal_opt = proposal_value.as_object();
        if proposal_opt.is_none() {
          return Err(ExpectedError::TypeError("proposal_value is not object".to_string()));
        }
        let proposal = proposal_opt.unwrap();
        let id_str = get_str(&proposal, "proposal_id")?;
        let proposal_id = from_str::<u64>(id_str)?;
        if proposal_id > max_idx {
          let _ = pg_sender.send(PostgresMsg::new(String::from("cosmos_proposal"), Value::Object(proposal.clone()), -1))?;
          max_idx = proposal_id;
        }
      }
      let next_key = next_key_opt.unwrap();
      if next_key.is_null() {
        sync_state.update_sync_idx(max_idx);
        libs::sync_helper::save_state(&sync_state)?;
        break;
      }
      curr_offset += 100;
    }
    Ok(())
  }
}
