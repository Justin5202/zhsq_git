import axios from 'axios'
import qs from 'qs'
import {commonParams, url} from './config'

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

export function getSearch(params) {
	const data = Object.assign({}, commonParams, params, {method: 'queryLikeNameEntity'})

	return axios.post(url, qs.stringify(data)).then(res => {
		return Promise.resolve(res.data)
	})
}
