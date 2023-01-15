<template>
  <div class="article-create">
    <el-card v-loading="loading">
      <!-- input 标题 -->
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      >
      </el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <!-- markdown -->
          <markdown :title="title" :detail="detail"></markdown>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <!-- 富文本 -->
          <editor :title="title" :detail="detail"></editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import Editor from './components/Editor.vue'
import Markdown from './components/Markdown.vue'
import { ref, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import { articleDetail } from '@/api/article'

const route = useRoute()
const articleId = route.params.id
const activeName = ref('markdown')
const title = ref('')
const detail = ref({})
const loading = ref(false)

/**
 * 编辑相关
 */

/**
 * 获取当前文章数据，展示 title
 */
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  // 标题赋值
  title.value = detail.value.title
}

onActivated(() => {
  if (articleId) {
    loading.value = true
    getArticleDetail()
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
