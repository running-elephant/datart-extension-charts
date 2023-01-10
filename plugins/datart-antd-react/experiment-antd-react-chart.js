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

export function AntDesignChart({ dHelper }) {
  const icon =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K";

  return {
    config: {
      datas: [],
      styles: [
        {
          label: "code.title",
          key: "code",
          comType: "group",
          rows: [
            {
              label: "code.area",
              key: "area",
              comType: "text",
              options: {},
            },
          ],
        },
        {
          label: "watermark.title",
          key: "watermark",
          comType: "group",
          rows: [
            {
              label: "watermark.area",
              key: "area",
              comType: "text",
              options: {},
            },
          ],
        },
      ],
      settings: [],
      i18ns: [
        {
          lang: "zh-CN",
          translation: {
            code: {
              title: "代码设置",
              area: "编辑区",
            },
            watermark: {
              title: "水印设置",
              area: "编辑区",
            },
          },
        },
        {
          lang: "en",
          translation: {
            code: {
              title: "Code Setting",
              area: "Editor Block",
            },
            watermark: {
              title: "Watermark Setting",
              area: "Editor Block",
            },
          },
        },
      ],
    },
    _containerId: null,
    isISOContainer: "experiment-antd-react-chart",
    dependency: [
      "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/antd/4.24.1/antd.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/antd/4.24.1/antd.min.css",
    ],
    meta: {
      id: "experiment-antd-react-chart",
      name: "[Experiment] Ant Design React",
      icon: "chart",
    },
    _ReactDom: null,
    _React: null,

    onMount(options, context) {
      this._containerId = options.containerId;
      if ("React" in context.window && "ReactDOM" in context.window) {
        this._ReactDOM = context.window.ReactDOM;
        this._React = context.window.React;
        const root = this._ReactDOM.createRoot(
          context.document.getElementById(options.containerId)
        );
        root.render(this.buildComponent(context.window));
      }
    },

    onUpdated(options, context) {
      const styles = options.config.styles;
    },

    onUnMount() {
      // this.chart && this.chart.dispose();
    },

    onResize(opt, context) {
      // this.chart && this.chart.resize(context);
    },

    buildComponent({ antd }) {
      const e = this._React.createElement;
      const dataSource = [
        {
          key: "1",
          name: "Mike",
          age: 32,
          address: "10 Downing Street",
        },
        {
          key: "2",
          name: "John",
          age: 42,
          address: "10 Downing Street",
        },
      ];
      const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
        },
      ];
      return e("div", null, [
        e('h1', null, 'Hello World!'),
        e(antd.Table, { dataSource, columns }, null),
      ]);
    },
  };
}
