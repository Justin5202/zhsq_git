/*
 * @Description: 工具栏配置
 * @Author: xia
 * @Date: 2017-12-04 00:05:41
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-12 16:14:04
 */
import { closeRouterView, bindId, transformToRoute } from '@/util/toolbarSetting'

/* parent reoute */
const PAGE_ROUTE = '/map_test'

/* 地图放大菜单 */
const zoomIn = {
  title: '放大',
  icon: require('../assets/images/zoomin.png'),
  route: PAGE_ROUTE + '/zoomIn',
  action (map) {
    return map.zoomIn()
  }
}

/* 地图缩小菜单 */
const zoomOut = {
  title: '缩小',
  icon: require('../assets/images/zoomout.png'),
  route: PAGE_ROUTE + '/zoomOut',
  action (map) {
    map.zoomOut()
  }
}

/* 指北菜单 */
const resetNorth = {
  title: '指北',
  icon: require('../assets/images/refertonorth.png'),
  route: PAGE_ROUTE + '/resetNorth',
  action (map) {
    map.resetNorth()
  }
}

/* 初始地图范围菜单 */
const resetPosition = {
  title: '初始地图范围',
  icon: require('../assets/images/all.png'),
  route: PAGE_ROUTE + '/resetPosition',
  action (map) {
    map.jumpTo({
      center: map.option.center,
      zoom: map.option.zoom,
      pitch: map.option.pitch || 0,
      bearing: map.option.bearing || 0
    })
  }
}

/* 距离测量 */
const distanceMeasure = {
  title: '距离测量',
  icon: require('../assets/images/measure.png'),
  route: PAGE_ROUTE + '/distance',
  action: closeRouterView,
  component: r => require(['@/components/content/distance'], r)
}

/* 面积测量 */
const areaMeasure = {
  title: '面积测量',
  icon: require('../assets/images/measure_polygon.png'),
  route: PAGE_ROUTE + '/area',
  action: closeRouterView,
  component: r => require(['@/components/content/area'], r)
}

/* 图层控制菜单 */
const layerControl = {
  title: '图层控制',
  icon: require('../assets/images/layercontrol.png'),
  route: PAGE_ROUTE + '/layerControl',
  action: closeRouterView,
  component: r => require(['@/components/content/layerControl'], r)
}

/* 点击查询菜单 */
const clickSearch = {
  title: '点击查询',
  icon: require('../assets/images/pointselection.png'),
  route: PAGE_ROUTE + '/clickSearch',
  action: closeRouterView,
  component: r => require(['@/components/content/clickSearch'], r)
}

/* 空间查询菜单 */
const rangeSearch = {
  title: '空间查询',
  icon: require('../assets/images/spaceselection.png'),
  route: PAGE_ROUTE + '/rangeSearch',
  action: closeRouterView,
  component: r => require(['@/components/content/rangeSearch'], r)

}
/* 全文查询菜单 */
const textSearch = {
  title: '全文查询',
  icon: require('../assets/images/text.png'),
  route: PAGE_ROUTE + '/textSearch',
  action: closeRouterView,
  component: r => require(['@/components/content/textSearch'], r)
}

/* 图层样式菜单 */
const layerStyle = {
  title: '图层样式',
  icon: require('../assets/images/stylecust.png'),
  route: PAGE_ROUTE + '/styleControl',
  action: closeRouterView,
  component: r => require(['@/components/content/styleControl'], r)
}

/* 数据叠加 */
const sourceControl = {
  title: '数据叠加',
  icon: require('../assets/images/sourcecontrol2.png'),
  route: PAGE_ROUTE + '/sourceControl',
  action: closeRouterView

}

// 当前激活的菜单项
const settings = [
  zoomIn,
  zoomOut,
  resetPosition,
  resetNorth,
  distanceMeasure,
  areaMeasure,
  clickSearch,
  rangeSearch,
  textSearch,
  layerControl,
  layerStyle
]

export const route = transformToRoute(settings)

export default bindId(settings)
