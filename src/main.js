// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // elementUI css
import http from './util/http'
import store from './store/index'
import * as TYPES from './store/type'
import 'normalize.css'

Vue.config.productionTip = false

Vue.use(elementUI)

Vue.prototype.http = http
Vue.prototype.$types = TYPES
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
