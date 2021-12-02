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

export function AntVG2Chart({ dHelper }) {
  const mockData = [
    {
      Year: 2016,
      "Number of incidents": "13,488",
      Deaths: "34,676",
      Injuries: "39,851",
    },
    {
      Year: 2015,
      "Number of incidents": "14,852",
      Deaths: "38,464",
      Injuries: "43,960",
    },
    {
      Year: 2014,
      "Number of incidents": "16,860",
      Deaths: "43,566",
      Injuries: "41,061",
    },
    {
      Year: 2013,
      "Number of incidents": "11,996",
      Deaths: "22,234",
      Injuries: "37,666",
    },
    {
      Year: 2012,
      "Number of incidents": "8,500",
      Deaths: "15,436",
      Injuries: "25,486",
    },
    {
      Year: 2011,
      "Number of incidents": "5,071",
      Deaths: "8,228",
      Injuries: "14,652",
    },
    {
      Year: 2010,
      "Number of incidents": "4,822",
      Deaths: "7,727",
      Injuries: "15,860",
    },
    {
      Year: 2009,
      "Number of incidents": "4,719",
      Deaths: "9,271",
      Injuries: "19,128",
    },
    {
      Year: 2008,
      "Number of incidents": "4,803",
      Deaths: "9,135",
      Injuries: "18,984",
    },
    {
      Year: 2007,
      "Number of incidents": "3,241",
      Deaths: "12,858",
      Injuries: "22,453",
    },
    {
      Year: 2006,
      "Number of incidents": "2,749",
      Deaths: "9,362",
      Injuries: "15,551",
    },
    {
      Year: 2005,
      "Number of incidents": "2,009",
      Deaths: "6,313",
      Injuries: "12,769",
    },
    {
      Year: 2004,
      "Number of incidents": "1,162",
      Deaths: "5,718",
      Injuries: "11,817",
    },
    {
      Year: 2003,
      "Number of incidents": "1,262",
      Deaths: "3,278",
      Injuries: "7,091",
    },
    {
      Year: 2002,
      "Number of incidents": "1,332",
      Deaths: "4,799",
      Injuries: "7,103",
    },
    {
      Year: 2001,
      "Number of incidents": "1,907",
      Deaths: "7,743",
      Injuries: "21,151",
    },
    {
      Year: 2000,
      "Number of incidents": "1,813",
      Deaths: "4,402",
      Injuries: "5,869",
    },
    {
      Year: 1999,
      "Number of incidents": "1,395",
      Deaths: "3,388",
      Injuries: "5,341",
    },
    {
      Year: 1998,
      "Number of incidents": 933,
      Deaths: "4,688",
      Injuries: "8,183",
    },
    {
      Year: 1997,
      "Number of incidents": "3,200",
      Deaths: "10,928",
      Injuries: "9,174",
    },
    {
      Year: 1996,
      "Number of incidents": "3,056",
      Deaths: "6,965",
      Injuries: "10,781",
    },
    {
      Year: 1995,
      "Number of incidents": "3,081",
      Deaths: "6,094",
      Injuries: "14,288",
    },
    {
      Year: 1994,
      "Number of incidents": "3,458",
      Deaths: "7,691",
      Injuries: "7,573",
    },
    {
      Year: 1993,
      "Number of incidents": 747,
      Deaths: "2,669",
      Injuries: "5,600",
    },
    {
      Year: 1992,
      "Number of incidents": "5,073",
      Deaths: "9,745",
      Injuries: "9,927",
    },
    {
      Year: 1991,
      "Number of incidents": "4,683",
      Deaths: "8,429",
      Injuries: "7,591",
    },
    {
      Year: 1990,
      "Number of incidents": "3,887",
      Deaths: "7,148",
      Injuries: "6,128",
    },
    {
      Year: 1989,
      "Number of incidents": "4,323",
      Deaths: "8,136",
      Injuries: "5,512",
    },
    {
      Year: 1988,
      "Number of incidents": "3,720",
      Deaths: "7,189",
      Injuries: "6,860",
    },
    {
      Year: 1987,
      "Number of incidents": "3,184",
      Deaths: "6,476",
      Injuries: "5,769",
    },
    {
      Year: 1986,
      "Number of incidents": "2,860",
      Deaths: "4,976",
      Injuries: "5,814",
    },
    {
      Year: 1985,
      "Number of incidents": "2,915",
      Deaths: "7,094",
      Injuries: "5,130",
    },
    {
      Year: 1984,
      "Number of incidents": "3,495",
      Deaths: "10,450",
      Injuries: "5,291",
    },
    {
      Year: 1983,
      "Number of incidents": "2,870",
      Deaths: "9,444",
      Injuries: "4,047",
    },
    {
      Year: 1982,
      "Number of incidents": "2,545",
      Deaths: "5,135",
      Injuries: "3,342",
    },
    {
      Year: 1981,
      "Number of incidents": "2,585",
      Deaths: "4,851",
      Injuries: "3,337",
    },
    {
      Year: 1980,
      "Number of incidents": "2,662",
      Deaths: "4,391",
      Injuries: "3,645",
    },
    {
      Year: 1979,
      "Number of incidents": "2,661",
      Deaths: "2,100",
      Injuries: "2,502",
    },
    {
      Year: 1978,
      "Number of incidents": "1,526",
      Deaths: "1,459",
      Injuries: "1,600",
    },
    {
      Year: 1977,
      "Number of incidents": "1,319",
      Deaths: 456,
      Injuries: 518,
    },
    {
      Year: 1976,
      "Number of incidents": 923,
      Deaths: 672,
      Injuries: 755,
    },
    {
      Year: 1975,
      "Number of incidents": 740,
      Deaths: 617,
      Injuries: 617,
    },
    {
      Year: 1974,
      "Number of incidents": 580,
      Deaths: 542,
      Injuries: 763,
    },
    {
      Year: 1973,
      "Number of incidents": 473,
      Deaths: 370,
      Injuries: 495,
    },
    {
      Year: 1972,
      "Number of incidents": 496,
      Deaths: 566,
      Injuries: 408,
    },
    {
      Year: 1971,
      "Number of incidents": 470,
      Deaths: 173,
      Injuries: 82,
    },
    {
      Year: 1970,
      "Number of incidents": 651,
      Deaths: 171,
      Injuries: 192,
    },
  ];

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
      styles: [
        {
          label: "label",
          key: "label",
          comType: "group",
          rows: [
            {
              label: "showLabel",
              key: "showLabel",
              default: false,
              comType: "checkbox",
            },
            {
              label: "showLabelBySwitch",
              key: "showLabelBySwitch",
              default: true,
              comType: "switch",
              watcher: {
                deps: ["showLabel"],
                action: (props) => {
                  return {
                    comType: props.showLabel ? "checkbox" : "switch",
                    disabled: props.showLabel,
                  };
                },
              },
            },
            {
              label: "showDataColumns",
              key: "dataColumns",
              comType: "select",
              options: [
                {
                  getItems: (cols) => {
                    const sections = (cols || []).filter((col) =>
                      ["metrics", "dimension"].includes(col.key)
                    );
                    const columns = sections.reduce(
                      (acc, cur) => acc.concat(cur.rows || []),
                      []
                    );
                    return columns.map((c) => ({
                      key: c.uid,
                      value: c.uid,
                      label:
                        c.label || c.aggregate
                          ? `${c.aggregate}(${c.colName})`
                          : c.colName,
                    }));
                  },
                },
              ],
            },
            {
              label: "font",
              key: "font",
              comType: "font",
            },
          ],
        },
      ],
      i18ns: [
        {
          lang: "zh",
          translation: {
            label: "标签",
            showLabel: "显示标签",
            showLabelBySwitch: "显示标签2",
            showLabelByInput: "显示标签3",
            showLabelWithSelect: "显示标签4",
            fontFamily: "字体",
            fontSize: "字体大小",
            fontColor: "字体颜色",
            rotateLabel: "旋转标签",
            showDataColumns: "选择数据列",
            legend: {
              label: "图例",
              showLabel: "图例-显示标签",
              showLabel2: "图例-显示标签2",
            },
          },
        },
        {
          lang: "en",
          translation: {
            label: "Label",
            showLabel: "Show Label",
            showLabelBySwitch: "Show Lable Switch",
            showLabelWithInput: "Show Label Input",
            showLabelWithSelect: "Show Label Select",
          },
        },
      ],
    },
    isISOContainer: "experiment-antvg2-chart",
    dependency: [
      "https://cdnjs.cloudflare.com/ajax/libs/antv-g2/4.1.34/g2.min.js",
      "https://cdn.jsdelivr.net/npm/@antv/data-set@0.11.8/build/data-set.min.js",
    ],
    meta: {
      id: "experiment-antvg2-chart",
      name: "[Experiment] AntV G2 Chart",
      icon: "chart",
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

      const { Chart } = context.window.G2;
      if (!Chart) {
        return;
      }

      const ds = new context.window.Dataset();
      const chart = new Chart({
        container: options.containerId,
        autoFit: true,
        height: 500,
        syncViewPadding: true,
      });

      chart.scale({
        Deaths: {
          sync: true,
          nice: true,
        },
        death: {
          sync: true,
          nice: true,
        },
      });

      const dv1 = ds.createView().source(mockData);
      dv1.transform({
        type: "map",
        callback: (row) => {
          if (typeof row.Deaths === "string") {
            row.Deaths = row.Deaths.replace(",", "");
          }
          row.Deaths = parseInt(row.Deaths, 10);
          row.death = row.Deaths;
          row.year = row.Year;
          return row;
        },
      });
      const view1 = chart.createView();
      view1.data(dv1.rows);
      view1.axis("Year", {
        subTickLine: {
          count: 3,
          length: 3,
        },
        tickLine: {
          length: 6,
        },
      });
      view1.axis("Deaths", {
        label: {
          formatter: (text) => {
            return text.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
          },
        },
      });
      view1.line().position("Year*Deaths");

      const dv2 = ds.createView().source(dv1.rows);
      dv2.transform({
        type: "regression",
        method: "polynomial",
        fields: ["year", "death"],
        bandwidth: 0.1,
        as: ["year", "death"],
      });

      const view2 = chart.createView();
      view2.axis(false);
      view2.data(dv2.rows);
      view2
        .line()
        .position("year*death")
        .style({
          stroke: "#969696",
          lineDash: [3, 3],
        })
        .tooltip(false);
      view1.annotation().text({
        content: "趋势线",
        position: ["1970", 2500],
        style: {
          fill: "#8c8c8c",
          fontSize: 14,
          fontWeight: 300,
        },
        offsetY: -70,
      });
      chart.render();
    },

    onUpdated(props, context) {},

    onUnMount() {},

    onResize(opt, context) {},
  };
}
