<template>
  <div class="upload-excel">
    <!-- 点击按钮 导入 -->
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>
    <!-- 隐藏域 -->
    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- 拖拽导入 -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload" />
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import XLSX from 'xlsx'
import { ref, defineProps } from 'vue'
import { getHeaderRow, isExcel } from './utils'
import { ElMessage } from 'element-plus'
import {} from 'vuex'
import {} from 'vue-router'

const props = defineProps({
  // 以对象形式声明中的每个属性，key 是 prop 的名称，而值则是该 prop 预期类型的构造函数
  // 上传之前的回调（props 可以传递函数
  beforeUpload: Function,
  // 上传成功的回调
  onSuccess: Function
})
const loading = ref(false)
const excelUploadInput = ref(null)

/**
 * 点击导入
 */
/**
 * 点击上传按钮
 */
const handleUpload = () => {
  // 触发 隐藏域input的点击事件
  excelUploadInput.value.click()
}
/**
 *  隐藏域input的change事件（选中文件成功后触发
 */
const handleChange = (e) => {
  // 带有 type="file" 的 <input> 元素允许用户可以从他们的设备中选择一个或多个文件
  // 获取用户选中的文件
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  // console.log(rawFile) // 一个对象
  // 上传文件
  upload(rawFile)
}

/**
 * 拖拽导入
 */
/**
 * drop 元素拖拽到指定区域后松开鼠标时 触发该回调
 */

const handleDrop = (e) => {
  // 有文件上传中
  if (loading.value) return
  // 没有文件在上传
  // 获取 生成的源项副本
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  // 判断文件格式 是否为 excel
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return
  }
  // 上传文件
  upload(rawFile)
}

/**
 * dragenter / dragover 元素拖拽到指定区域后 触发该回调
 */

const handleDragover = (e) => {
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy'
}

/**
 * 上传文件
 * @param {*} rawFile
 */
const upload = (rawFile) => {
  // 清空 隐藏域input的 value 值
  excelUploadInput.value.value = null // 空对象
  // 用户没有指定 上传前的回调
  if (!props.beforeUpload) {
    // 读取数据（异步
    readData(rawFile)
    return
  }
  // 用户指定了上传前的回调，只有 返回值为true，才执行后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    // 读取数据（异步
    readData(rawFile)
  }
}

/**
 * 读取数据（异步
 */
const readData = (rawFile) => {
  // 开启 loading 效果
  loading.value = true
  return new Promise((resolve, reject) => {
    // FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的文件，使用 File 或 Blob 对象指定要读取的文件或数据
    // 其中 File 对象可以是来自用户在一个<input>元素上选择文件后返回的FileList对象，也可以来自拖放操作生成的 DataTransfer对象
    // 创建一个 FileReader对象
    const reader = new FileReader()
    // 绑定load事件： 该事件在读取操作完成时触发
    reader.onload = (e) => {
      // 1. 获取解析到的数据
      const data = e.target.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // console.log(workbook) // 一个对象
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取 Sheet1（第一张表格）的数据
      const workSheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头(通用，不需要自己写)
      const header = getHeaderRow(workSheet)
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 7. 传入解析之后的数据, 生成数据
      generateData({ header, results })
      // 8. loading 处理
      loading.value = false
      // 9. 异步完成
      resolve()
    }
    // 读取文件
    // FileReader.readAsArrayBuffer() 读取指定的 Blob中的内容，result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象
    reader.readAsArrayBuffer(rawFile)
  })
}

/**
 * 将解析成功后的数据传给 父组件，生成数据
 * 根据导入的文件，生成数据
 */
const generateData = (excelData) => {
  // 执行上传成功的回调
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
