<template>
  <div class="app-main">
    <!-- 基于 过渡动画 的路由切换、有缓存 -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { watch } from 'vue'
import { isTags, getTitle } from '@/utils/tags'
import { watchSwitchLang } from '@/utils/i18n'

const route = useRoute()
const store = useStore()
// /**
//  * 生成title (有些路由没有 title，但需要出现在 tags)
//  * @return {*}
//  */
// const getTitle = (route) => {
//   let title = ''
//   if (route.meta && route.meta.title) {
//     // i18n处理
//     title = generateTitle(route.meta.title)
//   } else {
//     // 没有 title，但需要出现在 tags，让路径的最后一个字段 作为 title
//     const pathArr = route.path.split('/')
//     title = pathArr[pathArr.length - 1]
//   }
//   return title
// }

/**
 * 监听路由变化
 * @return {*}
 */
watch(
  route,
  (to, from) => {
    // 不是所有路由都需要 出现在tags
    if (isTags(to.path)) {
      const { fullPath, meta, name, params, path, query } = to
      store.commit('app/addTags', {
        fullPath,
        meta,
        name,
        params,
        path,
        query,
        title: getTitle(to) // 有些路由没有 title，但需要出现在 tags
      })
    }
  },
  { immediate: true }
)

/**
 * 监听语言变化
 * @return {*}
 */
watchSwitchLang(() => {
  // 通知 vuex 修改tag
  store.commit('app/changeTagsView')
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px;
  box-sizing: border-box;
}
</style>
