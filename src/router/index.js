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
const carousel = r => require(['@/components/container/carousel/carousel'], r)
const web = r => require(['@/components/container/web/web'], r)


export default new Router({
  routes: [
    {
      path: '/',
      component: container,
      beforeEnter(to, from, next) {
        if (from.path === '/login') {
          window.location.reload()
        }
        next()
      },
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
      path: '/carousel/:id',
      name: 'carousel',
      component: carousel
    },{
      path: '/720picture/:code/:id',
      name: 'web',
      component: web
    }
  ]
})
