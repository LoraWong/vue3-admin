<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import {} from 'vuex'
import {} from 'vue-router'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './Export2ExcelConstant'
import { dateFilter } from '@/filters'

defineProps({
  // 控制弹窗 显隐
  modelValue: {
    type: Boolean,
    required: true
  }
})
// 自定义事件
const emits = defineEmits(['update:modelValue'])
const i18n = useI18n()
// 弹出层 input的值
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName

/**
 * 监视语言变化
 */
watchSwitchLang(() => {
  // 修改弹出层 input 值
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

// 确认按钮 loading效果
const loading = ref(false)
/**
 * 导出 确认事件
 */
const onConfirm = async () => {
  // 开启 loading效果
  loading.value = true
  // 发请求 获取所有用户列表数据
  const res = await getUserManageAllList()
  const allUsers = res.list
  // console.log(allUsers)
  // 数据格式转化为excel、下载
  // 导入工具包（动态导入
  const excel = await import('@/utils/Export2Excel')
  // 将 json 数组对象 转化 成二维数组
  const data = formatJason(USER_RELATIONS, allUsers)
  // console.log(data)
  // 调用 export_json_to_excel 方法，将 json数据 转换为 excel、下载
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName
    // 是否自动列宽
    // autoWidth: true,
    // 文件类型
    // bookType: 'xlsx'
  })
  // 关闭弹出层
  closed()
}

/**
 * 将 json 数组对象 转化 成二维数组（从服务端获取到的为 json 数组对象 结构，但是导出时的数据需要为 二维数组
 * 调用export_json_to_excel方法，传入的data必须是 二维数组
 * @param {*} headers 表头数据源
 * @param {*} rows 用户数据源 allUsers
 */
const formatJason = (headers, rows) => {
  // 遍历数组
  // 第一级数组
  return rows.map((item) => {
    // 二维数组
    return Object.keys(headers).map((key) => {
      // 表头值
      const header = headers[key]
      // role 处理（服务端返回的 role 是一个数组
      if (header === 'role') {
        const roles = item[header] // 一个数组
        // 数组 转换为 JSON 字符串
        return JSON.stringify(roles.map((role) => role.title))
      }
      // 时间处理（因为服务端返回的 openTime 格式问题，所以我们需要在 excel 导出时对时间格式进行单独处理
      if (header === 'openTime') {
        return dateFilter(item[header])
      }
      return item[header]
    })
  })
}

/**
 * 关闭弹出层 回调
 */
const closed = () => {
  loading.value = false
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
