/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import config from "./config";
import icon from "./luckysheet-logo.svg";
import { IChart } from "../../core/datart";

/**
 * @summary LuckySheet
 * Document Link: https://mengshukeji.github.io/LuckysheetDocs/guide/#steps-for-usage
 * @param {*} { dHelper }, Datart Helper Utils
 * @return {*} void
 */
export function LuckySheetChart({ dHelper }): IChart & any {
  return {
    isISOContainer: "luckysheet-chart",
    chart: null,
    config,
    dependency: [
      "https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css",
      "https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css",
      "https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css",
      "https://cdn.jsdelivr.net/npm/luckysheet/dist/assets/iconfont/iconfont.css",
      "https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js",
      "https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js",
    ],
    geoMap: null,
    meta: {
      id: "experiment-luckysheet-chart",
      name: "chartName",
      icon: icon,
      requirements: [
        {
          group: 0,
          aggregate: 0,
        },
      ],
    },

    onMount(options, context) {
      if (options.containerId === undefined || !context.document) {
        return;
      }
      if (context.window.luckysheet) {
        context.window.luckysheet.create({
          container: options.containerId,
        });
      }

      // this.chart = context.window.echarts.init(
      //   context.document.getElementById(options.containerId),
      //   "default"
      // );
      // this._mouseEvents?.forEach((event) => {
      //   this.chart.on(event.name, event.callback);
      // });
    },

    onUpdated(props, context) {
      if (!props.dataset || !props.dataset.columns || !props.config) {
        return;
      }
      if (!this.isMatchRequirement(props.config)) {
        // this.chart?.clear();
        return;
      }
    },

    onUnMount() {
      // this.chart?.dispose();
    },

    onResize(opt, context) {
      // this.chart?.resize(context);
    },
  };
}
