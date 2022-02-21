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

import svgIcon from './scroll-table.svg';

export function ScrollChart({ dHelper }) {
  return {
    config: {
      datas: [
        {
          label: 'mixed',
          key: 'mixed',
          required: true,
          type: 'mixed',
          limit: [1, 999],
        },
        {
          label: 'filter',
          key: 'filter',
          type: 'filter',
          disableAggregate: true,
        },
      ],
      styles: [
        {
          label: 'marquee.title',
          key: 'marquee',
          comType: 'group',
          rows: [
            {
              label: 'marquee.delayBeforeStart',
              key: 'delayBeforeStart',
              default: 1000,
              comType: 'inputNumber',
            },
            {
              label: 'marquee.direction',
              key: 'direction',
              default: 'up',
              comType: 'select',
              options: {
                items: [
                  { label: '向上', value: 'up' },
                  { label: '向下', value: 'down' },
                  { label: '向左', value: 'left' },
                  { label: '向右', value: 'right' },
                ],
              },
            },
            {
              label: 'marquee.duration',
              key: 'duration',
              default: 5000,
              comType: 'inputNumber',
            },
            {
              label: 'marquee.gap',
              key: 'gap',
              default: 0,
              comType: 'inputNumber',
            },
            {
              label: 'marquee.pauseOnHover',
              key: 'pauseOnHover',
              default: true,
              comType: 'checkbox',
            },
            {
              label: 'marquee.duplicated',
              key: 'duplicated',
              default: true,
              comType: 'checkbox',
            },
            {
              label: 'marquee.startVisible',
              key: 'startVisible',
              default: true,
              comType: 'checkbox',
            },
          ],
        },
      ],
      settings: [
        {
          label: 'viz.palette.setting.paging.title',
          key: 'paging',
          comType: 'group',
          rows: [
            {
              label: 'viz.palette.setting.paging.pageSize',
              key: 'pageSize',
              default: 1000,
              comType: 'inputNumber',
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
          lang: 'zh-CN',
          translation: {
            chartName: '[Experiment] 自定义Jquery滚动图表插件',
            marquee: {
              title: '滚动设置',
              delayBeforeStart: '开始延迟',
              direction: '运动方向',
              duration: '持续时间',
              gap: '间隙',
              pauseOnHover: '悬停时暂停',
              duplicated: '是否连续',
              startVisible: '是否在起点显示',
            },
            reference: {
              title: '参考线',
              open: '点击参考线配置',
            },
          },
        },
        {
          lang: 'en-US',
          translation: {
            chartName: '[Experiment] Scroll The Chart',
            marquee: {
              title: 'Scroll',
              delayBeforeStart: 'Delay Before Start',
              direction: 'Direction',
              duration: 'Duration',
              gap: 'Gap',
              pauseOnHover: 'Pause On Hover',
              duplicated: 'Duplicated',
              startVisible: 'Start Visible',
            },
            reference: {
              title: 'Reference',
              open: 'Open',
            },
          },
        },
      ],
    },
    isISOContainer: 'demo-scroll-the-chart',
    dependency: [
      'https://www.jeasyui.com/easyui/jquery.min.js',
      'https://cdn.jsdelivr.net/npm/jquery.marquee@1.6.0/jquery.marquee.min.js',
      'https://cdn.datatables.net/1.11.4/css/jquery.dataTables.css',
      'https://cdn.datatables.net/1.11.4/js/jquery.dataTables.js',
    ],
    meta: {
      id: 'demo-scroll-the-chart',
      name: 'chartName',
      icon: svgIcon,
      requirements: [
        {
          group: [0, 999],
          aggregate: [0, 999],
        },
      ],
    },
    containerId: '',
    jQuery: null,
    tableBox: null,

    onMount(options, context) {
      if ('$' in context.window) {
        const { marqueeOptions, dataTableOptions } = this.getMarqueeOptions(
          options.dataset,
          options.config,
        );
        this.containerId = options.containerId;
        this.jQuery = context.window.$;
        this.chart = this.jQuery(`#${this.containerId}`);
        this.chart.width(context.width + 'px');
        this.chart.html(
          `<table id="${this.containerId}-scroll-table" style='min-height: 100%; width: 100%;'></table>`,
        );
        this.tableBox = this.jQuery(
          `#${this.containerId}-scroll-table`,
        ).dataTable(dataTableOptions);
        this.chart.marquee(marqueeOptions);
      }
    },

    onUpdated(props) {
      if (!props.dataset || !props.dataset.columns || !props.config) {
        return;
      }
      if (!this.isMatchRequirement(props.config)) {
        return;
      }
      this.chart.marquee('destroy');
      this.tableBox.fnClearTable();
      this.tableBox.fnDestroy();
      this.jQuery(`#${this.containerId}-scroll-table`).empty();
      const { marqueeOptions, dataTableOptions } = this.getMarqueeOptions(
        props.dataset,
        props.config,
      );
      this.jQuery(`#${this.containerId}-scroll-table`).dataTable(
        Object.assign(dataTableOptions, { destroy: true }),
      );
      this.jQuery(`#${this.containerId}-scroll-table thead`).remove();
      this.jQuery(`#${this.containerId}-scroll-table`).css({
        border: 'none',
      });
      this.chart.marquee(marqueeOptions);
    },

    onUnMount() {
      this.tableBox.fnClearTable();
      this.tableBox.fnDestroy();
      this.jQuery(`#${this.containerId}-scroll-table`).empty();
      this.chart.marquee('destroy');
    },

    onResize(opt, context) {
      const { marqueeOptions } = this.getMarqueeOptions(
        opt.dataset,
        opt.config,
      );
      this.chart.width(context.width + 'px');
      this.chart.marquee('destroy');
      this.chart.marquee(marqueeOptions);
    },

    getMarqueeOptions(dataset, config) {
      const styleConfigs = config.styles;
      const dataConfigs = config.datas || [];
      const mixedSectionConfigRows = dataConfigs
        .filter((c) => c.key === 'mixed')
        .flatMap((config) => config.rows || []);
      const chartDataSet = dHelper.transformToDataSet(
        dataset.rows,
        dataset.columns,
        dataConfigs,
      );
      const [
        delayBeforeStart,
        direction,
        duration,
        gap,
        pauseOnHover,
        duplicated,
        startVisible,
      ] = dHelper.getStyles(
        styleConfigs,
        ['marquee'],
        [
          'delayBeforeStart',
          'direction',
          'duration',
          'gap',
          'pauseOnHover',
          'duplicated',
          'startVisible',
        ],
      );
      return {
        marqueeOptions: {
          delayBeforeStart: delayBeforeStart || 0,
          direction,
          duration: duration || 0,
          gap: gap || 0,
          pauseOnHover,
          duplicated,
          startVisible,
          pauseOnCycle: duration || 0,
        },
        dataTableOptions: {
          data: chartDataSet.map((dc) => {
            const dataConfig = {};
            mixedSectionConfigRows.forEach((mixedConfig) => {
              dataConfig[dHelper.getColumnRenderName(mixedConfig)] =
                dHelper.toFormattedValue(
                  dc.getCell(mixedConfig),
                  mixedConfig.format,
                );
            });
            return dataConfig;
          }),
          columns: mixedSectionConfigRows.map((mixedConfig) => ({
            data: dHelper.getColumnRenderName(mixedConfig),
          })),
          cellBorder: true,
          autoWidth: true,
          paging: false,
          searching: false,
          ordering: false,
          info: false,
        },
      };
    },
  };
}
