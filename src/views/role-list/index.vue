<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column :label="$t('msg.role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe">
        </el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
          #default="{ row }"
        >
          <el-button
            type="primary"
            size="small"
            @click="onDistributePermissionClick(row)"
            v-model="distributePermissionVisible"
            v-permission="['distributePermission']"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="distributePermissionVisible"
      :roleId="roleId"
    ></distribute-permission>
  </div>
</template>

<script setup>
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ref, watch } from 'vue'
import DistributePermission from './components/DistributePermission.vue'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)

/**
 * 分配权限
 */
// 控制弹窗显示隐藏
const distributePermissionVisible = ref(false)
// 当前选中的id
const roleId = ref('')

/**
 * 监听 弹窗显示隐藏
 */
watch(distributePermissionVisible, (val) => {
  // 弹窗 关闭，清空 userId（确保弹窗每次打开 重新获取数据
  if (!val) {
    roleId.value = ''
  }
})
/**
 * 点击 分配权限按钮 回调
 */
const onDistributePermissionClick = (row) => {
  // 保存选中的id
  roleId.value = row.id
  // 显示弹窗
  distributePermissionVisible.value = true
}
</script>
