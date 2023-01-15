<template>
  <!-- <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="them"
    @command="handleSetTheme"
  > -->
  <!-- 主题图标 
    为什么使用$attrs，这个组件有两个 根元素 ，要将父组件传递过来的props值绑定给 el-dropdown 组件(此处接收的是 class类名)
    $attrs: 获取父组件传递过来的所有props值， v-bind解析js表达式，
  -->
  <div class="them" v-bind="$attrs" @click="handleSetTheme">
    <el-tooltip :content="$t('msg.navBar.themeChange')">
      <svg-icon
        id="guide-theme"
        icon="change-theme"
        :color="$store.getters.cssVar.menuBg"
      />
    </el-tooltip>
  </div>
  <!-- <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown> -->
  <!-- 弹出层 颜色选择器 -->
  <div>
    <SelectColor v-model="selectColorVisible"></SelectColor>
  </div>
</template>
<script setup>
import SelectColor from './components/SelectColor'
import { ref } from 'vue'
// 是否关闭 颜色选择器 dialog（默认关闭
const selectColorVisible = ref(false)
// 点击 切换主题色 按钮 事件回调
const handleSetTheme = (command) => {
  // 显示 颜色选择器 dialog
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
