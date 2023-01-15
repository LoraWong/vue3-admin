<template>
  <!-- 显示 每个 menu 项的title和icon -->
  <!--element icon -->
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <!-- 非 element icon (已经封装的 sgv组件)-->
  <svg-icon v-else :icon="icon"></svg-icon>
  <!-- title -->
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
import { generateTitle } from '@/utils/i18n'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
