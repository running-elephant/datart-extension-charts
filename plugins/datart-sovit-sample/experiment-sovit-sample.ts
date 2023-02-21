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
import icon from "./sovit-logo.svg";
import { IChart } from "../../core/datart";

/**
 * @summary
 * Integrate with amap echart extions, more detail please check https://www.sovitjs.com/document-new-api-zzmefu.html
 * @param {*} { dHelper }, Datart Helper Utils
 * @return {*} void
 */
export function SovitChart({ dHelper }): IChart & any {
  return {
    isISOContainer: "sovit-sample",
    chart: null,
    config,
    dependency: [
      "https://admin.sovitjs.com/static/sovitjs/jquery-ui.css",
      "https://admin.sovitjs.com/static/sovitjs/SovitChartPaser.min.js",
    ],
    meta: {
      id: "experiment-sovit-smaple",
      name: "chartName",
      icon: icon,
      requirements: [
        {
          group: 1,
          aggregate: [1, 2],
        },
      ],
    },

    onMount(options, context) {
      if (options.containerId === undefined || !context.document) {
        return;
      }

      if ("SovitChartPaser" in context.window) {
        const SovitChartPaser = context.window.SovitChartPaser;
        const sceneChartMain = new SovitChartPaser.SceneMain({
          apiurl: "https://admin.sovitjs.com/restapi",
          publishType: 1, //1为在线引用组件
        });

        sceneChartMain.initChart(
          options.containerId,
          {
            pageId: '3221068859372994564',
          },
          function (comId, eventType, reData) {
            console.log(
              `comId, eventType, reData ---> `,
              comId,
              eventType,
              reData
            );
          }
        );
      }
    },

    onUpdated(props, context) {
      if (!props.dataset || !props.dataset.columns || !props.config) {
        return;
      }
      if (!this.isMatchRequirement(props.config)) {
        this.chart?.clear();
        return;
      }

      // Node: especially clear before map dispose
      this.chart?.clear();
      const newOptions = this.getOptions(props.dataset, props.config);
      this.chart?.setOption(Object.assign({}, newOptions), true);
    },

    onUnMount() {
      this.chart?.dispose();
    },

    onResize(opt, context) {
      this.chart?.resize(context);
    },

    getOptions(dataset, config) {
      const styleConfigs = config.styles;
      const dataConfigs = config.datas || [];
      const groupConfigs = dataConfigs
        .filter((c) => c.type === "group")
        .flatMap((config) => config.rows || []);
      const aggregateConfigs = dataConfigs
        .filter((c) => c.type === "aggregate")
        .flatMap((config) => config.rows || []);
      const sizeConfigs = dataConfigs
        .filter((c) => c.type === "size")
        .flatMap((config) => config.rows || []);

      const chartDataSet = dHelper.transformToDataSet(
        dataset.rows,
        dataset.columns,
        dataConfigs
      );
      const theme = dHelper.getValue(styleConfigs, ["map", "theme"]);
      return null;
    },
  };
}
