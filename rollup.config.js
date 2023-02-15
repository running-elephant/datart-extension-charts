import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import svg from "rollup-plugin-svg";
import progress from "rollup-plugin-progress";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from '@rollup/plugin-node-resolve';

const fs = require("fs");

const pluginFolders = (assetFileNames) => {
  const dir = fs.readdirSync(`./plugins`);
  if (assetFileNames) {
    return dir.filter((f) => f.match(assetFileNames));
  }
  return dir.filter((f) => f.match(/^datart*/));
};

export default (commandLineArgs) => {
  const assetFileNames = commandLineArgs?.assetFileNames;
  const plugins = pluginFolders(assetFileNames);
  const config = (plugins || []).map((name) => {
    return {
      input: `plugins/${name}/index.js`,
      output: {
        file: `dist/${name}.iife.js`,
        format: "iife",
      },
      plugins: [
        nodeResolve(),
        progress({
          clearLine: false,
        }),
        json(),
        svg({ base64: false }),
        terser({
          compress: {
            defaults: false,
          },
        }),
        typescript(),
      ],
      watch: {
        include: "plugins/**",
        exclude: "node_modules/**",
      },
    };
  });
  return config;
};
