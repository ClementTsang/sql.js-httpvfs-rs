import { createDbWorker, WorkerHttpvfs } from "sql.js-httpvfs";

let global_worker: WorkerHttpvfs | null = null;

export async function createBundledDbWorker(
  configs: any[],
  workerBuffer: Uint8Array,
  wasmBuffer: Uint8Array
) {
  const workerUrl = URL.createObjectURL(new Blob([workerBuffer]));
  const wasmBlob = new Blob([wasmBuffer], {
    type: "application/wasm",
  });
  const wasmUrl = URL.createObjectURL(wasmBlob);

  console.log(`workerUrl: ${workerUrl.toString()}`);
  console.log(`wasmUrl: ${wasmUrl.toString()}`);

  global_worker = await createDbWorker(
    configs,
    workerUrl.toString(),
    wasmUrl.toString()
  );
}

export async function createUrlDbWorker(
  configs: any[],
  workerUrl: string,
  wasmUrl: string
) {
  console.log(`workerUrl: ${workerUrl}`);
  console.log(`wasmUrl: ${wasmUrl}`);

  global_worker = await createDbWorker(configs, workerUrl, wasmUrl);
}

export function execQuery(query: string): Promise<any[]> {
  if (global_worker !== null) {
    return global_worker.db.query(query);
  } else {
    return Promise.reject(new Error("Global worker is undefined."));
  }
}
