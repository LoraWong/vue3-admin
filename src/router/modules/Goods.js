import layout from '@/layout'

export default {
  path: '/goods',
  component: layout,
  redirect: '/goods/manage',
  name: 'articleCreate',
  meta: { title: 'article', icon: 'article' },
  children: [
    {
      path: 'manage',
      component: () => import('@/views/goods/index'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    },
    {
      path: 'category',
      component: () => import('@/views/category/index'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    },
    {
      path: 'skus',
      component: () => import('@/views/skus/index'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    },
    {
      path: 'coupon',
      component: () => import('@/views/coupon/index'),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}
