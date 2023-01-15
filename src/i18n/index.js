import { createI18n } from 'vue-i18n'
import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'
import store from '@/store'

// message数据源
const messages = {
  en: {
    msg: {
      ...mEnLocale
    }
  },
  zh: {
    msg: {
      ...mZhLocale
    }
  }
}
// locale语言变量
function getLanguage() {
  // 获取仓库中存储的 language
  return store && store.getters && store.getters.language
}
console.log(getLanguage())
// 创建 i18n实例
const i18n = createI18n({
  // 使用 composition API，所以 legacy要为false
  legacy: false,
  // 全局使用 t函数
  globalInjection: true,
  locale: getLanguage(),
  messages
})
export default i18n
