<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :label="item.label"
            :key="index"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border v-loading="loading">
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :min-width="setColumnWidth(item.prop)"
        >
          <template v-if="item.prop === 'publicDate'" #default="{ row }">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template v-if="item.prop === 'action'" #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row)"
              >{{ $t('msg.article.show') }}
            </el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">{{
              $t('msg.article.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { getArticleList, deleteArticle } from '@/api/article'
import { watchSwitchLang } from '@/utils/i18n'
import { selectDynamicLabel, dynamicData, tableColumns } from './dynamic'
import { tableRef, initSortable } from './sortable'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()
/**
 * ??????
 */
const tableData = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)
const loading = ref(false)
// ??????
const setColumnWidth = (prop) => {
  if (prop === 'ranking') return 80
  if (prop === 'title') return 200
  if (prop === 'desc') return 350
  return 180
}

/** t
 * ????????????
 */

const getListData = async () => {
  loading.value = true
  const res = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = res.list
  total.value = res.total
  loading.value = false
}

getListData()
// ??????????????????
watchSwitchLang(getListData)
// ????????????????????????????????????
onActivated(getListData)

/**
 * ????????????
 */

// ????????? sortable
// ????????????
onMounted(() => {
  initSortable(tableData, getListData)
})

/**
 * ????????????
 */

const onShowClick = (row) => {
  // ???????????? ??????
  router.push(`/article/${row._id}`)
}

/**
 * ????????????
 */

const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteArticle(row._id)
    ElMessage.success(i18n.t('msg.article.removeSuccess'))
    // ??????????????????
    getListData()
  })
}

/**
 * size ????????????
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

/**
 * ??????????????????
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
  ::v-deep .sortable-ghost {
    opacity: 0.6;
    color: #2a6fdb !important;
    background-image: linear-gradient(
      to top,
      #cfd9df 0%,
      #e2ebf0 100%
    ) !important;
  }
}
</style>
