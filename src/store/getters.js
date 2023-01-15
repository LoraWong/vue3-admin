// 快捷访问

// 根据主色生成色值表
import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'

const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    // 用户信息是否存在（是否为空对象
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: (state) => {
    return {
      ...state.theme.variables,
      // 根据主色生成的色值表 （新增加的css变量 会替换 以前的
      ...generateColors(getItem(MAIN_COLOR))
    }
  },
  sidebarOpened: (state) => state.app.sidebarOpened,
  // 国际化 语言状态
  language: (state) => state.app.language,
  // 主题色
  mainColor: (state) => state.theme.mainColor,
  // tags数据源
  tagsViewList: (state) => state.app.tagsViewList
}

export default getters
