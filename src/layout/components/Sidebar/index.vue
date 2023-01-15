<template>
  <div>
    <!-- title -->
    <div class="logo-container">
      <el-avatar
        :size="44"
        shape="square"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
      />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        {{ $store.getters.userInfo.title }}
      </h1>
    </div>
    <!-- 滚动条 -->
    <el-scrollbar>
      <SidebarMenu></SidebarMenu>
    </el-scrollbar>
  </div>
</template>
<script></script>
<script setup>
import SidebarMenu from './SidebarMenu'
export default {
  name: 'Sidebar'
}
</script>

<style lang="scss" scoped>
.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
