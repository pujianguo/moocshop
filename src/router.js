import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/home'),
      children: [
        {
          name: 'home-product',
          path: 'product/:id',
          component: () => import('@/pages/product')
        }
      ]
    },
    {
      name: 'category',
      path: '/category',
      component: () => import('@/pages/category')
    },
    {
      name: 'cart',
      path: '/cart',
      component: () => import('@/pages/cart')
    },
    {
      name: 'personal',
      path: '/personal',
      component: () => import('@/pages/personal')
    },
    {
      name: 'search',
      path: '/search',
      component: () => import('@/pages/search')
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
