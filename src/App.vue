<template>
  <el-config-provider :locale="store.getters.language === 'en' ? en : zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { watchSwitchLang } from '@/utils/i18n'
// element-plus 国际化语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

const store = useStore()

// 主题切换 修改 element 样式色值
// 要在 app.vue中  写入style标签（确保 页面刷新 ，新写入的 style标签 依然存在
// 根据选中的主色值 生成 最新的 element plus 样式表
generateNewStyle(store.getters.mainColor).then((newStyleText) => {
  // // 把主色值替换后的样式 写入 style标签中
  writeNewStyle(newStyleText)
})

/**
 * 监听 语言变化，重新获取个人信息
 */
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style lang="scss"></style>
