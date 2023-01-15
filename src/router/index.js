import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout'
// 导入 私有路由
import ArticleCreateRouter from './modules/ArticleCreate'
import ArticleRouter from './modules/Article'
import PermissionListRouter from './modules/PermissionList'
import RoleListRouter from './modules/RoleList'
import UserManageRouter from './modules/UserManage'
import store from '@/store'

// 私有路由表（有权限
export const privateRoutes = [
  RoleListRouter,
  UserManageRouter,
  PermissionListRouter,
  ArticleCreateRouter,
  ArticleRouter
]

// 公开路由表（不限权
export const publicRoutes = [
  {
    // 根路由
    path: '/',
    component: layout,
    redirect: '/chart',
    children: [
      {
        path: '/chart',
        name: 'chart',
        component: () => import('@/views/chart'),
        meta: {
          title: 'chart',
          icon: 'chart'
        }
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      // 401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

// 任意路由
// 不匹配路由进入 404
// 注意！该配置必须在 所有路由指定之后
export const anyRoutes = [
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

// 手动初始化路由
export function resetRouter() {
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    // 删除动态添加的路由
    const menus = store.getters.userInfo.permission.menus
    menus.forEach((item) => {
      router.removeRoute(item)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
