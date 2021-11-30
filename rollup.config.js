import json from "@rollup/plugin-json";

export default {
  input: "plugins/amap/index.js",
  output: {
    file: "bundle.js",
    format: "cjs",
  },
  plugins: [json()],
};
