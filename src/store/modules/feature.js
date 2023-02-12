import { FEATURE_TOKEN } from '@/constant'
import { login } from '@/api/feature'
import { setItem, getItem, removeAllItem } from '@/utils/storage'

const state = {
  featureToken: getItem(FEATURE_TOKEN) || ''
}
const mutations = {
  setToken(state, token) {
    // token 存到 state
    state.featureToken = token
    // 本地存储 token
    setItem(FEATURE_TOKEN, token)
  }
}
const actions = {
  // 获取token和用户信息
  async featureLogin({ commit }) {
    const res = await login('admin', 'admin')
    console.log('🚀 ~ file: feature.js:20 ~ featureLogin ~ res', res)
    commit('setToken', res.token)
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
