# sql.js-httpvfs-rs

A _very_ experimental, basic, and slightly ridiculous-sounding Rust wrapper around
[sql.js-httpvfs](https://github.com/phiresky/sql.js-httpvfs), for use in stuff like WASM web applications.

**Note**: This is **not** intended for any serious or production use, at least for now. It's just quick wasm-bindgen
bindings to be called by a Rust application, and is mostly an experiment into what might work. You shouldn't really
expect too much support from this.

## Usage

Add the crate to your `Cargo.toml` file as such:

```toml
[dependencies]
sql-js-httpvfs-rs = "0.0.1"
```

Then, in your Rust code, you can create a worker using something like:

```rust
const DB_CONFIG: &str = r#"
{
    "from": "inline",
    "config": {
        "serverMode": "full",
        "requestChunkSize": 1024,
        "url": "../databases/db.sqlite3"
    }
}
"#;

let v: serde_json::Value = serde_json::from_str(DB_CONFIG).unwrap();
let configs = vec![JsValue::from_serde(&v).unwrap()];

let worker_url = "./static/code/sqlite.worker.js";
let wasm_url = "./sql-wasm.wasm";

create_db_worker(configs, worker_url, wasm_url).await;
```

If you wish to use the internally bundled version of the WASM and worker files to avoid having to bundle things, you
could instead enable the `bundled` feature - note that this may cause some problems with regards to the expected
paths for the databases.

## Building

If instead you want to build from scratch, follow these steps:

1. Clone the repo.

   ```bash
   git clone https://github.com/ClementTsang/sql.js-httpvfs-rs
   ```

2. Build sql.js-httpvfs. There should be a `dist/` folder in `sql.js-httpvfs`.

   ```bash
   cd sql.js-httpvfs

   # First you have to build sql.js
   cd sql.js
   yarn build

   # Then build sql.js-httpvfs
   cd ..
   yarn build
   ```

   You can find more instructions about this [on the sql.js-httpvfs repo](https://github.com/ClementTsang/sql.js-httpvfs).

3. Build via rollup.

   ```bash
   cd ../js
   npm run build
   ```

4. Build the Rust wrapper.

   ```bash
   cd ..
   cargo build
   ```

## Motivation

The driving force for this was for fun little Rust-based web projects, like [opal](https://github.com/ClementTsang/opal).

## Thanks

- [sql.js-httpvfs](https://github.com/phiresky/sql.js-httpvfs) and phiresky in the first place.
  This is just a wrapper around that much more innovative idea.
- Approach to writing this wrapper was inspired by [Material Yew](https://github.com/hamza1311/material-yew).
