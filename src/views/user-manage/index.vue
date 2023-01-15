<template>
  <div class="user-manage-container">
    <!-- excel导入 导出 -->
    <el-card class="header">
      <div>
        <!-- 导入 -->
        <el-button
          type="primary"
          @click="onImportExcelClick"
          v-permission="['importUser']"
        >
          {{ $t('msg.excel.importExcel') }}</el-button
        >
        <!-- 导出 -->
        <el-button type="success" @click="onToExcelClick">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>
    <!-- 用户列表 -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <!-- 用户名 -->
        <el-table-column prop="username" :label="$t('msg.excel.name')">
        </el-table-column>
        <!-- 手机号 -->
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')">
        </el-table-column>
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">{{
                item.title
              }}</el-tag>
            </div>
            <!-- 默认角色 -->
            <div v-else>
              <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
          <!-- 开通时间 -->
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{ row }">
            <!-- 查看 -->
            <el-button type="primary" size="small" @click="onShowDetail(row)">{{
              $t('msg.excel.show')
            }}</el-button>
            <!-- 分配角色 -->
            <el-button
              type="info"
              size="small"
              @click="onShowRoleClick(row)"
              v-permission="['distributeRole']"
              >{{ $t('msg.excel.showRole') }}</el-button
            >
            <!-- 删除 -->
            <el-button
              type="danger"
              size="small"
              @click="onRemoveClick(row)"
              v-permission="['removeUser']"
              >{{ $t('msg.excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 导出 excel 弹出层 -->
    <ExportToExcel v-model="exportToExcelVisible"></ExportToExcel>
    <!-- 分配角色 弹出层 -->
    <roles
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    ></roles>
  </div>
</template>

<script setup>
import { ref, onActivated, watch } from 'vue'
import {} from 'vuex'
import { useRouter } from 'vue-router'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import ExportToExcel from './components/Export2Excel'
import Roles from './components/roles'

const i18n = useI18n()
const router = useRouter()
// 表格数据
const tableData = ref([])
// 分页器
const total = ref(0)
const page = ref(2)
const size = ref(3)

/**
 * 获取数据
 */
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
// getListData()

// 处理导入用户后数据不重新加载的问题（路由缓存
/**
 * 路由组件进入之前调用
 */
onActivated(getListData)

/**
 * 监视语言变化，重新获取数据
 */
watchSwitchLang(getListData)

/**
 * 删除
 * @param {*} row 当前行
 */
const onRemoveClick = (row) => {
  // console.log(row)
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // 重新渲染数据
    getListData()
  })
}

// 分页相关
/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

/**
 * 导入相关
 */
/**
 * excel导入按钮
 */
const onImportExcelClick = () => {
  // 路由跳转
  router.push('/user/import')
}

/**
 * 导出相关
 */
const exportToExcelVisible = ref(false)
/**
 * excel 导出按钮
 */
const onToExcelClick = () => {
  // 显示弹出层
  exportToExcelVisible.value = true
}

/**
 * 点击 查看
 * @param {*} row 当前行
 */
const onShowDetail = (row) => {
  // console.log(row)
  router.push(`/user/info/${row._id}`)
}

/**
 * 分配角色相关
 */
// 控制 对话框 显示隐藏
const roleDialogVisible = ref(false)
// 当前选中的用户id
const selectUserId = ref('')

/**
 * 监视 角色对话框 显示隐藏
 */
watch(roleDialogVisible, (val) => {
  // 关闭对话框时，清空 userId（确保用户每次打开对话框，都发请求 获取到最新的数据
  if (!val) selectUserId.value = ''
})

/**
 * 点击 分配角色 按钮
 */
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  // 保存 当前选中的用户id
  selectUserId.value = row._id
  // 可以直接在这里 使用 ref 获取对话框组件实例，然后调用对话框组件中的请求方法
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
