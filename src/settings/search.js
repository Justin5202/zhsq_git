/*
 * @Description: 搜索配置
 * @Author: xia
 * @Date: 2017-12-08 09:44:11
 * @Last Modified by: xia
 * @Last Modified time: 2017-12-13 15:40:42
 */

// const server = 'http://192.168.11.205:8200'
// const server = 'http://zhsq.digitalcq.com/D2CSearchV3'
// const server = 'http://192.168.110.149:8100'
const server = 'http://192.168.11.160:8200'

/* search client */
const client = window.d2c.client || new window.d2c.search({
  host: server
})

window.d2c.client = client

/**
 * @description search filter
 * @param {layers:[]}
 */
export const searchLayers = {}

/**
 * @description search filter
 * @param {layers:[]}
 */
export const searchTypes = null

/**
 * @description search filter
 * @param {layers:[]}
 */

export const searchSize = 100
/**
 * @description search filter
 * @param {layers:[]}
 */
export const searchSource = null

/* search index */

/* 贵阳 */
// export const index = 'gyjzw_2016'

/* 深圳 */
// export const index = 'sz_data'

/* 重庆 */
// export const index = 'sc'
export const index = 'cqdata'

export {client}
