<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 最后一项 不可点击 -->
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">{{
          generateTitle(item.meta.title)
        }}</span>
        <!-- 其他项 可点击 -->
        <span class="redirect" v-else @click="onLinkClick(item)">{{
          generateTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
// 计算面包屑数据
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  // 当前路由的路由表（数组
  // console.log(route.matched)
  // 过滤出 含有 item.meta.title 的路由对象
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
  // console.log(breadcrumbData.value)
}
// 监听路由变化
// 注意！ 页面刷新路由没有发生变化，如果使用computed，页面刷新不会执行回调
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    // 立即监听，页面刷新会执行回调
    immediate: true
  }
)
// 点击面包屑 切换路由
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}
// 主题替换，hover颜色设置为主题颜色
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
