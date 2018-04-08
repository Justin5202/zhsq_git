import axios from '@/util/http'
import qs from 'qs'
import { commonParams, url } from './config'
import MD5 from 'crypto-js/md5'

axios.defaults.withCredentials = true

export function login(username, password, code) { // 登录

  let data = Object.assign({}, commonParams, {
    method: 'login',
    name: username,
    password: MD5(password).toString()
  })
  return axios.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data)
  })
}

export function feedback(text) { // 意见反馈
  let data = Object.assign({}, commonParams, {
    method: 'guestbook',
    suggest: text,
    type: '0'
  })
  return axios.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data)
  })
}

export function fetchData(time) { // 获取系统消息
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

export function getSuggestList(start) { // 获取反馈历史
  let data = Object.assign({}, commonParams, {
    method: 'getSuggestList',
    start: start,
    rows: 10
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

export function register(option) { // 注册
  let data = Object.assign({}, commonParams, {
    method: 'register',
    arLoginname: option.phoneNum,
    arTruename: option.truename,
    arPassword: option.password,
    arMobile: option.phoneNum,
    arBranch: option.branchId,
    arAreacode: option.areacode,
    checkCode: option.checkNum
  })
  return axios.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data)
  })

}

export function getRegisterInfo() { // 获取部门、区县列表
  let data = Object.assign({}, commonParams, {
    method: 'getRegisterInfo'
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

export function getCheckCode(phone) { // 获取验证码
  let data = Object.assign({}, commonParams, {
    method: 'getCheckCode',
    phone: phone
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

export function logout() {
  let data = Object.assign({}, commonParams, {
    method: 'outLogin'
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

export function getContact() { // 获取公司信息
  return axios.get(`${url}?method=getCompanyInfo`).then(res => {
    return Promise.resolve(res.data)
  })
}