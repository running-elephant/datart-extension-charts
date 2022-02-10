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

import ChartJSIcon from "./chartjs-logo.svg";

export function ChartJS({ dHelper }) {
  const mockData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return {
    config: {
      datas: [
        {
          label: "dimension",
          key: "dimension",
          actions: ["sortable", "alias"],
        },
        {
          label: "metrics",
          key: "metrics",
          rows: [],
          actions: ["format", "aggregate"],
        },
      ],
      styles: [],
      settings: [],
      i18ns: [
        {
          lang: "zh-CN",
          translation: {
            chartName: "ChartJS",
          },
        },
        {
          lang: "en-US",
          translation: {
            chartName: "ChartJS",
          },
        },
      ],
    },
    isISOContainer: "experiment-chartjs-chart",
    dependency: ["https://cdn.jsdelivr.net/npm/chart.js@2.8.0"],
    meta: {
      id: "experiment-chartjs-chart",
      name: "chartName",
      icon: ChartJSIcon,
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
      const { Chart } = context.window.Chart;
      if (!Chart) {
        return;
      }

      const node = context.document.createElement("canvas");
      node.id = "chartjs-canvas-container";
      context.document.getElementById(options.containerId).appendChild(node);

      var ctx = context.document
        .getElementById("chartjs-canvas-container")
        .getContext("2d");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: mockData,
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    },

    onUpdated(props, context) {},

    onUnMount() {},

    onResize(opt, context) {},
  };
}
