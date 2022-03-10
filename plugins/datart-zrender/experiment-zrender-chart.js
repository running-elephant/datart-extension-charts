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

export function ZRenderChart({ dHelper }) {
  return {
    config: {
      datas: [
        {
          label: "dimension",
          key: "dimension",
          required: true,
          type: "group",
        },
        {
          label: "metrics",
          key: "metrics",
          required: true,
          type: "aggregate",
        },
        {
          label: "filter",
          key: "filter",
          type: "filter",
          allowSameField: true,
        },
        {
          label: "colorize",
          key: "color",
          type: "color",
        },
      ],
      styles: [
        {
          label: "label.title",
          key: "label",
          comType: "group",
          rows: [
            {
              label: "label.text",
              key: "text",
              default: "datart",
              comType: "input",
            },
            {
              label: "label.fontLeft",
              key: "fontL",
              comType: "font",
              default: {
                fontFamily: "Lato",
                fontSize: 200,
                fontWeight: "bolder",
                fontStyle: "normal",
                color: "#0ff",
              },
            },
            {
              label: "label.fontRight",
              key: "fontR",
              comType: "font",
              default: {
                fontFamily: "Lato",
                fontSize: 200,
                fontWeight: "bolder",
                fontStyle: "normal",
                color: "#f0f",
              },
            },
          ],
        },
      ],
      i18ns: [
        {
          lang: "zh-CN",
          translation: {
            label: {
              title: "标签",
              text: "文本",
              fontLeft: "主字体",
              fontRight: "副字体",
            },
          },
        },
      ],
    },
    isISOContainer: "experiment-zrender-chart",
    dependency: [
      "https://ecomfe.github.io/zrender-doc/public/lib/js/zrender.min.js",
    ],
    meta: {
      id: "experiment-zrender-chart",
      name: "[Experiment] ZRender Chart",
      icon: 'chart',
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

      const { zrender } = context.window;
      if (!zrender) {
        return;
      }

      this.chart = zrender.init(
        context.document.getElementById(options.containerId)
      );
      this.mouseEvents.forEach((event) => {
        this.chart.on(event.name, event.callback);
      });
    },

    onUpdated(props, context) {
      if (!props.dataset || !props.dataset.columns || !props.config) {
        return;
      }
      if (!this.isMatchRequirement(props.config)) {
        this.chart.clear();
        return;
      }
      this.draw(context, props.config.styles);
    },

    onUnMount() {
      this.chart && this.chart.dispose();
    },

    onResize(opt, context) {
      this.draw(context, opt?.config?.styles);
    },

    draw(context, styles) {
      const { text, fontL, fontR } = this.getText(styles);

      const { zrender } = context.window;
      const zr = this.chart;
      var w = context.width || zr.getWidth();
      var h = context.height || zr.getHeight();
      zr.clear();
      zr.resize({
        width: w,
        height: h,
      });

      var t0 = new zrender.Rect({
        style: {
          fill: "#333",
        },
        shape: {
          width: w,
          height: h,
        },
      });
      zr.add(t0);

      var t1 = new zrender.Text({
        style: {
          text: text,
          textAlign: "center",
          textVerticalAlign: "middle",
          fontSize: fontL.fontSize,
          fontFamily: fontL.fontFamily,
          fontWeight: fontL.fontWight,
          textFill: fontL.color,
          blend: "lighten",
        },
        position: [w / 2 + 5, h / 2],
      });
      zr.add(t1);

      var t2 = new zrender.Text({
        style: {
          text: text,
          textAlign: "center",
          textVerticalAlign: "middle",
          fontSize: fontR.fontSize,
          fontFamily: fontR.fontFamily,
          fontWeight: fontR.fontWight,
          textFill: fontR.color,
          blend: "lighten",
        },
        position: [w / 2, h / 2],
      });
      zr.add(t2);

      var lines = [];
      for (var i = 0; i < 16; ++i) {
        var line = new zrender.Rect({
          shape: {
            x: w * (Math.random() - 0.3),
            y: h * Math.random(),
            width: w * (Math.random() + 0.3),
            height: Math.random() * 8,
          },
          style: {
            fill: ["#ff0", "#f0f", "#0ff", "#00f"][
              Math.floor(Math.random() * 4)
            ],
            blend: "lighten",
            opacity: 0,
          },
        });
        zr.add(line);
        lines.push(line);
      }

      if (this.timerId) {
        context.window.clearInterval(this.timerId);
      }

      this.timerId = setInterval(function () {
        if (Math.random() > 0.2) {
          t2.attr("position", [w / 2 + Math.random() * 50, h / 2]);

          for (var i = 0; i < lines.length; ++i) {
            lines[i].attr("shape", {
              x: w * Math.random(),
              y: h * Math.random(),
              width: w * Math.random(),
              height: Math.random() * 8,
            });
            lines[i].attr("style", {
              opacity: 1,
            });
          }

          setTimeout(function () {
            t2.attr("position", [w / 2, h / 2]);

            for (var i = 0; i < lines.length; ++i) {
              lines[i].attr("style", {
                opacity: 0,
              });
            }
          }, 100);
        }
      }, 500);
    },

    getText(styles) {
      if (styles) {
        const [text, fontL, fontR] = dHelper.getStyles(
          styles,
          ["label"],
          ["text", "fontL", "fontR"]
        );
        this.textObj = {
          text,
          fontL,
          fontR,
        };
      }
      return this.textObj;
    },
  };
}
