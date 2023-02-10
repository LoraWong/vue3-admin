<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon
      id="guide-search"
      class="search-icon"
      icon="search"
      :color="$store.getters.cssVar.mainColor"
      @click.stop="onShowClick"
    />
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchResult"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { filterRoutes } from '@/utils/route'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { generateRoutes } from './FuseData'
import { watchSwitchLang } from '@/utils/i18n'

const router = useRouter()
// 搜索数据源
let searchPool = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  // console.log(JSON.stringify(fRoutes))
  return generateRoutes(fRoutes)
})
// console.log(searchPool.value)

// 搜索库相关配置（对检索数据源进行模糊搜索
/**
 * @param {*} list 数据源
 */
let fuse
const initFuse = (list) => {
  fuse = new Fuse(list, {
    // 是否按优先级进行排序
    shouldSort: true,
    // 匹配长度超过这个值的才会被认为是匹配的
    minMatchCharLength: 1,
    // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
    // name：搜索的键 （对 title、path两个属性进行搜索
    // weight：对应的权重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)

// el-select 实例
const headerSearchSelectRef = ref(null)
// 控制 search打开/关闭
const isShow = ref(false)

// 打开/关闭 search 回调
const onShowClick = () => {
  // console.log('打开/关闭 search')
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}
// 收集search关键字
const search = ref('')

// 搜索输入回调
const searchResult = ref([])
const querySearch = (query) => {
  // console.log('输入')
  // fuse.search方法，返回匹配搜索的数据
  // console.log(fuse.search(query))
  if (query.trim() !== '') {
    searchResult.value = fuse.search(query)
  } else {
    searchResult.value = []
  }
}
// 选中 option 回调
const onSelectChange = (val) => {
  // console.log('选中option')
  // 路由跳转
  router.push(val.path)
  onClose()
}

// 关闭 search 回调
const onClose = () => {
  // console.log('onClose')
  // 失去焦点
  // headerSearchSelectRef.value.blur()
  // 关闭 search
  isShow.value = false
  // 清空 匹配的数据源
  searchResult.value = []
  // 清空搜索框
  search.value = ''
}

// 监视 search打开/关闭状态
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

// 搜索数据源国际化(getters中的 language发生变化时，重新生成数据源)
watchSwitchLang(() => {
  // 重新生成数据源
  searchPool = computed(() => {
    const fRoutes = filterRoutes(router.getRoutes())
    return generateRoutes(fRoutes)
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 10px;
      padding-right: 0;
      box-shadow: none !important;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
      border: 1px solid #d9d9d9;
      border-radius: 25px;
    }
  }
}
</style>
