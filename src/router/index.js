import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 定义组件
const container = r => require(['@/components/container/index'], r)
const testPage = r => require(['@/components/page/testPage'], r)

export default new Router({
  routes: [
    {
      path: '/',
      component: container,
      children: [
        {
          path: '',
          name: 'index',
          redirect: 'home'
        }, {
          path: '/test_page',
          name: 'testPage',
          component: testPage
        }, {
          path: '/home',
          name: 'home'
        }
      ]
    }
  ]
})
