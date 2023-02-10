<template>
  <div>
    <svg-icon
      id="guide-full"
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      :color="$store.getters.cssVar.mainColor"
      @click="onToggle"
    />
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Screenfull'
}
</script>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
import { on } from 'events'

// 是否全屏
const isFullscreen = ref(false)

// 点击 全屏按钮 回调
const onToggle = () => {
  // 全屏切换
  screenfull.toggle()
}

// 监听 screenfull变化（ 全屏状态
// screenfull变化 事件回调
const screenChange = () => {
  // screenfull变化时，切换图标
  isFullscreen.value = screenfull.isFullscreen
}
// screenfull变化事件
// on 绑定事件 （组件挂载时绑定事件
onMounted(() => {
  screenfull.on('change', screenChange)
})
// off 解绑事件（组件卸载时 解绑事件
onUnmounted(() => {
  screenfull.off('change', screenChange)
})
</script>

<style lang="scss" scoped></style>
