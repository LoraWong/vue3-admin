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
      component: () => import('@/views/images/index'),
      meta: {
        title: 'imagesManage',
        icon: 'images'
      }
    }
  ]
}
