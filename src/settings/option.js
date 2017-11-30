/*
 * @Description: 根据默认配置生成map option
 * @Author: xia
 * @Date: 2017-11-30 09:34:45
 * @Last Modified by: xia
 * @Last Modified time: 2017-11-30 09:38:28
 */
import style from '../../static/style/chongqing'
export default (option) => ({
  container: 'map',
  style: style,
  center: [106.647217, 29.566210],
  zoom: 7,
  maxZoom: 17,
  ...option
})