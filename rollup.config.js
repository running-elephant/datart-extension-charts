import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "plugins/datart-amap/index.js",
  output: [
    { file: "dist/datart-amap.iife.js", format: "iife" },
    // {
    //   file: "dist/datart-amap.min.js",
    //   format: "iife",
    //   plugins: [
    //     terser({
    //       compress: {
    //         negate_iife: false
    //       },
    //       format: {
    //         wrap_iife: true,
    //       },
    //     }),
    //   ],
    // },
  ],
  plugins: [json()],
};
