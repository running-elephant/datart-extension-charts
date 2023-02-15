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
import { IChart } from "../../core/datart";
import data from "./sample.json";

/**
 * @summary
 * Integrate with amap echart extions, more detail please check https://github.com/plainheart/echarts-extension-amap/blob/master/README.zh-CN.md
 * @param {*} { dHelper }, Datart Helper Utils
 * @return {*} void
 */
export function mapChart({ dHelper }): IChart & any {
  return {
    isISOContainer: "echarts-gl",
    chart: null,
    config,
    dependency: [
      "https://fastly.jsdelivr.net/npm/echarts@5.4.1/dist/echarts.min.js",
      "https://fastly.jsdelivr.net/npm/echarts-gl@2/dist/echarts-gl.min.js",
      "https://fastly.jsdelivr.net/npm/echarts@4.9.0/map/js/world.js",
    ],
    geoMap: null,
    meta: {
      id: "experiment-3dmap-chart",
      name: "chartName",
      icon: "ditu",
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

      this.chart = context.window.echarts.init(
        context.document.getElementById(options.containerId),
        "default"
      );
      this._mouseEvents?.forEach((event) => {
        this.chart.on(event.name, event.callback);
      });
    },

    onUpdated(props, context) {
      if (!props.dataset || !props.dataset.columns || !props.config) {
        return;
      }
      if (!this.isMatchRequirement(props.config)) {
        this.chart?.clear();
        return;
      }
      const newOptions = this.getOptions(props.dataset, props.config);
      console.log(`newOptions ---> `, newOptions);
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

      const normalizeData = data
        .filter(function (dataItem) {
          return dataItem[2] > 0;
        })
        .map(function (dataItem) {
          return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])];
        });

      return {
        backgroundColor: "#cdc1d5",
        geo3D: {
          map: "world",
          shading: "lambert",
          light: {
            main: {
              intensity: 5,
              shadow: true,
              shadowQuality: "high",
              alpha: 30,
            },
            ambient: {
              intensity: 0,
            },
            ambientCubemap: {
              texture: "data-gl/asset/canyon.hdr",
              exposure: 1,
              diffuseIntensity: 0.5,
            },
          },
          viewControl: {
            distance: 50,
            panMouseButton: "left",
            rotateMouseButton: "right",
          },
          groundPlane: {
            show: true,
            color: "#999",
          },
          postEffect: {
            enable: true,
            bloom: {
              enable: false,
            },
            SSAO: {
              radius: 1,
              intensity: 1,
              enable: true,
            },
            depthOfField: {
              enable: false,
              focalRange: 10,
              blurRadius: 10,
              fstop: 1,
            },
          },
          temporalSuperSampling: {
            enable: true,
          },
          itemStyle: {},
          regionHeight: 2,
        },
        visualMap: {
          max: 40,
          calculable: true,
          realtime: false,
          inRange: {
            color: [
              "#313695",
              "#4575b4",
              "#74add1",
              "#abd9e9",
              "#e0f3f8",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026",
            ],
          },
          outOfRange: {
            colorAlpha: 0,
          },
        },
        series: [
          {
            type: "bar3D",
            coordinateSystem: "geo3D",
            shading: "lambert",
            data: data,
            barSize: 0.1,
            minHeight: 0.2,
            silent: true,
            itemStyle: {
              color: "orange",
              opacity: 0.8,
            },
          },
        ],
        // amap: {
        //   viewMode: "3D",
        //   center: [108.39, 39.9],
        //   zoom: 4,
        //   resizeEnable: true,
        //   mapStyle: `amap://styles/${theme}`,
        //   renderOnMoving: true,
        //   echartsLayerZIndex: 2000,
        //   echartsLayerInteractive: true,
        //   largeMode: false,
        // },
        // tooltip: {
        //   trigger: "item",
        // },
        // animation: true,
        // visualMap: this.getVisualMap(
        //   chartDataSet,
        //   groupConfigs,
        //   aggregateConfigs,
        //   sizeConfigs,
        //   styleConfigs
        // ),
        // series: this.getMetricAndSizeSeries(
        //   chartDataSet,
        //   groupConfigs,
        //   aggregateConfigs,
        //   sizeConfigs,
        //   styleConfigs
        // ),
      };
    },

    loadMapTools(context) {
      var amapComponent = this.chart?.getModel()?.getComponent("amap");
      var amap = amapComponent.getAMap();
      amap.addControl(new context.window.AMap.Scale());
      amap.addControl(new context.window.AMap.ToolBar());
    },

    getMetricAndSizeSeries(
      chartDataSet,
      groupConfigs,
      aggregateConfigs,
      sizeConfigs,
      styleConfigs
    ) {
      const showLabel = dHelper.getValue(styleConfigs, ["label", "showLabel"]);
      const cycleRatio = dHelper.getValue(styleConfigs, ["map", "cycleRatio"]);
      const font = dHelper.getValue(styleConfigs, ["label", "font"]);
      const { min, max } = this.getDataColumnMaxAndMin(
        chartDataSet,
        sizeConfigs[0]
      );
      const scaleRatio = cycleRatio || 1;
      const defaultScatterPointPixelSize = 10;
      const defaultSizeValue = max - min;
      const defaultColorValue = 1;

      return [
        {
          type: "scatter",
          zlevel: 2,
          coordinateSystem: "amap",
          symbol: "circle",
          data: chartDataSet
            ?.map((row) => {
              return {
                name: this.mappingGeoName(row.getCell(groupConfigs[0])),
                value: this.mappingGeoCoordination(
                  row.getCell(groupConfigs[0]),
                  row.getCell(sizeConfigs[0]) || defaultSizeValue,
                  row.getCell(aggregateConfigs[0]) || defaultColorValue
                ),
              };
            })
            ?.filter((d) => !!d.name && d.value !== undefined),
          symbolSize: function (val) {
            return (
              (val[2] / (max - min)) * scaleRatio * defaultScatterPointPixelSize
            );
          },
          label: {
            formatter: "{b}",
            position: "right",
            show: showLabel,
            ...font,
          },
          emphasis: {
            label: {
              show: showLabel,
              ...font,
            },
          },
        },
      ];
    },

    getVisualMap(
      chartDataSet,
      groupConfigs,
      aggregateConfigs,
      sizeConfigs,
      styleConfigs
    ) {
      const [show, orient, align, itemWidth, itemHeight, font] =
        dHelper.getStyles(
          styleConfigs,
          ["visualMap"],
          ["show", "orient", "align", "itemWidth", "itemHeight", "font"]
        );

      if (!show || !aggregateConfigs?.length) {
        return [];
      }

      const { min, max } = this.getDataColumnMaxAndMin(
        chartDataSet,
        aggregateConfigs?.[0]
      );

      const inRange = {
        color: [
          aggregateConfigs?.[0]?.color?.start || "#121122",
          aggregateConfigs?.[0]?.color?.end || "rgba(3,4,5,0.4)",
        ],
      };

      return [
        {
          type: "continuous",
          seriesIndex: 0,
          dimension: 3,
          show,
          orient,
          align,
          itemWidth,
          itemHeight,
          inRange,
          text: [max, min],
          min,
          max,
          ...font,
        },
      ];
    },

    getDataColumnMaxAndMin(chartDataSet, config) {
      const datas = chartDataSet.map((row) => row.getCell(config));
      const min = Number.isNaN(Math.min(...datas)) ? 0 : Math.min(...datas);
      const max = Number.isNaN(Math.max(...datas)) ? 100 : Math.max(...datas);
      return { min, max };
    },

    mappingGeoName(sourceName) {
      const targetName = this.geoMap.features.find((f) =>
        f.properties.name.includes(sourceName)
      )?.properties.name;
      return targetName;
    },

    mappingGeoCoordination(sourceName, ...values) {
      const properties = this.geoMap.features.find((f) =>
        f.properties.name.includes(sourceName)
      )?.properties;

      return (properties?.cp || properties?.center)?.concat(values) || [];
    },
  };
}
