<template>
  <el-upload
    drag
    :action="uploadImageAction"
    multiple
    :headers="{
      token: $store.state.feature.featureToken
    }"
    name="img"
    :data="data"
    :on-success="uploadSuccess"
    :on-error="uploadError"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>
<script setup>
import { uploadImageAction } from '@/api/images'
import { toast } from '@/utils/message'

defineProps({
  data: Object
})

const emit = defineEmits(['success'])

// 上传成功的回调
const uploadSuccess = (response, uploadFile, uploadFiles) => {
  console.log(response)
  // 通知父组件重新获取数据
  emit('success', {
    response,
    uploadFile,
    uploadFiles
  })
}

// 上传失败的回调
const uploadError = (error, uploadFile, uploadFiles) => {
  const msg = JSON.parse(error.message).msg || '上传失败'
  toast(msg, 'error')
}
</script>
