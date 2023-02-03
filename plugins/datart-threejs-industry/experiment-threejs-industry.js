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

import icon from "./threejs-icon.svg";
import { IFCLoader } from "web-ifc-three/IFCLoader";
import mockData from "./sample";
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from "three-mesh-bvh";

/**
 * Example From: https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_ifc.html
 */
export function ThreeJSWebGLIndustry({ dHelper }) {
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
    isISOContainer: "experiment-threejs-industry",
    useIFrame: false,
    dependency: [
      "https://cdnjs.cloudflare.com/ajax/libs/antv-g2/4.1.34/g2.min.js",
      "https://cdn.jsdelivr.net/npm/@antv/data-set@0.11.8/build/data-set.min.js",
      "https://cdn.jsdelivr.net/npm/three@0.135.0/build/three.min.js",
      "https://unpkg.com/three@0.135.0/examples/js/controls/OrbitControls.js",
    ],
    meta: {
      id: "experiment-threejs-industry",
      name: "[Experiment] ThreeJS Industry",
      icon: icon,
      requirements: [
        {
          group: null,
          aggregate: null,
        },
      ],
    },
    container: null,
    stats: null,
    clock: null,
    controls: null,
    camera: null,
    scene: null,
    renderer: null,
    mixer: null,
    mesh: null,
    window: null,
    ifcLoader: null,
    THREE: null,
    chart: null,

    onMount(options, context) {
      if (options.containerId === undefined || !context.document) {
        return;
      }

      const chartDomEle = document.createElement("div");
      if (context.window.G2) {
        chartDomEle.style.position = "absolute";
        chartDomEle.style.top = "25px";
        chartDomEle.style.right = "25px";
        chartDomEle.style.opacity = 0.8;
        this.chart = this.initAntVChart(options, context, chartDomEle);
      }

      const { THREE } = context.window;
      if (!THREE) {
        return;
      }
      this.THREE = THREE;
      this.window = context.window;
      this.container = context.document.getElementById(options.containerId);
      const progressBarDomEle = document.createElement("div");
      progressBarDomEle.style.position = "absolute";
      progressBarDomEle.style.width = "130px";
      progressBarDomEle.style.height = "24px";
      progressBarDomEle.style.top = "25px";
      progressBarDomEle.style.left = "25px";
      progressBarDomEle.style.opacity = 0.8;
      progressBarDomEle.style.background = "green";
      progressBarDomEle.innerHTML = "资源下载中...";

      //Scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x8cc7de);

      //Camera
      this.camera = new THREE.PerspectiveCamera(
        45,
        context.width / context.height,
        1,
        1000
      );
      this.camera.position.z = -70;
      this.camera.position.y = 25;
      this.camera.position.x = 90;

      //Initial cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
      const cube = new THREE.Mesh(geometry, material);
      this.scene.add(cube);

      //Lights
      const directionalLight1 = new THREE.DirectionalLight(0xffeeff, 0.8);
      directionalLight1.position.set(1, 1, 1);
      this.scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight2.position.set(-1, 0.5, -1);
      this.scene.add(directionalLight2);

      const ambientLight = new THREE.AmbientLight(0xffffee, 0.25);
      this.scene.add(ambientLight);

      //Setup IFC Loader
      this.ifcLoader = new IFCLoader();
      // this.ifcLoader.ifcManager.setupThreeMeshBVH(
      //   acceleratedRaycast,
      //   computeBoundsTree,
      //   disposeBoundsTree
      // );
      this.ifcLoader.ifcManager.setOnProgress((event) => {
        const progress = Math.round((event.loaded / event.total) * 100);
        progressBarDomEle.innerText = `当前进度: ${progress} %`;
        this.render();
      });
      this.ifcLoader.ifcManager.setWasmPath("/web-ifc/");
      this.ifcLoader.load(
        "https://threejs.org/examples/models/ifc/rac_advanced_sample_project.ifc",
        (model) => {
          this.scene.add(model.mesh);
          this.render();
        }
      );

      // 选择模型片段效果实现
      // this.window.onpointerdown = (event) => this.selectObject(event, context);

      //Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(context.width, context.height);
      this.renderer.setPixelRatio(context.window.devicePixelRatio);
      this.container.appendChild(this.renderer.domElement);
      this.container.appendChild(progressBarDomEle);
      this.container.appendChild(chartDomEle);

      //Controls
      const controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      controls.addEventListener("change", () => this.render());
      this.render();
    },

    onUpdated(props, context) {
      if (
        !props.dataset ||
        !props.dataset.columns ||
        !props.config ||
        !this.chart
      ) {
        return;
      }
      if (!this.isMatchRequirement(props.config)) {
        return;
      }
      const DataSet = context.window.DataSet;
      const ds = new DataSet();
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
      const view1 = this.chart.createView();
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

      const view2 = this.chart.createView();
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
      this.chart.render();
    },

    onUnMount() {
      if (this.ifcLoader) {
        this.ifcLoader.ifcManager.dispose();
      }
      this.chart = null;
    },

    onResize(_, context) {
      if (!this.camera || !this.renderer) {
        return;
      }
      this.renderer.setSize(context.width, context.height);
      camera.aspect = context.width / context.height;
      this.camera.updateProjectionMatrix();
      this.render();
    },

    selectObject(event, context) {
      if (event.button != 0) return;

      const mouse = new this.THREE.Vector2();
      mouse.x = (event.clientX / context.width) * 2 - 1;
      mouse.y = -(event.clientY / context.height) * 2 + 1;

      const raycaster = new this.THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera);
      const intersected = raycaster.intersectObjects(
        this.scene.children,
        false
      );

      const highlightMaterial = new this.THREE.MeshPhongMaterial({
        color: 0xff00ff,
        depthTest: false,
        transparent: true,
        opacity: 0.3,
      });

      if (intersected.length) {
        const found = intersected[0];
        const faceIndex = found.faceIndex;
        const geometry = found.object.geometry;
        const id = this.ifcLoader.ifcManager.getExpressId(geometry, faceIndex);

        const modelID = found.object.modelID;
        this.ifcLoader.ifcManager.createSubset({
          modelID,
          ids: [id],
          scene: this.scene,
          removePrevious: true,
          // material: highlightMaterial,
        });
        const props = this.ifcLoader.ifcManager.getItemProperties(
          modelID,
          id,
          true
        );
        this.renderer.render(this.scene, this.camera);
      }
    },

    render() {
      if (!this.renderer) return;
      this.renderer.render(this.scene, this.camera);
    },

    initAntVChart(options, context, chartDomEle) {
      const { Chart } = context.window.G2;
      if (!Chart) {
        return;
      }
      const chart = new Chart({
        container: chartDomEle,
        autoFit: true,
        height: 200,
        width: 200,
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
      return chart;
    },
  };
}
