<template>
  <div
    class="app-wrapper"
    :class="$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar'"
  >
    <!--左侧导航 Sidebar -->
    <Sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.mainColor }"
    ></Sidebar>

    <div class="main-container">
      <div class="fixed-header">
        <!--顶部导航 Navbar -->
        <Navbar></Navbar>
        <!-- tagsView -->
        <TagsView id="guide-tags"></TagsView>
      </div>
      <!--内容区 AppMain -->
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import AppMain from './components/AppMain'
import variables from '@/styles/variables.module.scss' // eslint-disable-line no-unused-vars
import TagsView from '@/components/TagsView'

// console.log(variables)
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  min-height: 100%;
  width: 100%;
  background-color: #f3f6fd;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
