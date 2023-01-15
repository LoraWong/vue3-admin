// 全局
import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant/index'
import { getTitle } from '@/utils/tags'
const state = {
  // 左侧菜单伸缩状态
  sidebarOpened: true,
  // 国际化 语言状态
  language: getItem(LANG) || 'zh',
  // tags 数据源
  tagsViewList: getItem(TAGS_VIEW) || []
}

const mutations = {
  // 左侧菜单伸缩
  triggerSidebarOpened(state) {
    state.sidebarOpened = !state.sidebarOpened
  },
  // 国际化 语言状态
  setLanguage(state, lang) {
    setItem(LANG, lang)
    state.language = lang
  },
  // 初始化 tagsView
  initTagsViewList(state) {
    state.tagsViewList = []
  },
  // 添加 tags
  addTags(state, tag) {
    // 处理重复 tag
    const isRepeat = state.tagsViewList.find((item) => item.path === tag.path)
    if (!isRepeat) {
      state.tagsViewList.push(tag)
      // 本地存储
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  },
  // 修改 tags（国际化
  changeTagsView(state) {
    state.tagsViewList.forEach((item) => {
      item.title = getTitle(item)
    })
  },
  // 删除 tags
  /**
   * @param {type: 'other'||'right'||'index', index: index} payload
   */
  removeTags(state, payload) {
    // 删除当前 tag
    if (payload.type === 'index') {
      state.tagsViewList.splice(payload.index, 1)
    } else if (payload.type === 'right') {
      // 删除 右侧 tag
      state.tagsViewList.splice(
        payload.index + 1,
        state.tagsViewList.length - payload.index + 1
      )
    } else if (payload.type === 'other') {
      // 删除 其他
      state.tagsViewList = state.tagsViewList.filter(
        (item, index) => index === payload.index
      )
    }
    // 本地存储
    setItem(TAGS_VIEW, state.tagsViewList)
  },
  // 移动 tags
  moveTags(state, { oldIndex, newIndex }) {
    // 修改 tags 顺序
    // arr.splice(newIndex, 0, ...arr.splice(oldIndex, 1))
    state.tagsViewList.splice(
      newIndex,
      0,
      ...state.tagsViewList.splice(oldIndex, 1)
    )

    // 本地存储
    setItem(TAGS_VIEW, state.tagsViewList)
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
