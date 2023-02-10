<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon
      id="guide-hamburger"
      :icon="icon"
      :color="$store.getters.cssVar.mainColor"
      class="hamburger"
    ></svg-icon>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
// 菜单伸缩功能
const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 30px;
  }
}
</style>
