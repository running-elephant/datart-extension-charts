(function () {
  'use strict';

  var icon = "<?xml version=\"1.0\" standalone=\"no\"?><!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\"><svg t=\"1639279995753\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"5363\" width=\"16\" height=\"16\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><defs><style type=\"text/css\"></style></defs><path d=\"M149.33 517.97h341.34v106.65h42.66V517.97h341.34v127.97h42.67V475.3h-384v-85.33h-42.67v85.33h-384v170.65h42.67V517.97z m85.34 170.65H21.33A21.33 21.33 0 0 0 0 709.94v170.67c0 11.775 9.544 21.33 21.33 21.33h213.34c11.776 0 21.33-9.555 21.33-21.33V709.95c0-11.777-9.564-21.33-21.33-21.33z m384 0H405.33A21.33 21.33 0 0 0 384 709.94v170.67c0 11.775 9.544 21.33 21.33 21.33h213.34c11.776 0 21.33-9.555 21.33-21.33V709.95c0-11.777-9.564-21.33-21.33-21.33z m384 0H789.33A21.33 21.33 0 0 0 768 709.94v170.67c0 11.775 9.544 21.33 21.33 21.33h213.34c11.776 0 21.33-9.555 21.33-21.33V709.95c0-11.777-9.564-21.33-21.33-21.33zM341.33 325.98h341.34c11.776 0 21.33-9.554 21.33-21.34V133.98a21.34 21.34 0 0 0-21.33-21.34H341.33A21.33 21.33 0 0 0 320 133.98v170.66c0 11.776 9.544 21.34 21.33 21.34z\" p-id=\"5364\"></path></svg>";

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

  function MermaidUMLChart({ dHelper }) {
    const mockData = {
      code: `%%{config: { 'fontFamily': 'Menlo', 'fontSize': 12, 'fontWeight': 400} }%%
    %%{init: { 'logLevel': 'debug', 'theme': '' } }%%
    
    sequenceDiagram
        participant A as 项目主入口
        participant C as 图表管理器
        participant V as 可视化模块
        participant S as 后端服务
    
        A->>C: 初始化 Chart Manager
        C->>S: 请求插件图表路径集合
        S-->>C: 返回插件图表路径集合
        Note right of S: 服务端将从'custom-chart-plugins'文件夹读取自定义组件
        loop 插件集合
            C->>S: 下载插件图表
            S-->>C: 返回插件图表路文件
            C-->>C: 检查及加载插件图表文件
        end
        C->>C: 加载默认图表集合
        C-->>A: 完成图表初始化
        A->>V: 切换到可视化模块开始制作自定义图表
        V->>S: 保存制作完成的图表
    `,
      watermark: `Powered by Datart`,
    };

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
      isISOContainer: "experiment-mermaid-uml-chart",
      dependency: [
        "https://cdnjs.cloudflare.com/ajax/libs/mermaid/8.13.3/mermaid.min.js",
      ],
      meta: {
        id: "experiment-mermaid-uml-chart",
        name: "[Experiment] Mermaid UML",
        icon: icon,
        requirements: [
          {
            group: null,
            aggregate: null,
          },
        ],
      },

      onMount(options, context) {
        if (context.document) {
          var elemDiv = context.document.createElement("div");
          context.document.body.appendChild(elemDiv);
          context.document.body.innerHTML = `<div id="my-mermaid" class="mermaid"></div>`;
        }

        if ("mermaid" in context.window) {
          this.chart = context.window.mermaid.mermaidAPI;
          this.chart.initialize({
            startOnLoad: false,
          });
        }
      },

      onUpdated(options, context) {
        const styles = options.config.styles;
        const code =
          dHelper.getStyleValueByGroup(styles, "code", "area") || mockData.code;
        const watermark =
          dHelper.getStyleValueByGroup(styles, "watermark", "area") ||
          mockData.watermark;
        var outputDiv = context.document.getElementById("my-mermaid");

        this.chart.render("theGraph", code, function (svgCode) {
          outputDiv.style.position = "relative";
          outputDiv.style.overflow = "hidden";
          outputDiv.style.margin = "20px";
          outputDiv.innerHTML = svgCode;
        });
        this.addWatermark(outputDiv, watermark, context);
      },

      onUnMount() {
        // this.chart && this.chart.dispose();
      },

      onResize(opt, context) {
        // this.chart && this.chart.resize(context);
      },

      addWatermark(targetEle, watermark, context) {
        if (!watermark) {
          return;
        }
        const watermarkDiv = context.document.createElement("div");
        watermarkDiv.style.position = "absolute";
        watermarkDiv.style.left = "-50%";
        watermarkDiv.style.top = "-50%";
        watermarkDiv.style.width = "200%";
        watermarkDiv.style.height = "200%";
        watermarkDiv.style.color = "#f1f1f1";
        watermarkDiv.style["line-height"] = "90px";
        watermarkDiv.style["z-index"] = 1;
        watermarkDiv.style["font-size"] = "18px";
        watermarkDiv.style["-webkit-transform"] = "rotate(-45deg)";
        watermarkDiv.style["-webkit-transform"] = "rotate(-45deg)";
        watermarkDiv.innerHTML = `
          <p>${Array(Math.ceil((1 / watermark.length) * 2000))
            .fill(`${watermark}`)
            .join(Array(20).fill("&nbsp;").join(" "))}</p>
        `;
        targetEle.appendChild(watermarkDiv);
      },
    };
  }

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

  return MermaidUMLChart;

})();
