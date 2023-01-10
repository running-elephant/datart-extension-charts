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

const DATART_TRANSLATE_HOLDER = "@global@";

export function AntVBox({ dHelper }) {
  const mockData = [
    { x: "Oceania", low: 1, q1: 9, median: 16, q3: 22, high: 24 },
    { x: "East Europe", low: 1, q1: 5, median: 8, q3: 12, high: 16 },
    { x: "Australia", low: 1, q1: 8, median: 12, q3: 19, high: 26 },
    { x: "South America", low: 2, q1: 8, median: 12, q3: 21, high: 28 },
    { x: "North Africa", low: 1, q1: 8, median: 14, q3: 18, high: 24 },
    { x: "North America", low: 3, q1: 10, median: 17, q3: 28, high: 30 },
    { x: "West Europe", low: 1, q1: 7, median: 10, q3: 17, high: 22 },
    { x: "West Africa", low: 1, q1: 6, median: 8, q3: 13, high: 16 },
  ];

  return {
    config: {
      datas: [
        {
          label: `${DATART_TRANSLATE_HOLDER}.box.dimension`,
          key: "dimension",
          type: "group",
          required: true,
          limit: [1, 1],
        },
        {
          label: `${DATART_TRANSLATE_HOLDER}.box.min`,
          key: "min",
          type: "aggregate",
          required: true,
          limit: [1, 1],
        },
        {
          label: `${DATART_TRANSLATE_HOLDER}.box.q1`,
          key: "q1",
          type: "aggregate",
          required: true,
          limit: [1, 1],
        },
        {
          label: `${DATART_TRANSLATE_HOLDER}.box.median`,
          key: "median",
          type: "aggregate",
          required: true,
          limit: [1, 1],
        },
        {
          label: `${DATART_TRANSLATE_HOLDER}.box.q3`,
          key: "q3",
          type: "aggregate",
          required: true,
          limit: [1, 1],
        },
        {
          label: `${DATART_TRANSLATE_HOLDER}.box.max`,
          key: "max",
          type: "aggregate",
          required: true,
          limit: [1, 1],
        },
      ],
      styles: [
        {
          label: "boxStyle.title",
          key: "boxStyle",
          comType: "group",
          rows: [
            {
              label: "boxStyle.fill",
              key: "fill",
              default: "#1890FF",
              comType: "fontColor",
            },
            {
              label: "boxStyle.stroke",
              key: "stroke",
              default: "#545454",
              comType: "fontColor",
            },
            {
              label: "boxStyle.fillOpacity",
              key: "fillOpacity",
              default: 0.3,
              comType: "inputNumber",
            },
          ],
        },
        {
          label: "theme.title",
          key: "theme",
          comType: "group",
          rows: [
            {
              label: "theme.current",
              key: "current",
              comType: "select",
              default: "default",
              options: {
                translateItemLabel: false,
                items: [
                  { label: "默认", value: "default" },
                  {
                    label: "黑暗主题",
                    value: "dark",
                  },
                ],
              },
            },
          ],
        },
      ],
      i18ns: [
        {
          lang: "zh",
          translation: {
            box: {
              dimension: "维度",
              min: "最小值",
              q1: "第一分位",
              median: "中位数",
              q3: "第三分位",
              max: "最大位",
            },
            theme: {
              title: "主题设置",
              current: "当前主题",
            },
            boxStyle: {
              title: "箱线图样式设置",
              fill: "图形的填充色",
              stroke: "图形的描边",
              fillOpacity: "填充透明度",
            },
          },
        },
        {
          lang: "en",
          translation: {
            theme: {
              title: "Theme Style",
              current: "Current",
            },
          },
        },
      ],
    },
    isISOContainer: "antv-g2plot",
    dependency: [
      "https://cdnjs.cloudflare.com/ajax/libs/g2plot/2.4.23/g2plot.min.js",
    ],
    meta: {
      id: "experiment-antv-box",
      name: "[Experiment] AntV Box Chart",
      icon: "chart",
      requirements: [
        {
          group: 1,
          aggregate: 5,
        },
      ],
    },
    _chart: null,

    onMount(options, context) {
      if (options.containerId === undefined || !context.document) {
        return;
      }

      const { Box } = context.window.G2Plot;
      if (!Box) {
        return;
      }

      this._chart = new Box(options.containerId, {
        autoFit: true,
        data: mockData,
        xField: "x",
        yField: ["low", "q1", "median", "q3", "high"],
        boxStyle: {
          stroke: "#545454",
          fill: "#1890FF",
          fillOpacity: 0.3,
        },
        animation: false,
      });
      this._chart.render();
    },

    onUpdated(options, context) {
      if (!this._chart) return;
      if (!this.isMatchRequirement(options.config)) return;

      const newOptions = this.getOptions(
        options.dataset,
        options.config,
        options.drillOption,
        options.selectedItems
      );

      this._chart.update(newOptions);
    },

    onUnMount() {
      if (!this._chart) return;
      this._chart.destroy();
    },

    onResize(opt, context) {
      if (!this._chart) return;
      if (!context.width || !context.height) return;
      this._chart.changeSize(context.width, context.height);
    },

    getOptions(dataset, config, drillOption, selectedItems) {
      const styleConfigs = config.styles || [];
      const dataConfigs = config.datas || [];
      const xField = dataConfigs
        .filter((c) => c.key === "dimension")
        .flatMap((config) => config.rows || [])
        .map((row) => row.colName)
        .findLast((row) => row);
      const minField = dataConfigs
        .filter((c) => c.key === "min")
        .flatMap((config) => config.rows || [])
        .map((row) => `${row.aggregate}(${row.colName})`)
        .findLast((row) => row);
      const q1Field = dataConfigs
        .filter((c) => c.key === "q1")
        .flatMap((config) => config.rows || [])
        .map((row) => `${row.aggregate}(${row.colName})`)
        .findLast((row) => row);
      const medianField = dataConfigs
        .filter((c) => c.key === "median")
        .flatMap((config) => config.rows || [])
        .map((row) => `${row.aggregate}(${row.colName})`)
        .findLast((row) => row);
      const q3Field = dataConfigs
        .filter((c) => c.key === "q3")
        .flatMap((config) => config.rows || [])
        .map((row) => `${row.aggregate}(${row.colName})`)
        .findLast((row) => row);
      const maxField = dataConfigs
        .filter((c) => c.key === "max")
        .flatMap((config) => config.rows || [])
        .map((row) => `${row.aggregate}(${row.colName})`)
        .findLast((row) => row);

      const datas = dHelper.transformToObjectArray(
        dataset.rows,
        dataset.columns
      );

      const [boxStyleFill, boxStyleStroke, boxStyleFillOpacity] =
        dHelper.getStyles(
          styleConfigs,
          ["boxStyle"],
          ["fill", "stroke", "fillOpacity"]
        );
      const [theme] = dHelper.getStyles(styleConfigs, ["theme"], ["current"]);

      return {
        data: datas,
        xField: xField,
        yField: [minField, q1Field, medianField, q3Field, maxField],
        theme,
        boxStyle: {
          stroke: boxStyleStroke,
          fill: boxStyleFill,
          fillOpacity: boxStyleFillOpacity,
        },
        animation: false,
      };
    },
  };
}
