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

import Icon from "./lottie-icon.svg";
import Data from './data.json';

export function LottieChart({}) {
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
    isISOContainer: "experiment-lottie-chart",
    dependency: [
      "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js",
    ],
    meta: {
      id: "experiment-lottie-chart",
      name: "[Experiment] Lottie Chart",
      icon: Icon,
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

      const { bodymovin } = context.window;
      if (!bodymovin) {
        return;
      }

      var animation = bodymovin.loadAnimation({
        container: context.document.getElementById(options.containerId),
        animType: "svg",
        loop: true,
        animationData: Data,
        // path: 'https://labs.nearpod.com/bodymovin/demo/markus/halloween/markus.json';
      });
    },

    onUpdated(props, context) {},

    onUnMount() {},
  };
}
