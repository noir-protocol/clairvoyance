use std::str::FromStr;

use serde_json::{Map, Value};

use crate::error::error::ExpectedError;
use crate::libs::opt::{opt_ref_to_result, opt_to_result};

pub fn find_value(values: &Map<String, Value>, target_name: &str) -> Value {
  if values.get(target_name).is_some() {
    values.get(target_name).unwrap().clone()
  } else {
    for (_, value) in values.iter() {
      match value {
        Value::Object(value_obj) => {
          let ret_value = find_value(value_obj, target_name);
          if ret_value.is_null() {
            continue;
          } else {
            return ret_value;
          }
        }
        Value::Array(value_vec) => {
          for element in value_vec {
            if element.is_object() {
              let ret_value = find_value(element.as_object().unwrap(), target_name);
              if ret_value.is_null() {
                continue;
              } else {
                return ret_value;
              }
            }
          }
        }
        _ => {}
      }
    }
    Value::Null
  }
}

pub fn unwrap<'a>(params: &'a Map<String, Value>, name: &'a str) -> Result<&'a Value, ExpectedError> {
  Ok(opt_to_result(params.get(name), format!("unwrap failed! {} is none!", name))?)
}

pub fn get_str<'a>(params: &'a Map<String, Value>, name: &'a str) -> Result<&'a str, ExpectedError> {
  let unwrapped = unwrap(params, name)?;
  Ok(opt_to_result(unwrapped.as_str(), format!("unwrap failed! {} is none!", name))?)
}

pub fn get_string(params: &Map<String, Value>, name: &str) -> Result<String, ExpectedError> {
  let result = get_str(params, name)?;
  Ok(String::from(result))
}

pub fn get_u64(params: &Map<String, Value>, name: &str) -> Result<u64, ExpectedError> {
  let unwrapped = unwrap(params, name)?;
  Ok(opt_to_result(unwrapped.as_u64(), format!("get_u64 failed! {} is none!", name))?)
}

pub fn get_object<'a>(params: &'a Map<String, Value>, name: &'a str) -> Result<&'a Map<String, Value>, ExpectedError> {
  let unwrapped = unwrap(params, name)?;
  Ok(opt_to_result(unwrapped.as_object(), format!("get_object failed! {} is none!", name))?)
}

pub fn get_array<'a>(params: &'a Map<String, Value>, name: &'a str) -> Result<&'a Vec<Value>, ExpectedError> {
  let unwrapped = unwrap(params, name)?;
  Ok(opt_to_result(unwrapped.as_array(), format!("get_array failed! {} is none!", name))?)
}

pub fn find_value_by_path(params: &Map<String, Value>, path: &str) -> Value {
  let split = path.split(".").collect::<Vec<&str>>();
  if split.len() == 0 {
    return Value::Null;
  }
  let mut params = params;

  for i in 0..split.len() {
    if i == split.len() - 1 {
      return if let Ok(target) = unwrap(params, split[i]) {
        target.clone()
      } else {
        Value::Null
      };
    } else {
      if let Ok(found) = get_object(params, split[i]) {
        params = found;
      } else {
        return Value::Null;
      }
    }
  }
  Value::Null
}

pub fn get_string_vec(params: &Map<String, Value>, name: &str) -> Vec<String> {
  params.get(name).unwrap().as_array().unwrap().iter().map(|item| { String::from(item.as_str().unwrap()) }).collect()
}

pub fn filter(values: &Map<String, Value>, filter: String) -> Result<bool, ExpectedError> {
  if filter.trim().is_empty() {
    return Ok(true);
  }
  let mut calc_vec: Vec<String> = Vec::new();
  let mut key_value = String::new();
  let filter_chars = filter.chars();
  for c in filter_chars {
    if c == '&' || c == '|' || c == '(' || c == ')' {
      if !key_value.trim().is_empty() {
        let calc_result = filter_value(values, &key_value)?;
        calc_vec.push(calc_result.to_string());
      }
      calc_vec.push(String::from(c));
      key_value = String::new();
    } else {
      key_value.push(c);
    }
  }
  if !key_value.trim().is_empty() {
    let calc_result = filter_value(values, &key_value)?;
    calc_vec.push(calc_result.to_string());
  }

  let mut bool_stack: Vec<bool> = Vec::new();
  let mut calc_stack: Vec<String> = Vec::new();
  for vec_item in calc_vec {
    if vec_item == ")" {
      while opt_ref_to_result(calc_stack.last(), "filter failed! calc_stack is empty!".to_string())? != "(" {
        if bool_stack.len() < 2 {
          return Err(ExpectedError::InvalidError(String::from("filter format error!")));
        }
        let calc_ret = filter_calc(&mut bool_stack, &mut calc_stack)?;
        bool_stack.push(calc_ret);
      }
      calc_stack.pop();
    } else {
      if vec_item == "(" || vec_item == "&" || vec_item == "|" {
        calc_stack.push(vec_item.clone());
      } else {
        bool_stack.push(bool::from_str(vec_item.as_str()).unwrap());
      }
    }
  }
  while !calc_stack.is_empty() {
    let calc_ret = filter_calc(&mut bool_stack, &mut calc_stack)?;
    bool_stack.push(calc_ret);
  }
  let ret = opt_to_result(bool_stack.pop(), "filter failed! bool_stack is empty!".to_string())?;
  Ok(ret)
}

fn filter_value(values: &Map<String, Value>, key_value: &String) -> Result<bool, ExpectedError> {
  let mut split_kv = key_value.split("=");
  if split_kv.clone().count() != 2 {
    return Err(ExpectedError::TypeError(String::from("invalid filter condition format! example='key=val'")));
  }
  let key = split_kv.next().unwrap().trim();
  let value = split_kv.next().unwrap().trim();
  let found = if key.contains(".") {
    find_value_by_path(values, key)
  } else {
    find_value(values, key)
  };
  let found_val = match found {
    Value::String(s) => s,
    _ => found.to_string(),
  };
  Ok(value == found_val.as_str())
}

fn filter_calc(bool_stack: &mut Vec<bool>, calc_stack: &mut Vec<String>) -> Result<bool, ExpectedError> {
  let calc_op = opt_to_result(calc_stack.pop(), "filter_calc failed! calc_stack is empty!".to_string())?;
  let top = opt_to_result(bool_stack.pop(), "filter_calc failed! bool_stack first value is empty!".to_string())?;
  let second = opt_to_result(bool_stack.pop(), "filter_calc failed! bool_stack second value  is empty!".to_string())?;
  if calc_op == "&" {
    Ok(top & second)
  } else {
    Ok(top | second)
  }
}

#[cfg(test)]
mod serde {
  use serde_json::{json, Map, Value};

  use crate::libs::serde;

  #[test]
  fn filter_success_test() {
    let mut test_map = Map::new();
    test_map.insert(String::from("key1"), Value::String(String::from("val1")));
    test_map.insert(String::from("key2"), json!({"sub_key1": "sub_val1"}));
    test_map.insert(String::from("key3"), json!(100));

    let ret = serde::filter(&test_map, String::from("(key1 = val1 & sub_key1 = sub_val1 & key3 =101) | key4=null | key3=101")).unwrap();
    assert_eq!(ret, true);
  }

  #[test]
  fn filter_fail_test() {
    let mut test_map = Map::new();
    test_map.insert(String::from("key1"), Value::String(String::from("val1")));
    test_map.insert(String::from("key2"), json!({"sub_key1": "sub_val1"}));
    test_map.insert(String::from("key3"), json!(100));
    test_map.insert(String::from("key4"), Value::String(String::from("not_null")));

    let ret = serde::filter(&test_map, String::from("(key1 = val1 & sub_key1 = sub_val1 & key3 =100) & key4=null")).unwrap();
    assert_eq!(ret, false);
  }
}
