use wasm_bindgen::prelude::*;

#[wasm_bindgen(module = "/src/build/index.js")]
extern "C" {
    #[cfg(feature = "bundled")]
    #[wasm_bindgen(js_name = createBundledDbWorker)]
    async fn create_db_blob_worker(configs: Vec<JsValue>, worker_blob: &[u8], wasm_blob: &[u8]);

    /// Creates a new SQLite DB worker given a config, and the `str` paths to the worker file URL and the WASM file URL.
    ///
    /// Note that `wasm_url`, if a relative path, is relative to the `worker_url` file!
    #[wasm_bindgen(js_name = createUrlDbWorker)]
    pub async fn create_db_worker(configs: Vec<JsValue>, worker_url: &str, wasm_url: &str);

    /// Executes an SQL query, assuming the SQLite DB worker is initialized. If not, this function will return an
    /// `Error`.
    #[wasm_bindgen(catch, js_name = execQuery)]
    pub async fn exec_query(query: String) -> Result<JsValue, JsValue>;

    /// A check to see if the SQLite DB worker is initialized.
    #[wasm_bindgen(js_name = isInitialized)]
    pub fn is_worker_initialized() -> bool;

}

/// Creates a new SQLite DB worker given a config.
///
/// Uses bundled blobs of the worker and WASM files to avoid needing to manually bundle them along with
/// your application. This is enabled by enabling the `bundled` feature.
#[cfg(feature = "bundled")]
pub async fn create_bundled_db_worker(configs: Vec<JsValue>) {
    const WORKER_BLOB: &[u8] = include_bytes!("./build/assets/sqlite.worker.js");
    const WASM_BLOB: &[u8] = include_bytes!("./build/assets/sql-wasm.wasm");

    create_db_blob_worker(configs, WORKER_BLOB, WASM_BLOB).await;
}
