import Vue from 'vue'
import Router from 'vue-router'
import {route as toolbar} from '@/settings/toolbar'

Vue.use(Router)

// 定义组件
const container = r => require(['@/components/container/index'], r)
const testPage = r => require(['@/components/page/testPage'], r)
const mapTest = r => require(['@/components/page/map_test'], r)

const login = r => require(['@/components/users/login/login'], r)
const register = r => require(['@/components/users/register/register'], r)
const userCenter = r => require(['@/components/users/userCenter/userCenter'], r)
const searchAround = r => require(['@/components/users/searchAround/searchAround'], r)


export default new Router({
  routes: [
    {
      path: '/',
      component: container,
      children: [
        {
          path: '',
          name: 'index',
          redirect: 'zhsq_d2c',
        }, {
          path: '/test_page',
          name: 'testPage',
          component: testPage
        }, {
          path: '/zhsq_d2c',
          name: 'zhsq_d2c',
          meta: {keepAlive: true},
          component: mapTest,
          children: [
            ...toolbar
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    }, {
      path: '/register',
      name: 'register',
      component: register,
    }, {
      path:'/searchAround',
      name: 'searchAround',
      component: searchAround
    }
  ]
})
