<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <!-- 索引 -->
    <el-table-column type="index" width="50" v-if="index" />
    <!-- 复选框 -->
    <el-table-column type="selection" width="55" v-if="checkbox" />

    <template v-for="item in propList">
      <!-- 自定义文本 -->
      <el-table-column
        v-if="item.type === 'function'"
        :key="item.prop"
        v-bind="item"
      >
        <template #default="scope">
          <div v-html="item.callback && item.callback(scope.row)"></div>
        </template>
      </el-table-column>
      <!-- 插槽 -->
      <el-table-column
        v-if="item.type === 'slot'"
        :key="item.prop"
        v-bind="item"
      >
        <template #default="scope">
          <slot :name="item.slotName" :row="scope.row" :index="scope.$index" />
        </template>
      </el-table-column>
      <!-- 纯文本 -->
      <el-table-column v-else :key="item.prop" v-bind="item"></el-table-column>
    </template>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  // 表格数据
  data: {
    type: Array,
    default: () => []
  },
  // 表格配置项
  propList: {
    type: Array,
    default: () => []
  },
  // 复选框
  checkbox: {
    type: Boolean,
    default: false
  },
  // 索引号
  index: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['selection-change'])

//
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    url: '点我'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    url: '点我'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    url: '点我'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    url: '点我'
  }
]

/**
 * @description: 复选框选中回调
 */
const handleSelectionChange = (val) => {
  // 把数据传递给父组件
  emits('selection-change', val)
}
</script>

<style lang="scss" scoped></style>
