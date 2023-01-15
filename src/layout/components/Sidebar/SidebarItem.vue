<template>
  <!-- 根据数据处理 当前项为 el-submenu || el-menu-item
  如果存在 children，则以 el-submenu 多级菜单 展示
  否则，以 el-menu-item 菜单项 展示 -->
  <!-- 多级菜单 -->
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <!-- title 和 icon -->
    <template #title>
      <MenuItem :title="route.meta.title" :icon="route.meta.icon"></MenuItem>
    </template>
    <!-- 子菜单 循环渲染-->
    <SidebarItem
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></SidebarItem>
  </el-sub-menu>
  <!-- 单级菜单 -->
  <el-menu-item v-else :index="route.path">
    <MenuItem :title="route.meta.title" :icon="route.meta.icon"></MenuItem>
  </el-menu-item>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
import { defineProps } from 'vue'
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
