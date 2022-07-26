use std::collections::HashMap;

use appbase::prelude::*;

#[derive(Clone)]
pub struct MultiSender {
  sender_map: HashMap<String, Sender>,
}

impl MultiSender {
  pub fn new(senders: Vec<&str>) -> Self {
    let mut sender_map = HashMap::new();
    for sender in senders {
      sender_map.insert(sender.to_string(), APP.channels.get(sender));
    }
    MultiSender {
      sender_map
    }
  }

  pub fn get(&self, name: &str) -> Sender {
    match self.sender_map.get(name) {
      None => APP.channels.get(name),
      Some(sender) => sender.clone()
    }
  }
}
