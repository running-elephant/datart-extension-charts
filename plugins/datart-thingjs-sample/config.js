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

const config = {
  datas: [
    {
      label: "dimension",
      key: "dimension",
      required: true,
      type: "group",
      maxFieldCount: 1,
    },
    {
      label: "metrics",
      key: "metrics",
      required: true,
      type: "aggregate",
      maxFieldCount: 1,
      actions: {
        NUMERIC: ["aggregate", "alias", "format", "colorRange"],
        STRING: ["aggregate", "alias", "format", "colorRange"],
      },
    },
    {
      label: "filter",
      key: "filter",
      type: "filter",
      allowSameField: true,
    },
    {
      label: "size",
      key: "size",
      type: "size",
      maxFieldCount: 1,
    },
  ],
  styles: [
    {
      label: "map.title",
      key: "map",
      comType: "group",
      rows: [
        {
          label: "map.level",
          key: "level",
          comType: "select",
          default: "china",
          options: {
            items: [
              { label: "中国-省级地图", value: "china" },
              { label: "中国-地市级地图", value: "china-city" },
            ],
          },
        },
        {
          label: "map.theme",
          key: "theme",
          comType: "select",
          default: "light",
          options: {
            items: [
              { label: "明亮", value: "light" },
              { label: "黑暗", value: "dark" },
            ],
          },
        },
        {
          label: "map.cycleRatio",
          key: "cycleRatio",
          comType: "slider",
          default: 1,
          options: {
            items: [1, 2, 4, 8],
          },
        },
      ],
    },
    {
      label: "label.title",
      key: "label",
      comType: "group",
      rows: [
        {
          label: "label.showLabel",
          key: "showLabel",
          default: true,
          comType: "checkbox",
        },
        {
          label: "label.position",
          key: "position",
          comType: "select",
          default: "top",
          options: {
            items: [
              { label: "上", value: "top" },
              { label: "左", value: "left" },
              { label: "右", value: "right" },
              { label: "下", value: "bottom" },
              { label: "内", value: "inside" },
              { label: "内左", value: "insideLeft" },
              { label: "内右", value: "insideRight" },
              { label: "内上", value: "insideTop" },
              { label: "内下", value: "insideBottom" },
              { label: "内左上", value: "insideTopLeft" },
              { label: "内左下", value: "insideBottomLeft" },
              { label: "内右上", value: "insideTopRight" },
              { label: "内右下", value: "insideBottomRight" },
            ],
          },
        },
        {
          label: "font",
          key: "font",
          comType: "font",
          default: {
            fontFamily: "PingFang SC",
            fontSize: "12",
            fontWeight: "normal",
            fontStyle: "normal",
            color: "black",
          },
        },
      ],
    },
    {
      label: "viz.palette.style.visualMap.title",
      key: "visualMap",
      comType: "group",
      rows: [
        {
          label: "viz.palette.style.visualMap.show",
          key: "show",
          default: true,
          comType: "checkbox",
        },
        {
          label: "viz.palette.style.visualMap.orient",
          key: "orient",
          comType: "select",
          default: "vertical",
          options: {
            items: [
              { label: "竖直", value: "vertical" },
              { label: "水平", value: "horizontal" },
            ],
          },
        },
        {
          label: "viz.palette.style.visualMap.align",
          key: "align",
          comType: "select",
          default: "auto",
          options: {
            items: [
              { label: "自动", value: "auto" },
              { label: "右", value: "right" },
              { label: "上", value: "top" },
              { label: "下", value: "bottom" },
              { label: "左", value: "left" },
            ],
          },
        },
        {
          label: "viz.palette.style.visualMap.itemWidth",
          key: "itemWidth",
          default: 20,
          comType: "inputNumber",
        },
        {
          label: "viz.palette.style.visualMap.itemHeight",
          key: "itemHeight",
          default: 140,
          comType: "inputNumber",
        },
        {
          label: "font",
          key: "font",
          comType: "font",
          default: {
            fontFamily: "PingFang SC",
            fontSize: "12",
            fontWeight: "normal",
            fontStyle: "normal",
            color: "black",
          },
        },
      ],
    },
  ],
  i18ns: [
    {
      lang: "zh-CN",
      translation: {
        chartName: "ThingJS",
        common: {
          showAxis: "显示坐标轴",
          inverseAxis: "反转坐标轴",
          lineStyle: "线条样式",
          borderType: "边框线条类型",
          borderWidth: "边框线条宽度",
          borderColor: "边框线条颜色",
          backgroundColor: "背景颜色",
          showLabel: "显示标签",
          unitFont: "刻度字体",
          rotate: "旋转角度",
          position: "位置",
          showInterval: "显示刻度",
          interval: "刻度间隔",
          showTitleAndUnit: "显示标题和刻度",
          nameLocation: "标题位置",
          nameRotate: "标题旋转",
          nameGap: "标题与轴线距离",
          min: "最小值",
          max: "最大值",
        },
        label: {
          title: "标签",
          showLabel: "显示标签",
          position: "位置",
        },
        map: {
          title: "地图设置",
          level: "默认地图等级",
          enableZoom: "开启缩放",
          theme: "主题",
          cycleRatio: "气泡大像素比",
        },
        background: { title: "背景设置" },
      },
    },
    {
      lang: "en-US",
      translation: {
        chartName: "ThingJS",
        common: {
          showAxis: "Show Axis",
          inverseAxis: "Inverse Axis",
          lineStyle: "Line Style",
          borderType: "Border Type",
          borderWidth: "Border Width",
          borderColor: "Border Color",
          backgroundColor: "Background Color",
          showLabel: "Show Label",
          unitFont: "Unit Font",
          rotate: "Rotate",
          position: "Position",
          showInterval: "Show Interval",
          interval: "Interval",
          showTitleAndUnit: "Show Title and Unit",
          nameLocation: "Name Location",
          nameRotate: "Name Rotate",
          nameGap: "Name Gap",
          min: "Min",
          max: "Max",
        },
        label: {
          title: "Label",
          showLabel: "Show Label",
          position: "Postion",
        },
        map: {
          title: "Setting",
          level: "Level",
          enableZoom: "Enable Zoom",
          theme: "Theme",
          cycleRatio: "Cycle Ratio",
        },
        background: { title: "Background Setting" },
      },
    },
  ],
};

export default config;
