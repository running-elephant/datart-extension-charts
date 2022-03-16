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

import svgIcon from "./vue-carousel.svg";

export function DemoVueCarousel({ dHelper }) {
  return {
    config: {
      datas: [
        {
          label: "dimension",
          key: "dimension",
          type: "group",
        },
        {
          label: "filter",
          key: "filter",
          type: "filter",
          allowSameField: true,
        },
      ],
      styles: [
        {
          label: "carousel.title",
          key: "carousel",
          comType: "group",
          rows: [
            {
              label: "carousel.interval",
              key: "interval",
              comType: "inputNumber",
              default: 3000,
              options: {
                min: 0,
                step: 1,
              },
            },
          ],
        },
      ],
      settings: [
        {
          label: "viz.palette.setting.paging.title",
          key: "paging",
          comType: "group",
          rows: [
            {
              label: "viz.palette.setting.paging.pageSize",
              key: "pageSize",
              default: 1000,
              comType: "inputNumber",
              options: {
                needRefresh: true,
                step: 1,
                min: 0,
              },
            },
          ],
        },
      ],
      i18ns: [
        {
          lang: "zh-CN",
          translation: {
            chartName: "[Experiment] 用户自定义Vue跑马灯",
            carousel: {
              title: "跑马灯",
              interval: "切换间隔(毫秒)",
            },
          },
        },
        {
          lang: "en-US",
          translation: {
            chartName: "[Experiment] Vue Carousel",
            carousel: {
              title: "Carousel",
              interval: "Interval(MS)",
            },
          },
        },
      ],
    },
    isISOContainer: "demo-customize-line-chart",
    dependency: ["https://cdn.jsdelivr.net/npm/vue@2.6.14"],
    meta: {
      id: "demo-vue-carousel",
      name: "chartName",
      icon: svgIcon,
      requirements: [
        {
          group: 1,
        },
      ],
    },
    chartId: "vueCarousel",

    onMount(options, context) {
      if ("Vue" in context.window) {
        context.document.getElementById(
          options.containerId
        ).innerHTML = `<div id='${this.chartId}'></div>`;
        const Vue = context.window.Vue;
        this.chart = new Vue({
          el: `#${this.chartId}`,
          template: this.getTemplate(),
          data: {
            nowIndex: 0,
            list: [],
            btnStyle: {
              display: "inline-block",
              margin: "0 20px",
              width: "10px",
              height: "10px",
              border: "1px solid #000",
              borderRadius: "50%",
            },
            actionBtnStyle: {
              display: "inline-block",
              margin: "0 20px",
              width: "10px",
              height: "10px",
              border: "1px solid #000",
              borderRadius: "50%",
              background: "#000",
            },
            setTime: 3000,
            timer: null,
          },
          methods: {
            onClickBtn(index) {
              this.nowIndex = index;
              this.initInterval();
            },
            initInterval(time = this.setTime) {
              if (this.timer) {
                clearInterval(this.timer);
              }
              if (time) {
                this.timer = setInterval(() => {
                  this.nowIndex += 1;
                  if (this.nowIndex >= this.list.length) {
                    this.nowIndex = 0;
                  }
                }, time);
              }
            },
            getImage(path) {
              return path;
            },
          },
          watch: {
            setTime: function (val) {
              this.initInterval(val);
            },
            list: {
              handler: function (list) {
                if (list.length) {
                  this.nowIndex = 0;
                  this.initInterval();
                }
              },
              deep: true,
            },
          },
          mounted: function () {
            if (this.list.length) {
              this.initInterval();
            }
          },
        });
      }
    },

    onUpdated(props) {
      if (!props.dataset || !props.dataset.columns || !props.config) {
        return;
      }
      const dataConfigs = props.config.datas || [];
      const groupConfigs = dataConfigs
        .filter((c) => c.type === "group")
        .flatMap((config) => config.rows || []);
      const styleConfigs = props.config.styles || [];
      const chartDataSet = dHelper.transformToDataSet(
        props.dataset.rows,
        props.dataset.columns,
        dataConfigs
      );

      const [interval] = dHelper.getStyles(
        styleConfigs,
        ["carousel"],
        ["interval"]
      );
      this.chart.$data.list = chartDataSet.map((row) =>
        row.getCell(groupConfigs[0])
      );
      this.chart.$data.setTime = interval !== void 0 ? interval : 3000;
    },

    onUnMount() {
      if (this.chart.$data.timer) {
        clearInterval(this.chart.$data.timer);
      }
      this.chart = null;
    },

    onResize() {},

    getTemplate() {
      return `
        <div style='padding-top: 2.5%;'>
          <div
            v-if='list.length'
            v-show='index === nowIndex'
            v-for='(item, index) in list'
            style='text-align: center; height: 80%; width: 100%;'
          >
            <img :src='getImage(item)' style='max-height: 100%; max-width: 100%;' />
          </div>
          <div style='text-align: center; width: 100%; margin-top: 5%;'
          >
            <div
              v-if='list.length'
              v-for='(item, index) in list'
              :style='index === nowIndex ? actionBtnStyle : btnStyle'
              @click='onClickBtn(index)'
            />
          </div>
        </div>
      `;
    },
  };
}
