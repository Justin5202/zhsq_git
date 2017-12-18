/*
 * @Description: 空间查询配置
 * @Author: xia
 * @Date: 2017-12-12 18:17:51
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-14 20:16:15
 */

import * as search from './search'

/**
 * @description 点击查询配置 默认使用search.js配置
 * @param index 索引
 * @param client es
 * @param ...
 */
const config = {}

export const selectionConfig = {
  id: 'rangeSearch',
  type: 'fill',
  paint: {
    'fill-color': 'red'
  }
}

export const searchConfig = {
  ...search,
  ...config
}
