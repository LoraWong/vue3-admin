// 主题换肤
import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
import variables from '@/styles/variables.module.scss'

const state = {
  mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
  variables: variables
}
const mutations = {
  // 存储 主题色
  setMainColor(state, newColor) {
    state.mainColor = newColor
    // 修改css变量 menuBg
    state.variables.menuBg = newColor
    // 也可以在此时 存储 新的色值表！
    // generateColors(getItem(MAIN_COLOR))
    // 本地缓存
    setItem(MAIN_COLOR, newColor)
  }
}
const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
