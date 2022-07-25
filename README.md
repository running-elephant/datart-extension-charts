# datart-extension-charts
An extension repository to host datart plugin charts which is in experiment state not officially.

## 如何使用
直接将`dist`文件夹下的文件，拷贝到服务端的`custom-chart-plugins`文件夹中并重新登录系统即可，不需要重启服务。

例如：拷贝`dist`文件夹下的`datart-uml.iife.js`文件至`custom-chart-plugins`文件夹中，重新的登录后，就可以创建一个`UML`流程图等图表。

## 如何开发

### 1. use iife type of chart plugin
Please run `yarn build` or `npm run build`, and get copy file from `dist` folder.

### 2. use as React Component
Please check the file in folder `plugins` 

 __NOTE: Plugin folder should be prefix as `datart-*` which could be automatic load when run `yarn build`__
