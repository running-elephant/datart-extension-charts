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
    isISOContainer: "experiment-threejs-industry",
    dependency: [
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

    onMount(options, context) {
      if (options.containerId === undefined || !context.document) {
        return;
      }
      const { THREE } = context.window;
      if (!THREE) {
        return;
      }
      this.THREE = THREE;
      this.window = context.window;
      this.container = context.document.getElementById(options.containerId);

      //Scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x8cc7de);

      //Camera
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.window.innerWidth / this.window.innerHeight,
        0.1,
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
      this.ifcLoader.ifcManager.setOnProgress = (event) => {
        const progress = (event.total / event.progress) * 100;
        console.log(`progress ---> `, progress);
      };
      this.ifcLoader.ifcManager.setWasmPath("/web-ifc/");
      this.ifcLoader.load(
        "https://threejs.org/examples/models/ifc/rac_advanced_sample_project.ifc",
        (model) => {
          this.scene.add(model.mesh);
          this.render();
        }
      );

      this.window.onpointerdown = (event) => this.selectObject(event);

      //Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.window.innerWidth, this.window.innerHeight);
      this.renderer.setPixelRatio(this.window.devicePixelRatio);
      this.container.appendChild(this.renderer.domElement);

      //Controls
      const controls = new THREE.OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      controls.addEventListener("change", () => this.render());
      this.window.addEventListener("resize", () => this.onWindowResize());
      this.render();
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

      // const gridHelper = new THREE.GridHelper(10, 20, 0x888888, 0x444444);
      // this.scene.add(gridHelper);

      // const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      // this.scene.add(ambientLight);

      // const pointLight = new THREE.PointLight(0xffffff, 0.8);
      // this.scene.add(this.camera);
      // this.camera.add(pointLight);

      // this.renderer = new THREE.WebGLRenderer({ antialias: true });
      // this.renderer.outputEncoding = THREE.sRGBEncoding;
      // this.renderer.setPixelRatio(window.devicePixelRatio);
      // this.renderer.setSize(
      //   context.window.innerWidth,
      //   context.window.innerHeight
      // );

      // this.container.appendChild(this.renderer.domElement);

      // this.controls = new THREE.OrbitControls(
      //   this.camera,
      //   this.renderer.domElement
      // );
      // this.controls.screenSpacePanning = true;
      // this.controls.minDistance = 5;
      // this.controls.maxDistance = 40;
      // this.controls.target.set(0, 2, 0);
      // this.controls.update();

      // this.stats = new Stats();
      // this.container.appendChild(this.stats.dom);

      // this.animate(context.window);
    },

    onUnMount() {
      if (this.ifcLoader) {
        this.ifcLoader.ifcManager.dispose();
      }
    },

    onResize(_, context) {
      if (!this.camera || !this.renderer) return;

      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    },

    onWindowResize() {
      if (!this.camera || !this.renderer) return;

      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.window.innerWidth, this.window.innerHeight);
      this.render();
    },

    selectObject(event) {
      if (event.button != 0) return;

      const mouse = new this.THREE.Vector2();
      mouse.x = (event.clientX / this.window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / this.window.innerHeight) * 2 + 1;

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
          material: highlightMaterial,
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

      console.log("r --------> ", this.scene, this.camera);
      this.renderer.render(this.scene, this.camera);
    },
  };
}
