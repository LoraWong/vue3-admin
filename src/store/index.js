import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import theme from './modules/theme'
import getters from './getters'
import permission from './modules/permission'
import feature from './modules/feature'

export default createStore({
  modules: {
    user,
    app,
    theme,
    permission,
    feature // 新增功能用户相关
  },
  getters
})
