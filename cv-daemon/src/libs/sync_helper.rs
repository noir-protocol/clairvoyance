use std::fs;

use serde_json::Value;

use crate::error::error::ExpectedError;
use crate::libs;
use crate::libs::opt::opt_to_result;
use crate::libs::request::check_slash;
use crate::libs::serde::get_str;
use crate::types::channel::MultiSender;
use crate::types::enumeration::Enumeration;
use crate::types::sync::{SyncMethod, SyncState, SyncStatus};

pub fn load_sync_state(sync_type: &str) -> Result<SyncState, ExpectedError> {
  let state_res = fs::read_to_string(format!("state/{}", sync_type));
  if state_res.is_ok() {
    let json_value: Value = serde_json::from_str(state_res.unwrap().as_str())?;
    let sync_state_map = opt_to_result(json_value.as_object())?;
    Ok(SyncState::from(sync_state_map))
  } else {
    log::error!("{}", state_res.err().unwrap());
    let new_sync = fs::read_to_string(format!("sync/{}", sync_type))?;
    let json_value: Value = serde_json::from_str(new_sync.as_str())?;
    let sync_state_map = opt_to_result(json_value.as_object())?;
    Ok(SyncState::new(sync_state_map))
  }
}

pub fn error_handler(err: ExpectedError, sync_state: &mut SyncState, senders: &MultiSender) {
  match err {
    ExpectedError::BlockHeightError(err) => log::debug!("{}", err.to_string()),
    ExpectedError::FilterError(err) => {
      log::debug!("{}", err.to_string());
      sync_state.next_idx();
    },
    ExpectedError::RequestError(err) => log::error!("{}", err.to_string()),
    _ => {
      log::error!("{}", err.to_string());
      sync_state.handle_error(err.to_string());
      let _ = libs::error::error_handler(senders.get("slack"), err);
    }
  };
}

pub fn save_state(sync_state: &SyncState) -> Result<(), ExpectedError> {
  let json_str = serde_json::to_string_pretty(sync_state)?;
  fs::write(format!("state/{}.json", sync_state.sync_type), json_str)?;
  Ok(())
}

pub fn create_req_url(node_url: String, api: String) -> String {
  let adjusted_url = check_slash(node_url);
  format!("{}{}", adjusted_url, api)
}

pub fn message_handler(message: Value, sync_state: &mut SyncState) -> Result<(), ExpectedError> {
  let parsed_msg = opt_to_result(message.as_object())?;
  let method = opt_to_result(SyncMethod::find(get_str(parsed_msg, "method")?))?;
  match method {
    SyncMethod::Start => {
      sync_state.status(SyncStatus::Working);
    }
    SyncMethod::Stop => {
      sync_state.status(SyncStatus::Stopped);
    }
  };
  save_state(&sync_state)?;
  Ok(())
}
