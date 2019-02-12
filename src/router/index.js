import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import TradePage from '@/pages/TradePage'
import TablePage from '@/pages/TablePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/trade',
      name: 'trade',
      component: TradePage
    },
    {
      path: '/table',
      name: 'table',
      component: TablePage
    }
  ]
})
