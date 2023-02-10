<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>

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
import { roleList } from '@/api/role'
import { userRoles, updateRole } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})
// 自定义事件
const emits = defineEmits(['update:modelValue', 'updateRole'])

/**
 * 获取数据
 */
// 所有角色
const allRoleList = ref([])
// 获取所有角色数据的方法
const getListData = async () => {
  allRoleList.value = await roleList()
}
getListData()
watchSwitchLang(getListData)

// 当前用户角色（双向数据绑定，收集用户勾选的角色
const userRoleTitleList = ref([])
// 获取当前用户角色数据
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  // console.log(res)
  // 取出 title 字段 ，组成新数组
  userRoleTitleList.value = res.role.map((item) => item.title)
}

/**
 * watch监视userId，父组件把获取到的userId传给对话框后，userId变化就发请求
 */
watch(
  () => props.userId,
  (val) => {
    if (val) getUserRoles()
  }
)

/**
 确定按钮点击 回调
*/
const onConfirm = async () => {
  // 针对 收集到的数据，处理数据结构，使其符合 后端要求
  // 在所有 角色里 筛选出 用户选择的角色
  const roles = userRoleTitleList.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title)
  })
  // 发请求
  await updateRole(props.userId, roles)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 通知 父组件 再次发请求获取数据进行展示
  emits('updateRole')
  closed()
}

/**
 * 取消按钮 回调
 */
const closed = () => {
  // 通知 父组件 修改 modelValue 值
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
