import { createUrlDbWorker, execQuery } from "../../../src/build/index.js";

const workerUrl = new URL(
  "../../../src/build/assets/sqlite.worker.js",
  import.meta.url
);
const wasmUrl = new URL(
  "../../../src/build/assets/sql-wasm.wasm",
  import.meta.url
);

async function load() {
  await createUrlDbWorker(
    [
      {
        from: "inline",
        config: {
          serverMode: "full",
          url: "/example.sqlite3",
          requestChunkSize: 4096,
        },
      },
    ],
    workerUrl.toString(),
    wasmUrl.toString()
  );

  const result = await execQuery(`select * from mytable`);

  document.body.textContent = JSON.stringify(result);
}

load();
