/*
 * @Description: 全文搜索
 * @Author: xia
 * @Date: 2017-12-11 15:01:35
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-15 12:38:58
 */
import * as search from './search'

/**
 * @description 全文查询配置 默认使用search.js配置
 * @param index 索引
 * @param client es
 * @param ...
 */
const config = {}

/**
 * @description 搜索中间件配置
 */
export function queryConfig (val) {
  return {
    Name_CHN: val || ''
  }
};

export const selectionConfig = {
  id: 'textSearch',
  type: 'circle',
  paint: {
    'circle-color': 'red'
  }
}

export const searchConfig = {
  ...search,
  ...config
}
