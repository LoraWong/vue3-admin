<template>
  <div class="tags-view-container" ref="tagsWrapperTarget">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        v-for="(tag, index) in $store.getters.tagsViewList"
        :key="tag.fullPath"
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.fullPath }"
        :style="{
          backgroundColor: isActive(tag) ? $store.getters.cssVar.mainColor : '',
          borderColor: isActive(tag) ? $store.getters.cssVar.mainColor : ''
        }"
        @contextmenu.prevent="openMenu($event, index)"
      >
        {{ tag.title }}
        <svg-icon
          v-show="!isActive(tag)"
          icon="close"
          @click.prevent.stop="onCloseTag(index)"
        ></svg-icon>
      </router-link>
    </el-scrollbar>
    <!-- 右键选项 -->
    <ContextMenu
      v-show="isVisible"
      :style="menuStyle"
      :index="selectIndex"
    ></ContextMenu>
  </div>
</template>
<script setup>
import ContextMenu from './ContextMenu'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, watch, onMounted } from 'vue'
import { initSortable, tagsWrapperTarget } from './utils'
const route = useRoute()
const store = useStore()
/**
 * 是否被选中
 * @param {*} tag 当前tag
 */
const isActive = (tag) => {
  return tag.path === route.path
}
/**
 * 关闭 tag
 * @param {*} index 当前 tag索引号
 */
const onCloseTag = (index) => {
  store.commit('app/removeTags', {
    type: 'index',
    index: index
  })
}
// 右键选项是否展示
const isVisible = ref(false)
// 右键选项位置
const menuStyle = ref({
  left: 0,
  top: 0
})
// 选中的 tag 索引值
const selectIndex = ref(0)
/**
 * 右键 点击 tag
 * @param {*} event
 * @param {*} index
 */
const openMenu = (event, index) => {
  // 获取点击坐标
  const { x, y } = event
  // console.log('@', x, y)
  // 修改右键选项位置
  menuStyle.value.left = `${x}px`
  menuStyle.value.top = `${y}px`
  // 显示右键选项
  isVisible.value = true
  // 存储选中的 tag 索引值
  selectIndex.value = index
}

// 右键选项 关闭
const onCloseContextMenu = () => {
  isVisible.value = false
}

watch(isVisible, (val) => {
  if (val) {
    document.body.addEventListener('click', onCloseContextMenu)
  } else {
    document.body.removeEventListener('click', onCloseContextMenu)
  }
})

/**
 * @description: tag拖拽功能
 */

onMounted(initSortable)
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      border-radius: 8px;
      color: #495060;
      /* background: #fff; */
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        color: #fff;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 4px;
        }
      }
      // close 按钮
      .el-icon-close {
        width: 16px;
        height: 16px;
        line-height: 10px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
}
</style>
