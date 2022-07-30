use appbase::prelude::*;

use crate::plugin::block_sync::BlockSync;
use crate::plugin::sync_manager::SyncManager;

mod plugin;
mod types;
mod libs;
mod error;

fn main() {
  env_logger::init();
  APP.register::<BlockSync>();
  APP.register::<SyncManager>();
  APP.init();
  APP.plugin_init::<BlockSync>();
  APP.plugin_init::<SyncManager>();
  APP.startup();
  APP.execute();
}
