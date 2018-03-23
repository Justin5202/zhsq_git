import axios from 'axios'
import router from '../router'
import {Loading, Message} from 'element-ui'
import Vue from 'vue'
Vue.use(Message)

// 拦截请求
axios.interceptors.request.use(function(config) {
  let loading = Loading.service({
    fullscreen: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, .8)'
  })
  return config
}, function(err) {
  let loading = Loading.service({})
  loading.close()
  return Promise.reject(err)
})

// 拦截响应
axios.interceptors.response.use(function(response) {
  let loading = Loading.service({})
  loading.close()
  if (response.data.code == '-3') {
    router.replace('/login')
    this.$message({
      message: '您的账号已在别处登录！',
      type: 'warning'
    })
  }
  if (response.data.code == '-2') {
    router.replace('/login')
  }
  return response
}, function(err) {
  return Promise.reject(err)
})

export default axios
