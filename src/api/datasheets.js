import axios from 'axios'
import qs from 'qs'
import { commonParams, url } from './config'

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
export function getNextAreaInfo(areacode) {
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
export function getJson(name) {
    return axios.get(`http://zhsq.digitalcq.com/D2CJsonV3${name}`).then(res => {
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
export function getQueryElementByPoint(source, filter, top, bottom, point) {
    const data = Object.assign({}, commonParams, {
        method: 'queryElementByPoint',
        sourcelayer: source,
        filter: filter,
        top: top,
        bottom: bottom,
        point: point
    })

    return axios.post(url, qs.stringify(data)).then(res => {
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