/*
 * @Description: 根据默认配置生成map option
 * @Author: xia
 * @Date: 2017-11-30 09:34:45
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-11 10:16:31
 */
import chongqingLocal from '../../static/style/chongqing_local'
import chongqing from '../../static/style/chongqing'
import guiyang_local from '../../static/style/guiyang_local'
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
  style: guiyang_local,
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

/* 默认底图 */
export default (option) => ({
  ...sz1,
  ...option
})
