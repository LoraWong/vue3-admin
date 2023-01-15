<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      v-loading="loading"
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
    >
    </el-tree>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { permissionList } from '@/api/permission'
import { rolePermission, distributePermission } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import {} from 'vuex'
import {} from 'vue-router'

const i18n = useI18n()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
const loading = ref(false)
// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}
getPermissionList()
watchSwitchLang(getPermissionList)

// tree组件 props属性结构配置
const defaultProps = {
  // 展示的子节点数据
  children: 'children',
  // title
  label: 'permissionName'
}
// tree组件实例
const treeRef = ref(null)
/**
 * 当前角色的权限
 */
const getRolePermission = async () => {
  loading.value = true
  const checkedKeys = await rolePermission(props.roleId)
  // console.log(checkedKeys)
  // tree组件中的一个方法，用来设置目前选中的节点，使用此方法必须设置 node-key 属性
  // (keys, leafOnly) 接收两个参数: 1. 一个需要被选中的多节点 key 的数组 2. 一个布尔类型参数，默认为 false. 如果参数是 true, 它只返回当前选择的子节点数组。
  treeRef.value.setCheckedKeys(checkedKeys)
  loading.value = false
}
watch(
  () => props.roleId,
  (val) => {
    if (val) getRolePermission() // 发请求
  }
)

/**
  确定按钮点击事件
 */
const onConfirm = async () => {
  // 发请求
  await distributePermission({
    roleId: props.roleId,
    // getCheckedKeys ,返回当前选中节点 key 的数组
    permissions: treeRef.value.getCheckedKeys()
  })

  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
