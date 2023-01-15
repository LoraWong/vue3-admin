<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import E from 'wangeditor'
import { onMounted, defineProps, watch } from 'vue'
// 国际化插件
import i18next from 'i18next'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { commitArticle, editArticle } from './commit'
import { watchSwitchLang } from '@/utils/i18n'

const store = useStore()
const router = useRouter()
const props = defineProps({
  title: {
    required: true,
    type: String
  },
  detail: {
    type: Object
  }
})

// Editor实例
let editor
// 处理离开页面切换语言导致 dom 无法被获取
let el
onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})

const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  // 国际化相关处理
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}

// 监听语言变化
watchSwitchLang(() => {
  // console.log('@')
  if (!el) return
  // 保存文本
  const htmlStr = editor.txt.html()
  // 销毁编辑器
  editor.destroy()
  // 初始化编辑器
  initEditor()
  // 写入文本
  editor.txt.html(htmlStr)
})

/**
 * 编辑相关
 */
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.txt.html(val.content)
    }
  }
)
/**
 * 点击提交
 */
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    // 编辑文章
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    // 创建文章
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
  }
  // editor.txt.html('')
  // 路由跳转
  router.push('/article')
}
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
