import axios from '@/util/http'
import qs from 'qs'
import { commonParams, url } from './config'
import mapHelper from '@/util/mapHelper'
import { Promise } from 'core-js';

axios.defaults.withCredentials = true

// 目录列表
export function getDataSheets() {
    const data = Object.assign({}, commonParams, {
        method: 'getDataHot',
        areacode: 500000
    })

    let params = ''

    for (let key in data) {
        params += `${key}=${data[key]}&`
    }
    params = params.substring(0, params.length - 1)

    return axios.get(`${url}?${params}`)
        .then(function(res) {
            return Promise.resolve(res.data)
        })
}

// 选择区域
export function getSelect(id) {
    const parentId = id || -1

    const data = Object.assign({}, commonParams, {
        method: 'queryXZQHInfoByParentId',
        parentId: parentId
    })

    return axios.post(url, qs.stringify(data)).then(res => {
        return Promise.resolve(res.data)
    })
}

// 区县区域详细信息
export function getNextAreaDetailInfo(areacode) {
    const data = Object.assign({}, commonParams, { areacode: areacode }, { method: 'queryShapeByAreaCode' })

    return axios.post(url, qs.stringify(data)).then(res => {
        return Promise.resolve(res.data)
    })
}

//数据搜索接口
export function getSearch(params) {
    const data = Object.assign({}, commonParams, params, { method: 'queryLikeNameEntity' })

    return axios.post(url, qs.stringify(data)).then(res => {
        return Promise.resolve(res.data)
    })
}

// 分类详细信息
export function getDetailInfo(params) {
    const data = Object.assign({}, commonParams, params, { method: 'getDataInfoAllById' })

    return axios.post(url, qs.stringify(data)).then(res => {
        return Promise.resolve(res.data)
    })
}

// 根据code和dataId获取报表数据详情
export function getMsMacroData(areaCode, id) {
    const data = Object.assign({}, commonParams, {
        method: 'getMsMacroDataByAreaOrDataId',
        areacode: areaCode,
        dataId: id
    })

    return axios.post(url, qs.stringify(data)).then(res => {
        return Promise.resolve(res.data)
    })
}
// 获取统计模块的资源列表
export function getSelectTargetType() {
    const data = Object.assign({}, commonParams, {
        method: 'selectTargetType',
        dataId: ''
    })
    return axios.post(url, qs.stringify(data)).then(res => {
        return Promise.resolve(res.data)
    })
}

//获取点击地图点的详细信息
export function getQueryOnlineByUuid(id) {
    const data = Object.assign({}, commonParams, {
        method: 'queryOnlineByUuid',
        uuid: id
    })

    return axios.post(url, qs.stringify(data)).then(res => {
        return Promise.resolve(res.data)
    })
}
export function getThematicMap(source) {
    const data = Object.assign({}, commonParams, {
        method: 'getThematicMap',
        sourcelayer: source
    })

    return axios.post(url, qs.stringify(data)).then(res => {
        return Promise.resolve(res.data)
    })
}

// 获取当前地图范围内是否存在数据
export function getQueryElementByPoint(params) {
    const data = Object.assign({}, {
        method: 'queryElementByPoint',
        sourcelayer: params.sourceLayer,
        filter: JSON.stringify(params.filter),
        top: `${mapHelper.getBounds()._sw.lng},${mapHelper.getBounds()._ne.lat}`,
        bottom: `${mapHelper.getBounds()._ne.lng},${mapHelper.getBounds()._sw.lat}`,
        point: `${mapHelper.getCenter().lng},${mapHelper.getCenter().lat}`,
        os: 'pc'
    })

    return axios.post(url, qs.stringify(data, { arrayFormat: 'brackets' })).then(res => {
        return Promise.resolve(res.data)
    })
}
// 根据绘制区域和id获取统计详情
export function getStatisticsDetails(shape, dataId) {
    const data = Object.assign({}, commonParams, {
        method: 'getStatisticalInfo',
        dataId: dataId,
        shape: shape
    })
    return axios.post(url, qs.stringify(data)).then(res => {
        return Promise.resolve(res.data)
    })
}

// 旅游专题
export function getTourismTopic() {
  const data = Object.assign({}, {
      method: 'getScenicInfo'
  })
  return axios.post(url, qs.stringify(data)).then(res => {
      return Promise.resolve(res.data)
  })
}

// 扶贫专题
export function getProvertyTopic() {
  const data = Object.assign({}, {
      method: 'getPovertyAlleviation',
      start: 0,
      rows: 10
  })
  return axios.post(url, qs.stringify(data)).then(res => {
      return Promise.resolve(res.data)
  })
}

// 获得扶贫下一级列表
export function getNextProvertyData(areacode) {
  const data = Object.assign({}, {
      method: 'getPovertyAlleviation',
      areacode: areacode,
      start: 0,
      rows: 10
  })
  return axios.post(url, qs.stringify(data)).then(res => {
      return Promise.resolve(res.data)
  })
}

export function getProvertyInfo() {
  const data = Object.assign({}, {
      method: 'getPovertyAlleviationInfo',
      areacode: 0,
      dataId: 10
  })
  return axios.post(url, qs.stringify(data)).then(res => {
      return Promise.resolve(res.data)
  })
}
// 根据行政区化code值，获取行政区化的详情
export function getAreaDetailByAreaCode(areacode) {
    const data = Object.assign({}, commonParams, {
        method: 'getAreaDetail',
        areacode: areacode
    })
    return axios.post(url, qs.stringify(data)).then(res => {
        return Promise.resolve(res.data)
    })
}
// 获取社会经济单元详情
export function getEconomicUnitHtmlByAreaCode(areacode) {
    const data = Object.assign({}, commonParams, {
        method: 'getEconomicUnitHtml',
        areacode: areacode
    })
    return axios.post(url, qs.stringify(data)).then(res => {
        return Promise.resolve(res.data)
    })

}
// 获取文件数据
export function getDataFileInfo(areacode, dataId) {
    const data = Object.assign({}, commonParams, {
        method: 'getDataFileInfo',
        areacode: areacode,
        dataId: dataId
    })
    return axios.post(url, qs.stringify(data)).then(res => {
        return Promise.resolve(res.data)
    })
}
