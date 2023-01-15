<template>
  <!-- 外部图标 -->
  <div class="svg-icon-container">
    <div
      v-if="isExternal"
      :style="[styleExternalIcon, { fill: color }]"
      class="svg-external-icon svg-icon"
      :class="className"
    />
    <!-- 内部图标 -->
    <svg
      v-else
      class="svg-icon"
      :class="className"
      :style="{ fill: color }"
      aria-hidden="true"
    >
      <use :xlink:href="iconName" />
    </svg>
  </div>
  <!-- 外部图标 -->
  <!-- <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  /> -->
  <!-- 内部图标 -->
  <!-- <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg> -->
</template>
<script setup>
import { isExternal as external } from '@/utils/validate'
import { defineProps, computed } from 'vue'
// props 接收外部数据
const props = defineProps({
  // icon图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})

// 计算属性
// 判断当前图标是否为外部图标
const isExternal = computed(() => external(props.icon)) // 返回一个布尔值

// 外部图标样式(自己写样式)
// 箭头后面返回的是一个对象时, 不写return时， 需要使用({})
const styleExternalIcon = computed(() => ({
  // mask是 css中的一个属性，通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%` // 兼容其他浏览器
}))
// console.log(styleExternalIcon)

// 内部图标（添加类名前缀
const iconName = computed(() => `#icon-${props.icon}`)

// 图标颜色
// let color = props.color
</script>

<style lang="scss" scoped>
.svg-icon-container {
  display: inline-block;
}
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  // fill: currentColor;
  // fill: v-bind(color);
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
