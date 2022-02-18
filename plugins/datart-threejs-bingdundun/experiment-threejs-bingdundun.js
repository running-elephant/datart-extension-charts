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

export function BingDunDun({ dHelper }) {
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
    isISOContainer: "experiment-threejs-bingdundun",
    dependency: [
      "https://unpkg.com/three@0.131.3/build/three.min.js",
      "https://unpkg.com/three@0.131.3/examples/js/libs/stats.min.js",
      "https://unpkg.com/three@0.131.3/examples/js/loaders/GLTFLoader.js",
      "https://unpkg.com/three@0.131.3/examples/js/controls/OrbitControls.js",
    ],
    meta: {
      id: "experiment-threejs-bingdundun",
      name: "[Experiment] 冰墩墩",
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
    meshes: [],
    window: null,
    loadingProcessTimeout: null,

    onMount(options, context) {
      if (options.containerId === undefined || !context.document) {
        return;
      }
      const { THREE } = context.window;
      if (!THREE) {
        return;
      }

      this.window = context.window;
      this.container = context.document.getElementById(options.containerId);
      this.camera = new THREE.PerspectiveCamera(
        25,
        context.window.innerWidth / context.window.innerHeight,
        1,
        1000
      );
      this.camera.position.set(0, 30, 100);
      this.scene = new THREE.Scene();
      this.clock = new THREE.Clock();

      const manager = new THREE.LoadingManager();

      const loader = new THREE.GLTFLoader(manager);
      const laoderCallback = (mesh) => {
        mesh.scene.traverse((child) => {
          if (child.isMesh) {
            this.meshes.push(child);

            if (child.name === "皮肤") {
              child.material.metalness = 0.3;
              child.material.roughness = 0.8;
            }

            if (child.name === "外壳") {
              child.material.transparent = true;
              child.material.opacity = 0.4;
              child.material.metalness = 0.4;
              child.material.roughness = 0;
              child.material.refractionRatio = 1.6;
              child.castShadow = true;
              child.material.envMapIntensity = 1;
            }

            if (child.name === "围脖") {
              child.material.transparent = true;
              child.material.opacity = 0.6;
              child.material.metalness = 0.4;
              child.material.roughness = 0.6;
            }
          }
        });







        




        mesh.scene.rotation.y = Math.PI / 24;
        mesh.scene.position.set(0, 0, 0);
        mesh.scene.scale.set(16, 16, 16);

        this.scene.fog = new THREE.Fog(0xffffff, 10, 100);
        this.scene.add(mesh.scene);
      };
      loader.load(
        "https://unpkg.com/datart-extension-charts@0.0.1/plugins/datart-threejs-bingdundun/bingdundun.glb",
        laoderCallback
      );
    },

    onUpdated(props, context) {
      if (!props.dataset || !props.dataset.columns || !props.config) {
        return;
      }
      if (!this.isMatchRequirement(props.config)) {
        this.chart.clear();
        return;
      }
      const { THREE, Stats } = context.window;

      const gridHelper = new THREE.GridHelper(10, 20, 0x888888, 0x444444);
      this.scene.add(gridHelper);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      this.scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 0.8);
      this.scene.add(this.camera);
      this.camera.add(pointLight);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.shadowMap.enabled = true;
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(
        context.window.innerWidth,
        context.window.innerHeight
      );

      this.container.appendChild(this.renderer.domElement);

      this.controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      this.controls.screenSpacePanning = true;
      this.controls.minDistance = 5;
      this.controls.maxDistance = 40;
      this.controls.target.set(0, 2, 0);
      this.controls.update();

      this.stats = new Stats();
      this.container.appendChild(this.stats.dom);

      this.animate(context.window);
    },

    onUnMount() {},

    onResize(_, context) {
      this.camera.aspect =
        context.window.innerWidth / context.window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(
        context.window.innerWidth,
        context.window.innerHeight
      );
    },

    animate() {
      this.window.requestAnimationFrame(this.animate.bind(this));
      this.render();
      this.stats.update();
    },

    render() {
      const delta = this.clock.getDelta();
      if (!!this.mixer) {
        this.mixer.update(delta);
      }
      this.renderer.render(this.scene, this.camera);
    },
  };
}
