/*
 * @Description: 工具栏配置
 * @Author: xia
 * @Date: 2017-12-04 00:05:41
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-07 20:35:44
 */

/**
 * @description action handler
 * @param {Function} action
 */
const actionHandler = (action) => {
  return (map, toolbar, currentRoute, lastRoute) => {
    const result = action(map, toolbar, currentRoute, lastRoute)
  }
}
/**
 * @description 关闭当前控制弹出框
 * @param {any} toolbar 工具栏组件
 * @param {any} currentRoute 当前路由
 * @param {any} lastRoute 上一次路由
 */
const closeRouterView = function (map, toolbar, currentRoute, lastRoute) {
  if (currentRoute === lastRoute) {
    toolbar.$router.push({
      path: '/'
    })
    return true
  }
  return false
}

const PAGE_ROUTE = '/map_test'
// 地图放大菜单
const zoomIn = {
  title: '放大',
  icon: require('../assets/images/zoomin.png'),
  route: PAGE_ROUTE + '/zoomIn',
  action (map) {
    return map.zoomIn()
  }
}

// 地图缩小菜单
const zoomOut = {
  title: '缩小',
  icon: require('../assets/images/zoomout.png'),
  route: PAGE_ROUTE + '/zoomOut',
  action (map) {
    map.zoomOut()
  }
}

// 指北菜单
const resetNorth = {
  title: '指北',
  icon: require('../assets/images/refertonorth.png'),
  route: PAGE_ROUTE + '/resetNorth',
  action (map) {
    map.resetNorth()
  }
}

// 初始地图范围菜单
const resetPosition = {
  title: '初始地图范围',
  icon: require('../assets/images/all.png'),
  route: PAGE_ROUTE + '/resetNorth',
  action (map) {
    map.flyTo({center: map.option.center, zoom: map.option.zoom})
  }
}

const distanceMeasure = {
  title: '距离测量',
  icon: require('../assets/images/measure.png'),
  route: PAGE_ROUTE + '/distance',
  action: closeRouterView,
  component: r => require(['@/components/content/distance'], r)
}

const areaMeasure = {
  title: '面积测量',
  icon: require('../assets/images/measure_polygon.png'),
  route: PAGE_ROUTE + '/area',
  action: closeRouterView,
  component: r => require(['@/components/content/area'], r)
}

// 图层控制菜单
const layerControl = {
  title: '图层控制',
  icon: require('../assets/images/layercontrol.png'),
  route: PAGE_ROUTE + '/layerControl',
  action: closeRouterView,
  component: r => require(['@/components/content/layerControl'], r)
}

// 点击查询菜单
const singleSearch = {
  title: '点击查询',
  icon: require('../assets/images/pointselection.png'),
  route: PAGE_ROUTE + '/singleSearch',
  action (map, toolbar, currentRoute, lastRoute) {
    const callback = (e) => {
      var result = map.queryRenderedFeatures(e.point)
      console.log('====================================')
      console.log(result)
      console.log('====================================')
    }
    if (closeRouterView(toolbar, currentRoute, lastRoute)) {
      map.off('click', callback)
    }
    map.on('click', callback)
    closeRouterView(toolbar, currentRoute, lastRoute)
  }
}

// 图层样式菜单
const layerStyle = {
  title: '图层样式',
  icon: require('../assets/images/stylecust.png'),
  route: PAGE_ROUTE + '/styleControl',
  action (map, toolbar, currentRoute, lastRoute) {
    closeRouterView(toolbar, currentRoute, lastRoute)
  },
  component: r => require(['@/components/content/layerControl'], r)
}

// 数据叠加
const sourceControl = {
  title: '数据叠加',
  icon: require('../assets/images/sourcecontrol2.png'),
  route: PAGE_ROUTE + '/sourceControl',
  action: closeRouterView

}

// action binder
const bindAction = (object) => {
  for (const iterator in object) {
    if (object[iterator].action) {
      const action = object[iterator].action
      object[iterator].action = actionHandler(action)
    }
  }
  return object
}

// 为菜单绑定唯一id值
const bindId = function (object) {
  let count = 1
  for (const iterator in object) {
    object[iterator].id = count++
  }
  return object
}

// 转换为路由
const transformToRoute = function (arr) {
  const obj = []
  for (const iterator in arr) {
    const item = {
      name: arr[iterator].title,
      path: arr[iterator].route,
      meta: {keepAlive: true}
    }
    if (arr[iterator].component) {
      item.component = arr[iterator].component
    }
    obj.push(item)
  }
  return obj
}

// 当前激活的菜单项
const settings = [
  zoomIn,
  zoomOut,
  resetPosition,
  resetNorth,
  distanceMeasure,
  areaMeasure,
  singleSearch,
  layerControl,
  // sourceControl,
  layerStyle
]

export const route = transformToRoute(settings)

export default bindAction(bindId(settings))
