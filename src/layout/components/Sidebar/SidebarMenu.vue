<template>
  <!-- 一级 menu 菜单 
  router：是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 default-active 来设置加载时的激活项
  default-active：页面加载时默认激活菜单的 index
  -->
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :uniqueOpened="true"
    :default-active="activeMenu"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :background-color="$store.getters.cssVar.mainColor"
    router
  >
    <SidebarItem
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></SidebarItem>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { filterRoutes, generateMenus } from '@/utils/route'
import { useRouter, useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
// console.log(router.getRoutes())
// 计算属性
const routes = computed(() => {
  // 去除重复的路由
  const fRoutes = filterRoutes(router.getRoutes())
  // console.log(fRoutes)
  // 不满足 meta && meta.title && meta.icon 的路由不需要展示在menu中
  return generateMenus(fRoutes)
})
// console.log('menu',routes.value)

// 默认激活项 页面加载时默认激活菜单项
// 获取当前路由信息
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped></style>
