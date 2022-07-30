use std::fs;

use appbase::prelude::*;
use jsonrpc_core::Params;
use jsonrpc_core::serde_json::Map;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

use crate::enumeration;
use crate::error::error::ExpectedError;
use crate::libs::serde::get_str;
use crate::message;
use crate::plugin::jsonrpc::JsonRpc;
use crate::types::channel::MultiSender;
use crate::types::enumeration::Enumeration;
use crate::types::sync::SyncMethod;

#[appbase_plugin(JsonRpc)]
pub struct SyncManager {
  senders: Option<MultiSender>,
}

enumeration!(SyncType; {BlockSync: "block_sync"});
message!(SyncManageMsg; {method: String});

impl Plugin for SyncManager {
  fn new() -> Self {
    SyncManager {
      senders: None,
    }
  }

  fn init(&mut self) {
    self.senders = Some(MultiSender::new(vec!["block_sync"]));
    self.add_methods();
  }

  fn startup(&mut self) {}

  fn shutdown(&mut self) {}
}

impl SyncManager {
  fn add_methods(&self) {
    let senders = self.senders.clone().unwrap();
    APP.run_with::<JsonRpc, _, _>(|jsonrpc| {
      jsonrpc.add_method(String::from("start_sync"), move |params: Params| {
        let response = match Self::manage_sync(SyncMethod::Start, params, &senders) {
          Ok(response) => response,
          Err(err) => json!({"error": err.to_string()}),
        };
        Box::new(futures::future::ok(response))
      });
    });

    let senders = self.senders.clone().unwrap();
    APP.run_with::<JsonRpc, _, _>(|jsonrpc| {
      jsonrpc.add_method(String::from("stop_sync"), move |params: Params| {
        let response = match Self::manage_sync(SyncMethod::Stop, params, &senders) {
          Ok(response) => response,
          Err(err) => json!({"error": err.to_string()}),
        };
        Box::new(futures::future::ok(response))
      });
    });

    APP.run_with::<JsonRpc, _, _>(|jsonrpc| {
      jsonrpc.add_method(String::from("get_sync"), move |params: Params| {
        let response = match Self::get_sync(params) {
          Ok(response) => response,
          Err(err) => json!({"error": err.to_string()}),
        };
        Box::new(futures::future::ok(response))
      });
    });
  }

  fn manage_sync(method: SyncMethod, params: Params, senders: &MultiSender) -> Result<Value, ExpectedError> {
    let params: Map<String, Value> = params.parse().unwrap();
    // let _ = task::verify(&params)?;
    let sync_type = get_str(&params, "sync_type")?;
    let sender = senders.get(sync_type);
    let _ = sender.send(SyncManageMsg::new(method.value()))?;
    Ok(Value::String(format!("requested! sync_type={}, method={}", sync_type, method.value())))
  }

  fn get_sync(params: Params) -> Result<Value, ExpectedError> {
    let params: Map<String, Value> = params.parse().unwrap();
    // let _ = task::verify(&params)?;
    let sync_type = get_str(&params, "sync_type")?;
    let sync_state = fs::read_to_string(format!("state/{}.json", sync_type))?;
    let state_json = serde_json::from_str(sync_state.as_str())?;
    Ok(Value::Object(state_json))
  }
}
