/*
 * @Description: 点击查询配置
 * @Author: xia
 * @Date: 2017-12-08 11:34:02
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-15 14:59:39
 */

import selection from './selection'
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
export function selectionFilter (features) {
  // return features.filter(feature => feature.layer.type === 'fill-extrusion')
  console.log(features)
  return features
};

/**
 * @description 选中时的图层样式等配置
 */
export const selectionConfig = {
  ...selection,
  id: 'clickSelection',
  paint: {
    'fill-extrusion-color': 'red',
    'fill-extrusion-height': {
      'type': 'identity',
      'property': 'height'
    },
    'fill-extrusion-base': {
      'type': 'identity',
      'property': 'min_height'
    }
  }
}

export const searchConfig = {
  ...search,
  ...config
}
