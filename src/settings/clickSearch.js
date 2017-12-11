/*
 * @Description: 点击查询配置
 * @Author: xia
 * @Date: 2017-12-08 11:34:02
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-11 10:35:20
 */

import selection from './selection'

/**
 * @description 点击查询过滤器
 * @param {Array} features 每次click获取的所有feature
 * @returns 满足条件的feature
 */
export function selectionFilter (features) {
  return features.filter(feature => feature.layer.type === 'fill-extrusion')
};

/**
 * @description 选中时的图层样式等配置
 */
export const selectionConfig = {
  ...selection,
  id: 'clickSelection'
}
