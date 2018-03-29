import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 定义组件
const container = r => require(['@/components/container/index'], r)
const mapTest = r => require(['@/components/page/map_test'], r)

const login = r => require(['@/components/users/login/login'], r)
const register = r => require(['@/components/users/register/register'], r)
const carousel = r => require(['@/components/container/carousel/carousel'], r)
const web = r => require(['@/components/container/web/web'], r)


export default new Router({
  routes: [
    {
      path: '/',
      component: container,
      children: [
        {
          path: '',
          name: 'index',
          redirect: 'map',
        }, {
          path: '/map',
          name: 'map',
          meta: {keepAlive: true},
          component: mapTest
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/register',
      name: 'register',
      component: register,
    }, {
      path: '/carousel/:id',
      name: 'carousel',
      component: carousel
    },{
      path: '/web/:code/:id',
      name: 'web',
      component: web
    }
  ]
})
