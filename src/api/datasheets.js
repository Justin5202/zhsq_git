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

export function getSearch(s, n, code) {
	const start = s || '重庆市'
	const name = n
	const areacode = code

	const data = Object.assign({}, commonParams, {
		method: 'queryLikeNameEntity',
		name: n,
		start: start,
		rows: 10,
		areacode: code,
		areaname: start,
		type: '',
		point: ''
	})

	return axios.post(url, qs.stringify(data)).then(res => {
		return Promise.resolve(res.data)
	})
}
