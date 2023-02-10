<template>
  <div>
    <!-- title -->
    <div class="logo-container">
      <svg-icon
        className="logo"
        icon="logo"
        v-if="$store.getters.sidebarOpened"
      >
      </svg-icon>
    </div>
    <!-- 滚动条 -->
    <el-scrollbar>
      <SidebarMenu
        :style="{ backgroundColor: $store.getters.cssVar.mainColor }"
      ></SidebarMenu>
    </el-scrollbar>
  </div>
</template>

<script>
/* eslint-disable */
/* eslint-enable */
</script>

<script setup>
import SidebarMenu from './SidebarMenu'
export default {
  name: 'Sidebar'
}
</script>

<style lang="scss" scoped>
.logo-container {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  ::v-deep .logo {
    width: 150px;
    height: 50px;
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
