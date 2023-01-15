<template>
  <el-dialog :model-value="modelValue" @close="closed" width="22%">
    <!-- 弹出对话框 
    model-value: 是否显示 Dialog
   -->
    <!-- 颜色选择器 -->
    <div class="center">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker
        v-model="mColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
// 接收 props
defineProps({
  // 是否显示 Dialog
  modelValue: {
    type: Boolean,
    required: true
  }
})
// 声明(绑定 自定义事件
// 更新父组件中的 modelValue 值
const emits = defineEmits(['update:modelValue'])
// 预定义色值
const predefineColors = [
  '#1f306e',
  '#000000',
  '#343090',
  '#5f59f7',
  '#6592fd',
  '#44c2fd',
  '#8c61ff'
]
const store = useStore()
// 选中的色值
const mColor = ref(store.getters.mainColor)
// 点击对话框关闭按钮 事件回调
const closed = () => {
  // 通知父组件，更新modelValue 值（不显示 Dialog，值为 false
  emits('update:modelValue', false)
}

// 点击对话框确认按钮 事件回调
const confirm = async () => {
  // 根据选中的主色值 生成 最新的 element plus 样式表
  // console.log(generateNewStyle(mColor.value))
  const newStyleText = await generateNewStyle(mColor.value)
  // 把主色值替换后的样式 写入 style标签中
  writeNewStyle(newStyleText)
  // 通知 vuex 保存选中的主题色
  store.commit('theme/setMainColor', mColor.value)
  // 关闭对话框
  closed()
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
