import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

export default {
  input: ["./src/index.ts"],
  output: {
    dir: "../src/build/",
    format: "es",
    sourcemap: false,
  },
  plugins: [
    resolve(),
    typescript({
      compilerOptions: { module: "CommonJS" },
    }),
    commonjs({
      extensions: [".js", ".ts"],
    }),
    terser({ format: { comments: false } }),
    copy({
      targets: [
        {
          src: [
            "../sql.js-httpvfs/dist/sql-wasm.wasm",
            "../sql.js-httpvfs/dist/sqlite.worker.js",
          ],
          dest: "../src/build/assets/",
        },
      ],
    }),
  ],
};
