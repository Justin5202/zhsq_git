import axios from 'axios'
import qs from 'qs'
import { commonParams, url } from './config'
import MD5 from 'crypto-js/md5'

export function login(username, password, code) {

  let data = Object.assign({}, commonParams, {
    mathod: 'login',
    name: username,
    password: MD5(password).toString(),
    code: code || 'first',
    os: 'ios_iphone'
  })
  console.log(data)
  return axios.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data)
  })
}

export function feedback(text) {
  let data = Object.assign({}, commonParams, {
    method: 'guestbook',
    suggest: text,
    type: '0'
  })
  return axios.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data)
  })
}

export function fetchData(time) {
  let data = Object.assign({}, commonParams, {
    method: 'getPushData',
    uptime: time
  })
  let params = ''
  for (let key in data) {
    params += `${key}=${data[key]}&`
  }
  params = params.substring(0, params.length - 1)
  return axios.get(`${url}?${params}`).then(res => {
      return Promise.resolve(res.data)
  })
}