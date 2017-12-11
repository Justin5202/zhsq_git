/*
 * @Description: 被选中图层的样式配置
 * @Author: xia
 * @Date: 2017-12-09 14:16:16
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-11 10:36:37
 */

export default {
  'id': 'selection_layer',
  'type': 'fill-extrusion',
  'minzoom': 10,
    // 'filter': ['==', 'extrude', 'true'],
  'paint': {
    'fill-extrusion-color': 'red',
    'fill-extrusion-height': {type: 'identity', property: 'gd'},
    'fill-extrusion-base': {type: 'identity', property: '1'},
    'fill-extrusion-opacity': 0.8
  }
}
