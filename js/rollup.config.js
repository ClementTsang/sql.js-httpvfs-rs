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
    exports: "named",
  },
  plugins: [
    resolve(),
    commonjs(),
    copy({
      targets: [
        {
          src: [
            "./node_modules/sql.js-httpvfs/dist/sql-wasm.wasm",
            "./node_modules/sql.js-httpvfs/dist/sqlite.worker.js",
          ],
          dest: "../src/build/assets/",
        },
      ],
    }),
    typescript(),
    terser({ format: { comments: false } }),
  ],
  onwarn(warning, warn) {
    // Suppress some warnings
    // if (warning.code === "EVAL") return;
    // if (warning.code === "THIS_IS_UNDEFINED") return;
    warn(warning);
  },
};
