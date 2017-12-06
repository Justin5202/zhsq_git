import Vue from 'vue'
import Router from 'vue-router'
import {route as toolbar} from '@/settings/toolbar'

Vue.use(Router)

// 定义组件
const container = r => require(['@/components/container/index'], r)
const testPage = r => require(['@/components/page/testPage'], r)
const mapTest = r => require(['@/components/page/map_test'], r)

export default new Router({
  routes: [
    {
      path: '/',
      component: container,
      children: [
        {
          path: '',
          name: 'index',
          redirect: 'map_test'
        }, {
          path: '/test_page',
          name: 'testPage',
          component: testPage
        }, {
          path: '/map_test',
          name: 'mapTest',
          meta: {keepAlive: true},
          component: mapTest,
          children: [
            ...toolbar
          ]
        }
      ]
    }
  ]
})
