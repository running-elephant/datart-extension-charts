# datart-extension-charts

> An extension repository to host datart plugin charts which is in **experiment state not officially**🤝.

🖖 Welcome PRs or Issues, please don't be worry about any questions 👏.

## By Consumer

1. Copy `plugins` from `dist` folder, eg. `datart-amap.iife.js` file.
2. Paste to your datart backend server folder of `custom-chart-plugins`
3. Login datart, and select a your custom plugin chart.

## By Developer

> With this project, you can make yourself plugin chart and bundle with CLI.

### 1. Cook plugin chart as IIFE type (Recommended)

> IIFE also called Immediately Invoked Function Expression[^1], a programming language idiom which produces a lexical scope using function scoping.

1. Create a folder prefixed with `datart-`, such as `datart-hello-world`.
2. Create a plugin chart with **Javascript** or **Typescript** file
3. Plugin chart should be export an object with datart lifecycles[^2], such as `onMount`、`onUpdated` and etc.
4. Run `npm run build` and then check `dist` folder with file `datart-hello-world.iife.js`.
 __NOTE: Plugin folder should be prefix as `datart-*` which could be automatic load when run `build`__

### 2. Cook plugin chart as an React Component

**Please take a look plugins folder**

## Sample
<div style="display:flex;flex-direction:column;">
    <div style="flex:1">
        <h3>Antv/G2</h3>
        <img src="plugins/datart-antvg2/experiment-antvg2-chart.png" alt="Antv/G2"/>
    </div>
    <div style="flex:1">
        <h3>BabylonJS</h3>
        <img src="plugins/datart-babylon/babylon-js-demo.png" alt="BabylonJS"/>
    </div>
     <div style="flex:1">
        <h3>ChartJS</h3>
        <img src="plugins/datart-chartjs/experiment-chartjs-sample.png" alt="ChartJS"/>
    </div>
     <div style="flex:1">
        <h3>ThreeJS-BingDunDun</h3>
        <img src="plugins/datart-threejs-bingdundun/bigndundun.png" alt="ThreeJS-BingDunDun"/>
    </div>
     <div style="flex:1">
        <h3>ThreeJS-WebGL</h3>
        <img src="plugins/datart-threejs-webgl/callada.gif" alt="ThreeJS-BingDunDun"/>
    </div>
     <div style="flex:1">
        <h3>ECharts-Time</h3>
        <img src="plugins/datart-time/time-series-chart.png" alt="ECharts-Time"/>
    </div>
     <div style="flex:1">
        <h3>Mermaid-UML</h3>
        <img src="plugins/datart-uml/experiment-uml-chart.png" alt="Mermaid-UML"/>
    </div>
     <div style="flex:1">
        <h3>VueJS</h3>
        <img src="plugins/datart-vuejs/vuejs-chart.png" alt="VueJS"/>
    </div>
     <div style="flex:1">
        <h3>ZRender</h3>
        <img src="plugins/datart-zrender/experiment-zrender-chart.png" alt="ZRender"/>
    </div>
</div>


## More Posts
- [x] Plugin Chart Helper API document: https://running-elephant.github.io/datart-docs/api/
- [x] How to Make a Plugin Chart: https://running-elephant.github.io/datart-docs/docs/chart_plugin.html
- [x] How to Make Chart Config: https://juejin.cn/post/7040683275446124574
- [x] Vue Carousel Plugin Chart:https://mp.weixin.qq.com/s/a4DVf-5LHVQAknmKKE6DJA
- [x] JQuery Plugin Chart：https://mp.weixin.qq.com/s/9hBNSla86Fzouy0WdXqSQQ
- [x] Hand by hand develop a plugin chart： https://mp.weixin.qq.com/s/nYMAaiT97NPkm71FpW8LSw


[^1]: https://en.wikipedia.org/wiki/Immediately_invoked_function_expression

[^2]: https://running-elephant.github.io/datart-docs/docs/chart_plugin.html