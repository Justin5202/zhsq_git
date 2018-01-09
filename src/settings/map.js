/*
 * @Description: 底图配置 1、根据url 2、本地json配置 3、空白底图
 * @Author: xia
 * @Date: 2017-11-30 09:34:45
 * @Last Modified by: xia
 * @Last Modified time: 2018-01-09 10:38:17
 */
import chongqingLocal from '../../static/style/chongqing_local'
import chongqing from '../../static/style/chongqing'
import guiyangLocal from '../../static/style/guiyang_local'
import shenzhen from '../../static/style/shenzhen'

/* 内网重庆底图 */
const cq1 = {
  container: 'map',
  center: [106.994999, 30.17728484178069],
  style: chongqingLocal,
  zoom: 6.5,
  cq1: 18
}

/* 外网重庆底图 */
const cq2 = {
  container: 'map',
  style: chongqing,
  center: [106.647217, 29.566210],
  zoom: 7,
  maxZoom: 17
}

/* 内网贵阳底图 */
const gy1 = {
  container: 'map',
  center: [106.694999, 26.67728484178069],
  style: guiyangLocal,
  zoom: 8,
  maxZoom: 18
}

/* 外网深圳底图 */
const sz1 = {
  container: 'map',
  center: [113.924103, 22.782512000000001],
  style: shenzhen,
  zoom: 11,
  maxZoom: 18
}

/* 空白底图 */
const empty = {
  container: 'map',
  style: {
    version: 8,
    sources: {},
    layers: []
  },
  center: [106.647217, 29.566210],
  zoom: 7,
  maxZoom: 17
}

// 根据url配置底图
const baseMap = 'http://192.168.11.160/oms/stylejson/d68370f70b53106cff50ac68ff1ec49f'

/* 默认底图 */
export default empty
