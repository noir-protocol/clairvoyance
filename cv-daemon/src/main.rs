use appbase::prelude::*;

use crate::plugin::block_sync::BlockSync;
use crate::plugin::proposal_sync::ProposalSync;
use crate::plugin::sync_manager::SyncManager;
use crate::plugin::validator_sync::ValidatorSync;

mod plugin;
mod types;
mod libs;
mod error;

fn main() {
  env_logger::init();
  APP.register::<BlockSync>();
  APP.register::<ProposalSync>();
  APP.register::<ValidatorSync>();
  APP.register::<SyncManager>();
  APP.init();
  APP.plugin_init::<BlockSync>();
  APP.plugin_init::<ProposalSync>();
  APP.plugin_init::<ValidatorSync>();
  APP.plugin_init::<SyncManager>();
  APP.startup();
  APP.execute();
}
