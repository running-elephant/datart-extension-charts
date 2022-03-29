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

import Icon from './babylon-js-logo.svg';

export function BabylonJSDemo() {
  return {
    config: {
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
          lang: "zh-CN",
          translation: {
            chartName: "BabylonJS",
          },
        },
        {
          lang: "en-US",
          translation: {
            chartName: "BabylonJS",
          },
        },
      ],
    },
    isISOContainer: "experiment-babylon-demo",
    dependency: [
      "https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.2/dat.gui.min.js",
      "https://assets.babylonjs.com/generated/Assets.js",
      "https://preview.babylonjs.com/ammo.js",
      "https://preview.babylonjs.com/cannon.js",
      "https://preview.babylonjs.com/Oimo.js",
      "https://preview.babylonjs.com/earcut.min.js",
      "https://preview.babylonjs.com/babylon.js",
      "https://preview.babylonjs.com/materialsLibrary/babylonjs.materials.min.js",
      "https://preview.babylonjs.com/proceduralTexturesLibrary/babylonjs.proceduralTextures.min.js",
      "https://preview.babylonjs.com/postProcessesLibrary/babylonjs.postProcess.min.js",
      "https://preview.babylonjs.com/loaders/babylonjs.loaders.js",
      "https://preview.babylonjs.com/serializers/babylonjs.serializers.min.js",
      "https://preview.babylonjs.com/gui/babylon.gui.min.js",
      "https://preview.babylonjs.com/inspector/babylon.inspector.bundle.js",
    ],
    meta: {
      id: "experiment-babylon-demo",
      name: "chartName",
      icon: Icon,
      requirements: [
        {
          group: null,
          aggregate: null,
        },
      ],
    },

    engine: { resize: () => {} },
    canvas: { id: "", style: "" },
    scene: { activeCamera: {}, render: () => {} },
    sceneToRender: {
      activeCamera: {},
      render: () => {},
    },
    global: {
      Ammo: () => {},
      initFunction: async () => {},
      BABYLON: { Engine: (a, b, c) => {} },
    },

    onMount(options, context) {
      if (options.containerId === undefined || !context.document) {
        return;
      }

      const { BABYLON } = context.window;
      this.global = context.window;
      if (!BABYLON?.Scene || !this.global) {
        return;
      }

      this.canvas = context.document.createElement("canvas");
      this.canvas.id = "babylonjs-canvas-container";
      this.canvas.style = "width: 100%; height: 100%"

      context.document
        .getElementById(options.containerId)
        .appendChild(this.canvas);

      let self = this;
      this.global.initFunction = async function () {
        await self.global.Ammo();

        var asyncEngineCreation = async function () {
          try {
            return self.createDefaultEngine();
          } catch (e) {
            console.log(
              "the available createEngine function failed. Creating the default engine instead"
            );
            return self.createDefaultEngine();
          }
        };

        self.engine = await asyncEngineCreation();
        if (!self.engine) throw "engine should not be null.";

        self.startRenderLoop(self.engine);
        self.scene = self.createScene(BABYLON, self.engine);
      };

      this.global.initFunction().then(() => {
        this.sceneToRender = this.scene;
      });
    },

    onUpdated(props, context) {},

    onUnMount() {},

    onResize(opt, context) {
      this.engine.resize();
    },

    createDefaultEngine() {
      return new this.global.BABYLON.Engine(this.canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
        disableWebGL2Support: false,
      });
    },

    startRenderLoop(engine) {
      let self = this;
      engine.runRenderLoop(function () {
        if (self.sceneToRender && self.sceneToRender.activeCamera) {
          self.sceneToRender.render();
        }
      });
    },

    createScene(BABYLON, engine) {
      // This creates a basic Babylon Scene object (non-mesh)
      var scene = new BABYLON.Scene(engine) || {};

      // Environment
      var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
        "/textures/environment.dds",
        scene
      );
      hdrTexture.name = "envTex";
      hdrTexture.gammaSpace = false;
      scene.environmentTexture = hdrTexture;

      var skybox = BABYLON.MeshBuilder.CreateBox(
        "skyBox",
        { size: 1000.0 },
        scene
      );
      var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
        "textures/skybox",
        scene
      );
      skyboxMaterial.reflectionTexture.coordinatesMode =
        BABYLON.Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      skybox.material = skyboxMaterial;

      //setup camera
      var camera = new BABYLON.ArcRotateCamera(
        "Camera",
        BABYLON.Tools.ToRadians(-120),
        BABYLON.Tools.ToRadians(80),
        65,
        new BABYLON.Vector3(0, -15, 0),
        scene
      );
      camera.attachControl(this.canvas, false);

      //enable Physics in the scene
      scene.enablePhysics(
        new BABYLON.Vector3(0, -12, 0),
        new BABYLON.AmmoJSPlugin()
      );

      //setup lights
      var light1 = new BABYLON.PointLight(
        "light1",
        new BABYLON.Vector3(0, 5, -6),
        scene
      );
      var light2 = new BABYLON.PointLight(
        "light2",
        new BABYLON.Vector3(6, 5, 3.5),
        scene
      );
      var light3 = new BABYLON.DirectionalLight(
        "light3",
        new BABYLON.Vector3(20, -5, 20),
        scene
      );
      light1.intensity = 15;
      light2.intensity = 5;

      //create an array of different starting positions for the marbles
      var marbleStartPosArray = [
        new BABYLON.Vector3(0.2, 3.5, 0),
        new BABYLON.Vector3(0, 3.5, 0.2),
        new BABYLON.Vector3(-0.2, 3.5, 0),
        new BABYLON.Vector3(0, 3.5, -0.2),
      ];

      //create a box used to trigger the destrucion of marbles
      var killBox = BABYLON.MeshBuilder.CreateBox(
        "killBox",
        { width: 100, depth: 100, height: 0.5 },
        scene
      );
      killBox.position = new BABYLON.Vector3(0, -50, 0);
      killBox.visibility = 0;

      var marbleMaterialArray: any[] = [];

      engine.displayLoadingUI();

      Promise.all([
        BABYLON.SceneLoader.AppendAsync(
          "https://models.babylonjs.com/Marble/marble/marble.gltf"
        ),
        BABYLON.SceneLoader.AppendAsync(
          "https://models.babylonjs.com/Marble/marbleTower/marbleTower.gltf"
        ),
      ]).then(function () {
        var marble = scene.getMeshByName("marble");
        marble.setParent(null);
        marble.visibility = 0;

        marbleMaterialArray.push(
          scene.getMaterialByName("blueMat"),
          scene.getMaterialByName("greenMat"),
          scene.getMaterialByName("redMat"),
          scene.getMaterialByName("purpleMat"),
          scene.getMaterialByName("yellowMat")
        );

        //get each mesh that's been loaded
        var tower = scene.getMeshByName("tower");
        var rockerBottom = scene.getMeshByName("rockerBottom");
        var rockerTop = scene.getMeshByName("rockerTop");
        var spinner = scene.getMeshByName("spinner");
        var supports = scene.getMeshByName("supports");
        var track = scene.getMeshByName("track");
        var wheel = scene.getMeshByName("wheel");

        //set the parents of each mesh to null
        tower.setParent(null);
        rockerBottom.setParent(null);
        rockerTop.setParent(null);
        spinner.setParent(null);
        supports.setParent(null);
        track.setParent(null);
        wheel.setParent(null);

        //add physics imposters to anything marbles will collide with
        tower.physicsImpostor = new BABYLON.PhysicsImpostor(
          tower,
          BABYLON.PhysicsImpostor.MeshImpostor,
          { mass: 0, friction: 1 },
          scene
        );
        supports.physicsImpostor = new BABYLON.PhysicsImpostor(
          supports,
          BABYLON.PhysicsImpostor.MeshImpostor,
          { mass: 0, friction: 1 },
          scene
        );
        track.physicsImpostor = new BABYLON.PhysicsImpostor(
          track,
          BABYLON.PhysicsImpostor.MeshImpostor,
          { mass: 0, friction: 1 },
          scene
        );
        wheel.physicsImpostor = new BABYLON.PhysicsImpostor(
          wheel,
          BABYLON.PhysicsImpostor.MeshImpostor,
          { mass: 0, friction: 1 },
          scene
        );

        //setup the rocker

        // Create rocker pin as the phsyics root and parent loaded assets to it
        var rockerRoot = new BABYLON.Mesh("rockerRoot", scene);
        rockerBottom.setParent(rockerRoot);
        rockerTop.setParent(rockerRoot);
        rockerRoot.position = new BABYLON.Vector3(4.1, -6.4, 0);
        rockerRoot.rotation.x -= BABYLON.Tools.ToRadians(25);

        rockerTop.physicsImpostor = new BABYLON.PhysicsImpostor(
          rockerTop,
          BABYLON.PhysicsImpostor.ConvexHullImpostor,
          { mass: 0 },
          scene
        );
        rockerBottom.physicsImpostor = new BABYLON.PhysicsImpostor(
          rockerBottom,
          BABYLON.PhysicsImpostor.ConvexHullImpostor,
          { mass: 0 },
          scene
        );
        rockerRoot.physicsImpostor = new BABYLON.PhysicsImpostor(
          rockerRoot,
          BABYLON.PhysicsImpostor.NoImpostor,
          { mass: 2 },
          scene
        );

        var rockerPin = BABYLON.MeshBuilder.CreateCylinder(
          "Rocker",
          { diameter: 0.1, height: 1 },
          scene
        );
        rockerPin.rotation.z += BABYLON.Tools.ToRadians(90);
        rockerPin.position = new BABYLON.Vector3(4.1, -6.4, 0);
        rockerPin.physicsImpostor = new BABYLON.PhysicsImpostor(
          rockerPin,
          BABYLON.PhysicsImpostor.MeshImpostor,
          { mass: 0 },
          scene
        );
        rockerPin.visibility = 0;

        var joint1 = new BABYLON.HingeJoint({
          mainPivot: new BABYLON.Vector3(0, 0, 0),
          connectedPivot: new BABYLON.Vector3(0, 0, 0),
          mainAxis: new BABYLON.Vector3(-1, 0, 0),
          connectedAxis: new BABYLON.Vector3(0, 1, 0),
          nativeParams: {},
        });
        rockerRoot.physicsImpostor.addJoint(rockerPin.physicsImpostor, joint1);

        //handle logic for the brass wind-up spinner
        var currentWindUpAngle;
        var marbleSpawnRate = 8;
        var nextMarbleSpawnAngle = 360 / marbleSpawnRate;
        var spinnerRotateSpeed = 120;
        var marblePosition = 0;

        var spinnerPivotParent = new BABYLON.TransformNode(
          "spinnerPivotParent"
        );
        spinner.setParent(spinnerPivotParent);

        BABYLON.Animation.CreateAndStartAnimation(
          "spinnerRotation",
          spinnerPivotParent,
          "rotation.y",
          30,
          spinnerRotateSpeed,
          BABYLON.Tools.ToRadians(0),
          BABYLON.Tools.ToRadians(360),
          1
        );

        //handle logic for the large wheel
        var wheelPivotParent = new BABYLON.TransformNode("wheelPivotParent");
        wheelPivotParent.position.y -= 28.8;
        wheel.setParent(wheelPivotParent);
        BABYLON.Animation.CreateAndStartAnimation(
          "marbleTowerWheelRot",
          wheelPivotParent,
          "rotation.x",
          30,
          600,
          BABYLON.Tools.ToRadians(0),
          BABYLON.Tools.ToRadians(-360),
          1
        );

        //logic to change the starting marble position based on the rotation of the brass wind-up spinner
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            {
              trigger: BABYLON.ActionManager.OnEveryFrameTrigger,
            },
            function () {
              currentWindUpAngle = BABYLON.Tools.ToDegrees(
                spinnerPivotParent.rotation.y
              );
              if (
                nextMarbleSpawnAngle == 360 &&
                currentWindUpAngle < 360 / marbleSpawnRate
              ) {
                nextMarbleSpawnAngle = 360 / marbleSpawnRate;
              } else if (currentWindUpAngle >= nextMarbleSpawnAngle) {
                nextMarbleSpawnAngle += 360 / marbleSpawnRate;
                createMarble(marblePosition);
                marblePosition += 1;
                if (marblePosition == 4) {
                  marblePosition = 0;
                }
              }
            }
          )
        );

        engine.hideLoadingUI();
      });

      //This is a function to create marbles: creating a mesh, adding a physics imposter, and adding an event trigger
      function createMarble(spawnAngle) {
        //create a marble (sphere) using meshbuilder
        var marble = scene.getMeshByName("marble").clone("marbleClone");
        marble.visibility = 1;
        marble.material = marbleMaterialArray[Math.floor(Math.random() * 5)];

        //position the marble based on the incoming angle of the windup part of the marbleTower
        marble.position = marbleStartPosArray[spawnAngle];

        //add physics to the marble
        marble.physicsImpostor = new BABYLON.PhysicsImpostor(
          marble,
          BABYLON.PhysicsImpostor.SphereImpostor,
          { mass: 2, friction: 0.5, restitution: 0 },
          scene
        );

        //add an actionManager to the marble
        marble.actionManager = new BABYLON.ActionManager(scene);

        //register a new action with the marble's actionManager..this will execute code whenever the marble intersects the "killBox"
        marble.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            {
              trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
              parameter: killBox,
            },
            function () {
              fadeAndDestroyMarble(marble);
            }
          )
        );
      }

      function fadeAndDestroyMarble(marble) {
        var forceDirection = new BABYLON.Vector3(0, 1, 0);
        var forceMagnitude = 25;
        var contactLocalRefPoint = BABYLON.Vector3.Zero();

        //the one line of code version
        BABYLON.Animation.CreateAndStartAnimation(
          "marbleVisAnim",
          marble,
          "visibility",
          30,
          30,
          1,
          0,
          0,
          null,
          () => {
            marble.dispose();
          }
        );
      }

      return scene;
    },
  };
}
