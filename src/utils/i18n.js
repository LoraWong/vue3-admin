import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store'
// 左侧导航 title
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

// 搜索栏 结果国际化
// 监听语言变化，对 搜索数据源进行国际化处理
/**
 *
 * @param  {...any} cbs 所有的回调
 */
export function watchSwitchLang(...cbs) {
  watch(
    (state) => store.getters.language,
    () => {
      // 语言变化, 执行回调
      cbs.forEach((cb) => cb())
    }
  )
}
