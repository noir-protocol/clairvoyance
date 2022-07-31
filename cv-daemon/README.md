# Clairvoyance Daemon
The Clairvoyance Daemon (CV Daemon) is a tool for crawling Cosmos appchain data.
This app consists of several task plugins to crawl data and a postgresql plugin to store data.
The task plugin is controlled by the JSON-RPC plugin, and when there is an issue in the operation of the task, the issue can be forwarded to the admin through Slack and Email.
The state of each task is synced to json format file, and even if the app goes down and restarts, it continues from the synced state.

## Task Plugin
The task plugin is responsible for synchronizing data through crawling.
There are plugins that sync data through Loop and Polling block and transactions.

### Load Task
At startup, each task plugin attempts to read the task state through a function called `load_sync_state`.
At this time, it checks if there is synced task information in state path, and if there is no saved task state information, the task in the sync path is loaded to create the first task state.  
The task json has the form below.

```json
{
  "sync_type": "block_sync",
  "chain_name": "cosmos",
  "chain_id": "cosmoshub-4",
  "from_idx": 1,
  "endpoints": [
    "https://cosmoshub-4--lcd--archive.datahub.figment.io/apikey/{apikey}"
  ],
  "endpoint_idx": 0,
  "filter": ""
}

```
`from_idx` is a parameter value required when fetching data by polling method. Block Height or index values are these.
`end_point` means the end point requesting data, and multiple end points can be input as an array. When requesting polling, the request is made using the first value of the array, and if an error occurs, the request is automatically made to the next end point of the array.
`filter` is used to filter data. "filter": in the form of "proposer_address=57713BB7421C7FEB381B863FC87DED5E829AA961", currently provides four operators: `=`, `()`, `&`, and `|`. The meaning of the preceding filter means that only data in which 'proposer_address' is '57713BB7421C7FEB381B863FC87DED5E829AA961' in json data will be used and the rest will be skipped.

### Control Task
Loop Polling tasks are controlled via JSON-RPC.
There are a total of 3 methods, which are `start_sync`, `stop_sync` and `get_sync`. `get_sync` is the method that can check the status of task, and the rest are methods that control the state of the task.
`start_sync` restarts a task that is stopped or a task that is in an error state.
`stop_sync` stops the running task.
The above three methods to control the task state all require a task as params.
```json
{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "start_sync",
    "params": {
        "sync_type": "block_sync"
    }
}
```
`get_sync` checks the state of tasks that have been synced so far. It also needs `sync_type` for params.

### Polling Interval
The Loop Polling task can adjust the synchronization speed by adjusting the `poll-interval` value in `config.toml`.
```toml
[block]
poll-interval=1000
```

## PostgreSQL Plugin
The postgres plugin is a plugin responsible for storing PostgreSQL DB data.
Data crawled in task is delivered in message form to postgres plugin along with schema name, and postgres plugin saves data by changing data into insert query according to predefined schema and executing the query.
Since `$field_name$` is replaced with an actual value in the process of creating an insert query, care must be taken to ensure that there is no data stored in that form.

### Defining Schema
The schema follows the rules of JSON Schema.
The schema has schema name as the key, and has an object called `attributes` whose value represents the actual schema configuration.
`attributes` consists of objects whose key is column name.
An item in `attributes` consists of a type and a description.
The types allowed in JSON Schema are `string`, `integer`, `number`, `boolean`, `object`, and `array`, and nullable is indicated as follows. ['string', 'null']
The description means the field value in the data, and it can be viewed as a key that matches the field value to the column of the DB table.
For example, in the `l2_tx_block` that gets the tx data of L2 geth, there is a field called ‘from’ in tx. However, when saving to DB, it is saved as `from_address`, so it has the form below.
```json
  "cosmos_block": {
    "attributes": {
      "hash": {
        "type":  [ "string", "null" ],
        "description": "block_id.hash"
      },
      ...
      "num_txs": {
        "type": "integer",
        "description": "num_txs"
      }
    },
    "indexes": [ [ "hash" ], [ "height" ] ],
    "uniques": [ [ "hash" ], [ "height" ] ]
  },
```
`indexes` is a field to add an index to the column. It has an array in an array, and the sub-array consists of column names. This allows you to create multi-column indexes.
`uniques` is a field for adding a unique constraint to a column. It has the same format as `indexes`, and you can also add multi-column unique conditions.

### Loading Schema
postgres plugin executes `load_schema` method to load schema data according to the predefined schema json.
It automatically reads in schema path.
```rust
fn load_schema() -> Result<HashMap<String, PostgresSchema>, ExpectedError> {
  let schema_dir = fs::read_dir("schema/").unwrap();
  let mut schema_files: Vec<String> = Vec::new();
  for file in schema_dir {
    let file_name = file.unwrap().path().display().to_string();
    if file_name.ends_with(".json") {
      log::debug!("add schema! schema_name={}", file_name);
      schema_files.push(file_name);
    }
  }
  ...
}
```

### Plugin Configuration
The postgres plugin requires `host`, `port`, `dbname`, `user`, and `password` settings for PostgreSQL DB access.
These values can be entered through config.toml.
```toml
[postgres]
host="localhost"
port="5432"
dbname="postgres"
user="root"
password="postgresql"
```

## Slack Plugin
The slack plugin serves to deliver the log generated during operation to the admin.

### Slack Webhook
1. create workspace and add channel
- [Create Workspace Guide](https://slack.com/intl/en-kr/help/articles/206845317-Create-a-Slack-workspace)
- [Create Channel Guide](https://slack.com/intl/en-kr/help/articles/201402297-Create-a-channel)

2. add slack app and activate incoming webhooks
- [Setup App Guide](https://api.slack.com/authentication/basics)
- [Setup Incoming Hooks Guide](https://api.slack.com/messaging/webhooks)

3. enter webhook url into config.toml
```toml
[slack]
activate=true
info="https://hooks.slack.com/services/..."
warn="https://hooks.slack.com/services/..."
error="https://hooks.slack.com/services/..."
```

### Activating Slack
To activate the slack plugin, you need to change slack activate in config.toml to true.
```toml
[slack]
activate=true
...
```

## config.toml
Various configuration values required to run the Clairvoyance Daemon are managed in `config.toml`.
These values can also be entered in the form of `--jsonrpc-host 0.0.0.0` at run time.
The path of `config.toml` is located in `~/.config/cv-damon/config`, but the path has been modified so that the project root path can be used in the following executable statements and docker.
When building and executing images with docker, be careful because `config.docker.toml` in the root path is used.

## Run
```shell
RUST_LOG=INFO && cargo run --package cv-daemon --bin cv-daemon -- --config-dir .
```

## Docker
### Build Docker Image
When creating a docker image, `config.docker.toml`, `schema`, `abi`, and `task` in the project folder are used in the docker image. You can add and edit files as needed and then build the image.

```shell
docker build -t cv-daemon .
```

### Run Docker
```shell
docker run -d -p 9999:9999 \
-v /absolute/host/path/task:/cv-daemon/task \
-v /absolute/host/path/schema:/cv-daemon/schema \
-v /absolute/host/path/config.docker.toml:/cv-daemon/config.toml \
--name cv-daemon \
cv-daemon:latest
```
