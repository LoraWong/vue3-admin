<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSetLanguage"
  >
    <div>
      <!-- effect: Tooltip 主题，内置了 dark / light 两种-->
      <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
        <svg-icon
          id="guide-lang"
          icon="language"
          :color="$store.getters.cssVar.menuBg"
        ></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <!-- command	派发到command回调函数的指令参数 -->
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

// effect: Tooltip 主题，内置了 dark / light 两种
defineProps({
  effect: {
    type: String,
    default: 'dark',
    // 校验：只有dark / light 两种
    validator: function (value) {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})
const store = useStore()
// 当前 语言状态
const language = computed(() => {
  return store.getters.language
})
// 切换语言
const i18n = useI18n()
const handleSetLanguage = (lang) => {
  // 通知 vuex 修改语言状态 language
  store.commit('app/setLanguage', lang)
  // 修改 i18n locale
  i18n.locale.value = lang
  // 提示
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style lang="scss" scoped></style>
