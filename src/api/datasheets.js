import axios from 'axios'
import qs from 'qs'
import {commonParams, url} from './config'

// 目录列表
export function getDataSheets() {
	const data = Object.assign({}, commonParams, {
		method: 'getDataHot',
		areacode: 500000
	})

	let params = ''

	for(let key in data) {
		params += `${key}=${data[key]}&`
	}
	params = params.substring(0, params.length - 1)

	return axios.get(`${url}?${params}`)
  	.then(function (res) {
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

//数据搜索接口
export function getSearch(params) {
	const data = Object.assign({}, commonParams, params, {method: 'queryLikeNameEntity'})

	return axios.post(url, qs.stringify(data)).then(res => {
		return Promise.resolve(res.data)
	})
}

// 分类详细信息
export function getDetailInfo(params) {
	const data = Object.assign({}, commonParams, params, {method: 'getDataInfoAllById'})

	return axios.post(url, qs.stringify(data)).then(res => {
		return Promise.resolve(res.data)
	})
}