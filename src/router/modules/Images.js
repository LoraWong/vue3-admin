import layout from '@/layout'

export default {
  path: '/',
  component: layout,
  // redirect: '/images',
  name: 'articleCreate',
  children: [
    {
      path: '/images',
      // name: 'articleCreate',
      component: () =>
        import(
          /* webpackChunkName: "permission-list" */ '@/views/images/index'
        ),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}
