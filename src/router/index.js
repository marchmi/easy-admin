import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  }, 
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '系统首页'
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
      },
      {
        path: '/tableDemo',
        name: 'tableDemo',
        meta: {
          title: '表格示例'
        },
        component: () => import(/* webpackChunkName: "tableDemo" */ '../views/demo/tableDemo')
      },
      {
        path: '/filterDemo',
        name: 'filterDemo',
        meta: {
          title: '筛选条件示例'
        },
        component: () => import(/* webpackChunkName: "filterDemo" */ '../views/demo/filterDemo')
      },
      {
        path: '/componentDemo',
        name: 'componentDemo',
        meta: {
          title: '组件示例'
        },
        component: () => import(/* webpackChunkName: "componentDemo" */ '../views/demo/componentDemo')
      },
      {
        path: '/404',
        name: '404',
        meta: {
          title: '找不到页面'
        },
        component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
      },
      {
        path: '/403',
        name: '403',
        meta: {
          title: '没有权限'
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue')
      }
    ]
  }, 
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-easy-admin`
  const role = localStorage.getItem('ms_username')
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin'
      ? next()
      : next('/403')
  } else {
    next()
  }
})

export default router
