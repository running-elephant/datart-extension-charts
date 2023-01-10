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

export function AntVSankey({ dHelper }) {
  const mockData = [
    { source: "首次打开", target: "首页 UV", value: 160 },
    { source: "结果页", target: "首页 UV", value: 40 },
    { source: "验证页", target: "首页 UV", value: 10 },
    { source: "我的", target: "首页 UV", value: 10 },
    { source: "朋友", target: "首页 UV", value: 8 },
    { source: "其他来源", target: "首页 UV", value: 27 },
    { source: "首页 UV", target: "理财", value: 30 },
    { source: "首页 UV", target: "扫一扫", value: 40 },
    { source: "首页 UV", target: "服务", value: 35 },
    { source: "首页 UV", target: "蚂蚁森林", value: 25 },
    { source: "首页 UV", target: "跳失", value: 10 },
    { source: "首页 UV", target: "借呗", value: 30 },
    { source: "首页 UV", target: "花呗", value: 40 },
    { source: "首页 UV", target: "其他流向", value: 45 },
  ];

  return {
    config: {
      datas: [
        {
          label: `${DATART_TRANSLATE_HOLDER}.sankey.source`,
          key: "source",
          type: "group",
          required: true,
          limit: [1, 1],
        },
        {
          label: `${DATART_TRANSLATE_HOLDER}.sankey.target`,
          key: "target",
          type: "group",
          required: true,
          limit: [1, 1],
        },
        {
          label: `${DATART_TRANSLATE_HOLDER}.sankey.metrics`,
          key: "metrics",
          type: "aggregate",
          required: true,
          limit: [1, 1],
        },
      ],
      styles: [
        {
          label: "geometry.title",
          key: "geometry",
          comType: "group",
          rows: [
            {
              label: "geometry.nodeWidthRatio",
              key: "nodeWidthRatio",
              default: 0.008,
              max: 1,
              min: 0.001,
              comType: "inputNumber",
            },
            {
              label: "geometry.nodeWidthPadding",
              key: "nodeWidthPadding",
              default: 0.01,
              max: 1,
              min: 0.01,
              comType: "inputNumber",
            },
            {
              label: "geometry.nodeAlign.title",
              key: "nodeAlign",
              comType: "select",
              default: "justify",
              options: {
                translateItemLabel: true,
                items: [
                  { label: "@global@.geometry.nodeAlign.left", value: "left" },
                  {
                    label: "@global@.geometry.nodeAlign.right",
                    value: "right",
                  },
                  {
                    label: "@global@.geometry.nodeAlign.center",
                    value: "center",
                  },
                  {
                    label: "@global@.geometry.nodeAlign.justify",
                    value: "justify",
                  },
                ],
              },
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
            sankey: {
              source: "来源",
              target: "目标",
              metrics: "指标",
            },
            theme: {
              title: "主题设置",
              current: "当前主题"
            },
            geometry: {
              title: "几何样式设置",
              nodeWidthRatio: "节点的宽度配置",
              nodeWidthPadding: "节点的之间垂直方向的间距",
              nodeAlign: {
                title: "对齐方式",
                left: "左对齐",
                right: "右对齐",
                center: "居中",
                justify: "两端对齐",
              },
            },
          },
        },
        {
          lang: "en",
          translation: {
            sankey: {
              source: "Source",
              target: "Target",
              metrics: "Metric",
            },
            theme: {
              title: "Theme Style",
              current: "Current"
            },
            geometry: {
              title: "Geometry Style",
              nodeWidthRatio: "Node Width Ratio",
              nodeWidthPadding: "Node Width Padding",
              nodeAlign: {
                title: "Align Type",
                left: "left",
                right: "right",
                center: "center",
                justify: "justify",
              },
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
      id: "experiment-antv-sankey",
      name: "[Experiment] AntV Sankey Chart",
      icon: "chart",
      requirements: [
        {
          group: 0,
          aggregate: 3,
        },
      ],
    },
    _chart: null,

    onMount(options, context) {
      if (options.containerId === undefined || !context.document) {
        return;
      }

      const { Sankey } = context.window.G2Plot;
      if (!Sankey) {
        return;
      }

      this._chart = new Sankey(options.containerId, {
        data: mockData,
        sourceField: "source",
        targetField: "target",
        weightField: "value",
        nodeWidthRatio: 0.008,
        nodePaddingRatio: 0.03,
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
      const weightField = dataConfigs
        .filter((c) => c.key === "metrics")
        .flatMap((config) => config.rows || [])
        .map((row) => `${row.aggregate}(${row.colName})`)
        .findLast((row) => row);
      const sourceField = dataConfigs
        .filter((c) => c.key === "source")
        .flatMap((config) => config.rows || [])
        .map((row) => row.colName || "source")
        .findLast((row) => row);
      const targetField = dataConfigs
        .filter((c) => c.key === "target")
        .flatMap((config) => config.rows || [])
        .map((row) => row.colName || "target")
        .findLast((row) => row);

      const datas = dHelper.transformToObjectArray(
        dataset.rows,
        dataset.columns
      );

      const [nodeWidthRatio, nodeWidthPadding, nodeAlign] = dHelper.getStyles(
        styleConfigs,
        ["geometry"],
        ["nodeWidthRatio", "nodeWidthPadding", "nodeAlign"]
      );
      const [theme] = dHelper.getStyles(styleConfigs, ["theme"], ["current"]);

      return {
        data: datas,
        sourceField: sourceField,
        targetField: targetField,
        weightField: weightField,
        nodeWidthRatio: nodeWidthRatio,
        nodePaddingRatio: nodeWidthPadding,
        nodeAlign,
        theme,
        nodeDraggable: true,
        rawFields: ["path"],
        tooltip: {
          fields: ["path", "value"],
          formatter: ({ path, value }) => {
            return {
              name: path,
              value: value,
            };
          },
        },
      };
    },
  };
}
