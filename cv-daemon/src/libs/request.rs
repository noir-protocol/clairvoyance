use serde_json::{Map, Value};

use crate::error::error::ExpectedError;
use crate::libs::serde::{get_string, get_u64};

pub async fn get_block_async(url: &str) -> Result<Map<String, Value>, ExpectedError> {
  let res = reqwest::get(url).await?;
  let status = res.status().clone();
  let body = res.text().await?;
  let parsed_body: Map<String, Value> = serde_json::from_str(body.as_str())?;
  if !status.is_success() {
    let error = get_string(&parsed_body, "error");
    let error_msg = if error.is_ok() {
      error.unwrap()
    } else {
      "request error".to_string()
    };
    return if error_msg == "requested block height is bigger then the chain length" {
      Err(ExpectedError::BlockHeightError(error_msg))
    } else {
      Err(ExpectedError::RequestError(error_msg))
    }
  }
  Ok(parsed_body)
}

pub async fn get_async(url: &str) -> Result<Map<String, Value>, ExpectedError> {
  let res = reqwest::get(url).await?;
  let status = res.status().clone();
  let body = res.text().await?;
  let parsed_body: Map<String, Value> = serde_json::from_str(body.as_str())?;
  if !status.is_success() {
    let error = get_string(&parsed_body, "message");
    let error_msg = if error.is_ok() {
      error.unwrap()
    } else {
      "request error".to_string()
    };
    return Err(ExpectedError::RequestError(error_msg));
  }
  Ok(parsed_body)
}

pub fn check_slash(input_str: String) -> String {
  let mut temp_str = input_str.clone();
  if !temp_str.ends_with("/") {
    temp_str += "/";
  }
  temp_str.to_owned()
}
