// 用户相关
import { login, getUserInfo } from '@/api/sys'
// 加密工具
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router, { resetRouter } from '@/router'
import { setTimestamp } from '@/utils/auth'

const state = {
  token: getItem(TOKEN) || '', // 本地读取token
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    // token 存到 state
    state.token = token
    // 本地存储 token
    setItem(TOKEN, token)
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}
const actions = {
  // 登录请求动作
  async login(context, userInfo) {
    const { username, password } = userInfo
    try {
      const res = await login({
        username,
        password: md5(password) // 加密
      })
      // 请求成功
      // console.log(res)
      context.commit('setToken', res.token)
      // 路由跳转
      router.push('/')
      // 本地存储登录时间
      setTimestamp()
      return 'ok'
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // 获取用户信息
  async getUserInfo(context, userInfo) {
    const res = await getUserInfo()
    context.commit('setUserInfo', res)
    return res
  },
  // 退出登录
  logout(context) {
    // 清除权限相关配置,删除动态添加的路由
    // 之一！ 这一步要写在[清除用户数据]前面，因为需要用到 store中的 userInfo
    resetRouter()
    // 清除用户缓存数据
    // 清除仓库数据
    context.commit('setToken', '')
    context.commit('setUserInfo', {})
    this.commit('app/initTagsViewList')
    // 清除本地数据
    removeAllItem()
    // 返回登录页
    router.push('/login')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
