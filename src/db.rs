use wasm_bindgen::prelude::*;

#[wasm_bindgen(module = "/src/build/index.js")]
extern "C" {
    #[wasm_bindgen(js_name = createBundledDbWorker)]
    async fn create_db_blob_worker(configs: Vec<JsValue>, worker_blob: &[u8], wasm_blob: &[u8]);

    #[wasm_bindgen(js_name = createUrlDbWorker)]
    pub async fn create_db_worker(configs: Vec<JsValue>, worker_url: &str, wasm_url: &str);

    #[wasm_bindgen(catch, js_name = execQuery)]
    pub async fn exec_query(query: String) -> Result<JsValue, JsValue>;

}

pub async fn create_bundled_db_worker(configs: Vec<JsValue>) {
    const WORKER_BLOB: &[u8] = include_bytes!("./build/assets/sqlite.worker.js");
    const WASM_BLOB: &[u8] = include_bytes!("./build/assets/sql-wasm.wasm");

    create_db_blob_worker(configs, WORKER_BLOB, WASM_BLOB).await;
}
