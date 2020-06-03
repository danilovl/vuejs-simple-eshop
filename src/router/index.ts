import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '',
    meta: {
      display: true,
      title: 'Main Menu'
    },
    component: () => import('@/layouts/Main.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        meta: {
          display: true,
          title: 'Home Page - Example App'
        },
        component: () => import('@/pages/Home.vue')
      },
      {
        path: 'products',
        component: () => import('@/layouts/Default.vue'),
        children: [
          {
            path: '/',
            name: 'product_list',
            meta: {
              display: true,
              title: 'Product list'
            },
            component: () => import('@/pages/Home.vue')
          },
          {
            path: 'detail/:id(\\d+)',
            name: 'product_detail',
            meta: {
              display: true,
              title: 'Product detail'
            },
            component: () => import('@/pages/product/ProductDetail.vue')
          }
        ]
      },
      {
        path: '/cart',
        name: 'cart',
        meta: {
          display: true,
          title: 'Shopping cart '
        },
        component: () => import('@/pages/cart/ShoppingCart.vue')
      },
      {
        path: '/favorite',
        name: 'favorite',
        meta: {
          display: true,
          title: 'Favorite cart '
        },
        component: () => import('@/pages/favorite/FavoriteCart.vue')
      },
      {
        path: '/order',
        name: 'order',
        meta: {
          display: true,
          title: 'Checkout cart '
        },
        component: () => import('@/pages/order/Order.vue')
      },
      {
        path: '/order-thanks',
        name: 'order_thanks',
        meta: {
          display: true,
          title: 'Order thanks'
        },
        component: () => import('@/pages/order/OrderThanks.vue')
      },
      {
        path: '/login',
        component: () => import('@/pages/admin/Authentication.vue')
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('@/pages/admin/Admin.vue'),
        beforeEnter (to, from, next) {
          const loggedIn = localStorage.getItem('user-token')
          if (loggedIn) {
            next()
          } else {
            next('/login')
          }
        },
        children: [
          {
            path: 'products/:op(create|edit)/:id(\\d+)?',
            name: 'admin_product',
            component: () => import('@/pages/admin/ProductEditor.vue')
          },
          {
            path: 'products',
            name: 'admin_product_list',
            component: () => import('@/pages/admin/ProductAdmin.vue')
          },
          {
            path: 'orders',
            name: 'admin_order_list',
            component: () => import('@/pages/admin/OrderAdmin.vue')
          },
          {
            path: '',
            redirect: '/admin/products'
          }
        ]
      }
    ]
  },
  {
    path: '',
    meta: {
      display: false
    },
    component: () => import('@/layouts/Main.vue'),
    children: [
      {
        path: '/error',
        name: 'error',
        meta: {
          display: false,
          title: 'Error Page'
        },
        component: () => import('@/pages/Error404.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/error'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title
  }

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => {
    if (el.parentNode === null) {
      return null
    }

    return el.parentNode.removeChild(el)
  })

  if (!nearestWithMeta) {
    return next()
  }

  nearestWithMeta.meta.metaTags.map(function (tagDef: any) {
    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    tag.setAttribute('data-vue-router-controlled', '')

    return tag
  }).forEach(function (tag: any) {
    return document.head.appendChild(tag)
  })

  next()
})

export default router
