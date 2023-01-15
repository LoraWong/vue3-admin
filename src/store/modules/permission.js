import { publicRoutes, privateRoutes, anyRoutes } from '@/router'

const state = {
  // 初始化路由表
  routes: publicRoutes
}
const mutations = {
  // 添加路由
  setRoutes(state, newRoutes) {
    // 合并路由
    state.routes = [...publicRoutes, ...newRoutes]
  }
}
const actions = {
  /**
   * 根据 权限数据 筛选动态路由
   * @param {*} menus 页面权限数据
   * @return {*} 筛选之后，获取到的动态路由，通过 addRoute添加到路由中
   */
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach((key) => {
      // 权限名 与 路由的 name 匹配
      // find() 方法返回数组中满足提供的测试函数的第一个元素的值
      // filter() 方法创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素
      const route = privateRoutes.filter((item) => item.name === key) // 一个数组
      // 追加到数组
      routes.push(...route)
    })
    // 最后添加 不匹配路由进入 404
    // 注意！该配置必须在 所有路由指定之后
    routes.push(...anyRoutes)
    // 合并所有路由
    context.commit('setRoutes', routes)
    return routes
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
