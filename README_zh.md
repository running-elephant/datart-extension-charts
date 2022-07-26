# datart-extension-charts

> 这里是 Datart 插件图表仓库，当前的图表是**实验阶段**，请勿用于生产环境。


🖖 欢迎提 Pull Rquest 以及 Issue，请不要担心问题过于直白或者初级，任何反馈均是贡献 👏.

## 如果你是一位使用者

1. 从`dist`文件夹中拷贝出你所需要的插件图表，如`datart-amap.iife.js`这个给予高德地图的插件图表
2. 将拷贝出的插件图表粘贴到你的datart服务端的`custom-chart-plugins`目录下
3. 登陆 datart 系统，然后选择你所导入的插件图表

## 如果你是一位开发者

> 当前的仓库提供了基于命令行的工具，提升开发效率。

### 1. 制作 IIFE 类型的插件图表 （推荐）

> 立即调用函数表达式（英文：immediately-invoked function expression，缩写：IIFE）[1]，是一种利用JavaScript函数生成新作用域的编程方法。

1. 创建一个以`datart-`开头的文件夹，如`datart-hello-world`文件夹
2. 创建一个 **Javascript** or **Typescript** 文件
3. 导出一个包含 datart 生命周期的函数对象，生命周期[^2]例如`onMount`、`onUpdated`等.
4. 运行`npm run build` 命令，并且查看`dist`文件夹新生成的`datart-hello-world.iife.js`文件

__注意：插件图表文件夹的名称必须以`datart-`开头，这样当运行build命令时可自动打包文件__

### 2. 制作 React 类型的插件图表

**请查看`plugins`文件夹📁下面的图表示例**

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


## 更多文章链接
- [x] Plugin Chart Helper API document: https://running-elephant.github.io/datart-docs/api/
- [x] How to Make a Plugin Chart: https://running-elephant.github.io/datart-docs/docs/chart_plugin.html
- [x] How to Make Chart Config: https://juejin.cn/post/7040683275446124574
- [x] Vue 跑马灯插件示例: https://mp.weixin.qq.com/s/a4DVf-5LHVQAknmKKE6DJA
- [x] JQuery 图表插件：https://mp.weixin.qq.com/s/9hBNSla86Fzouy0WdXqSQQ
- [x] 手把手教你开发出优秀的图表插件作品： https://mp.weixin.qq.com/s/nYMAaiT97NPkm71FpW8LSw 


[^1]: https://zh.wikipedia.org/wiki/%E7%AB%8B%E5%8D%B3%E8%B0%83%E7%94%A8%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F

[^2]: https://running-elephant.github.io/datart-docs/docs/chart_plugin.html