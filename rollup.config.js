import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import svg from "rollup-plugin-svg";
const fs = require("fs");

const pluginFolders = () => {
  const dir = fs.readdirSync(`./plugins`);
  return dir.filter((f) => f.match(/^datart*/)) || [];
};

export default pluginFolders().map((name) => {
  return {
    input: `plugins/${name}/index.js`,
    output: {
      file: `dist/${name}.iife.js`,
      format: "iife",
    },
    plugins: [json(), svg({ base64: false })],
  };
});
