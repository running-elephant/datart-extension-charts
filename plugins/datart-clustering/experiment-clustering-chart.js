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

import Icon from "./icon.svg";
import SampleData from "./sample";

const DATART_TRANSLATE_HOLDER = "@global@";

export function ClusteringChart({ dHelper }) {
  return {
    config: {
      datas: [
        {
          label: `${DATART_TRANSLATE_HOLDER}.xAxis`,
          key: "xAxis",
          type: "group",
          required: true,
          limit: [1, 1],
        },
        {
          label: `${DATART_TRANSLATE_HOLDER}.yAxis`,
          key: "yAxis",
          type: "aggregate",
          required: true,
          limit: [1, 1],
        },
      ],
      settings: [
        {
          label: "cluster.title",
          key: "cluster",
          comType: "group",
          rows: [
            {
              label: "cluster.clusterCount",
              key: "clusterCount",
              default: 5,
              comType: "inputNumber",
              options: {
                min: 2,
              },
            },
          ],
        },
      ],
      i18ns: [
        {
          lang: "zh-CN",
          translation: {
            xAxis: "X 轴",
            yAxis: "Y 轴",
            cluster: {
              title: "统计分析",
              clusterCount: "K值",
            },
          },
        },
        {
          lang: "en",
          translation: {
            xAxis: "X Axis",
            yAxis: "Y Axis",
            cluster: {
              title: "Clustering",
              clusterCount: "K Value",
            },
          },
        },
      ],
    },
    dependency: [
      "https://fastly.jsdelivr.net/npm/echarts@5.4.1/dist/echarts.min.js",
      "https://fastly.jsdelivr.net/npm/echarts-stat@latest/dist/ecStat.min.js",
    ],
    meta: {
      id: "clustering-chart",
      name: "[Experiment] 统计聚类图表",
      icon: Icon,
      requirements: [
        {
          group: null,
          aggregate: null,
        },
      ],
    },

    onMount(options, context) {
      if (options.containerId === undefined || !context.document) {
        return;
      }

      if ("echarts" in context.window && "ecStat" in context.window) {
        const echarts = context.window.echarts;
        this.chart = echarts.init(
          context.document.getElementById(options.containerId),
          "default"
        );
        const ecStat = context.window.ecStat;
        echarts.registerTransform(ecStat.transform.clustering);
      }
    },

    onUpdated(props) {
      if (!props.dataset || !props.dataset.columns || !props.config) {
        return;
      }
      if (!this.isMatchRequirement(props.config)) {
        this.chart?.clear();
        return;
      }
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
      const settingsConfigs = config.settings || [];
      const dataConfigs = config.datas || [];
      const data = dataset.rows;
      const [clusterCount] = dHelper.getStyles(
        settingsConfigs,
        ["cluster"],
        ["clusterCount"]
      );
      var CLUSTER_COUNT = clusterCount || 2;
      var DIENSIION_CLUSTER_INDEX = 2;
      var COLOR_ALL = [
        "#37A2DA",
        "#e06343",
        "#37a354",
        "#b55dba",
        "#b5bd48",
        "#8378EA",
        "#96BFFF",
      ];
      var pieces = [];
      for (var i = 0; i < clusterCount; i++) {
        pieces.push({
          value: i,
          label: "cluster " + i,
          color: COLOR_ALL[i],
        });
      }
      const option = {
        dataset: [
          {
            source: data || SampleData,
          },
          {
            transform: {
              type: "ecStat:clustering",
              // print: true,
              config: {
                clusterCount: CLUSTER_COUNT,
                outputType: "single",
                outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX,
              },
            },
          },
        ],
        tooltip: {
          position: "top",
        },
        visualMap: {
          type: "piecewise",
          top: "middle",
          min: 0,
          max: CLUSTER_COUNT,
          left: 10,
          splitNumber: CLUSTER_COUNT,
          dimension: DIENSIION_CLUSTER_INDEX,
          pieces: pieces,
        },
        grid: {
          left: 150,
        },
        xAxis: {},
        yAxis: {},
        series: {
          type: "scatter",
          encode: { tooltip: [0, 1] },
          symbolSize: 15,
          itemStyle: {
            borderColor: "#555",
          },
          datasetIndex: 1,
        },
      };
      return option;
    },
  };
}
