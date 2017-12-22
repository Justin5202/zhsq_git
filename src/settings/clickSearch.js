/*
 * @Description: 点击查询配置
 * @Author: xia
 * @Date: 2017-12-08 11:34:02
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-22 16:55:44
 */

import * as search from './search'

/**
 * @description 点击查询配置 默认使用search.js配置
 * @param index 索引
 * @param client es
 * @param ...
 */
const config = {
  query (feature) {
    return {
      mapguid: feature[0].properties.mapguid
    }
  }
}
/**
 * @description 点击查询过滤条件
 * @param {Array} features 每次click获取的所有feature
 * @returns 满足条件的feature
 */
export function queryFilter (features) {
  return features.filter(feature => feature.properties && feature.properties.mapguid)
}

/**
 * @description 选中时的图层样式等配置
 */
export const selectionConfig = {
  id: 'clickSearch',
  type: 'fill',
  paint: {
    'fill-color': 'red'
  }
}

export const searchConfig = {
  ...search,
  ...config
}
