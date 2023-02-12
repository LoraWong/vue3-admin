// 路由守卫
import router from '@/router'
import store from '@/store'

// 白名单（用户没有任何权限时，可以进入的页面
const whiteList = ['/login']
// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  // 用户已登录，不允许进入 login
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断 用户信息 是否存在，如果不存在，则获取用户信息
      if (!store.getters.hasUserInfo) {
        // 获取用户信息
        const { permission } = await store.dispatch('user/getUserInfo')
        // tag:添加动态路由：处理用户权限，筛选出 动态添加的路由（为什么要用await？？
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 循环添加动态路由
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        // 添加玩动态路由之后，需要进行主动跳转
        // 如果 addRoute 并未完成，路由守卫会一层一层的执行执行，直到 addRoute 完成，找到对应的路由
        return next({ ...to, replace: true }) // next(to.path)
      }
      next()
    }
  } else {
    // 用户未登录，只允许进入 login
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
