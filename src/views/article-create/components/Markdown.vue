<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit'

const store = useStore()
const router = useRouter()
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})

// 初始化 MkEditor 实例
let mkEditor
let el
const initEditor = () => {
  mkEditor = new MkEditor({
    // 元素
    el,
    // 高度
    height: '500px',
    // 样式
    previewStyle: 'vertical',
    // 国际化
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}

/**
 * 必须在挂载以后 初始化MkEditor 实例
 */
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

/**
 * 监听语言变化
 */
watchSwitchLang(() => {
  if (!el) return
  // 保存用户输入的内容
  const htmlStr = mkEditor.getHTML()
  // 销毁 MkEditor 实例
  mkEditor.destroy()
  // 重新初始化 MkEditor 实例
  initEditor()
  // 插入 用户输入的内容
  mkEditor.setHTML(htmlStr)
})

/**
 * 编辑（/editor 和 /create路由注册的是同一个组件，由于路由缓存，路由切换，该组件不会从新挂载，需要监视数据
 */
watch(
  () => props.detail,
  (val) => {
    // 插入 用户输入的内容
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

/**
 * 提交按钮 回调
 */
const onSubmitClick = async () => {
  // 判断：编辑文章 还是 创建文章（发的请求不一样
  if (props.detail && props.detail._id) {
    // 编辑文章
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    // 创建文章
    await commitArticle({
      title: props.title, // title字段来自父组件
      content: mkEditor.getHTML()
    })
  }
  // 清空 markdown
  // mkEditor.reset()
  // 路由跳转
  router.push('/article')
}
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
