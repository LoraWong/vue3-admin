<template>
  <UploadExcel :onSuccess="onSuccess"> </UploadExcel>
</template>

<script setup>
import {} from 'vue'
import { useRouter } from 'vue-router'
import UploadExcel from '@/components/UploadExcel'
import { USER_RELATIONS, formatDate } from './utils'
import { userBatchImport } from '@/api/user-manage'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const i18n = useI18n()

/**
 * 文件上传解析成功的回调：数据上传到服务器
 * @param {*} excelData 解析之后 excel数据
 */
const onSuccess = async (excelData) => {
  const { results } = excelData
  // console.log(results)
  // console.log(generateData(results))
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success({
    // xx 条员工数据已上传
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}

/**
 * 生成 符合服务器要求的数据
 */

const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}
    // 把 result里面的 key 替换成 英文（符合后端要求
    Object.keys(item).forEach((key) => {
      // 处理时间格式
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return // 结束当前函数
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })
    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
