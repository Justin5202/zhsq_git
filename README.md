# d2c_vue

> vue template or framework for zxmap developer

## Directory Tree

```
│  .babelrc
│  .editorconfig
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  .postcssrc.js
│  index.html
│  package-lock.json
│  package.json
│  README.md
│
├─build
│
├─config
│
├─src
│  │  App.vue
│  │  main.js
│  │
│  ├─assets
│  │  └─images # 图片
│  │
│  ├─components
│  │  ├─common # 通用
│  │  │      d2cmap.vue
│  │  │
│  │  ├─container # 容器
│  │  │      index.vue
│  │  │      toolbar.vue
│  │  │
│  │  ├─content # 部件
│  │  │      area.js # 面积测量
│  │  │      clickSearch.vue # 点击查询
│  │  │      distance.js # 距离测量
│  │  │      header.vue # 页面header
│  │  │      layerControl.vue # 图层控制
│  │  │      menu.vue # 菜单
│  │  │      rangeSearch.vue # 空间搜索
│  │  │      sourceControl.vue # 数据叠加
│  │  │      styleControl.vue # 样式控制
│  │  │
│  │  └─page # 页面
│  │          map_test.vue # 地图
│  │          testPage.vue # 测试页面
│  │
│  ├─router # 路由
│  │      index.js
│  │
│  ├─settings # 配置
│  │      clickSearch.js # 点击查询
│  │      layerControl.js # 图层控制
│  │      map.js # 地图
│  │      search.js # es搜索
│  │      selection.js # 选中图层
│  │      sourceControl.js # 数据叠加
│  │      styleControl.js # 样式控制
│  │      toolbar.js # 工具栏
│  │
│  ├─store
│  │  │  index.js
│  │  │
│  │  └─modules
│  │          map.js # 地图数据交互
│  │
│  └─util
│          http.js # axios
│          object.js
│          toolbarSetting.js
│          window.js
│
├─static # 第三方库
│  │  .gitkeep
│  │
│  ├─css
│  │      d2c.css
│  │
│  ├─js
│  │      d2c.min.js
│  │      turf.min.js
│  │
│  └─style # 地图style
│          chongqing.js
│          chongqing_local.js
│          guiyang_local.js
│          shenzhen.js
│
└─test
```

## 规范

- 页面编写 /page

- 配置编写 /settings

- 部件 /content

- 第三方库 /static

- 静态资源 /assets

- 通用组件 /common


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http:#vuejs-templates.github.io/webpack/) and [docs for vue-loader](http:#vuejs.github.io/vue-loader).
