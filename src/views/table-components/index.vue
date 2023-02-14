<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="User" name="first">
        <TableVue
          :propList="propList"
          index
          checkbox
          @selection-change="handleSelectionChange"
        >
          <template #action="{ row, index }">
            {{ (row, index) }}
            <el-button type="primary">编辑</el-button>
          </template>
        </TableVue>
      </el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import TableVue from '@/components/Table/index.vue'
const activeName = ref('first')

const propList = [
  {
    label: 'Date',
    prop: 'date'
  },
  {
    label: 'Name',
    prop: 'name'
  },
  {
    label: 'Address',
    prop: 'address'
  },
  {
    label: 'URL',
    prop: 'url',
    type: 'function',
    callback: function (data) {
      return `<a href="#">${data.url}</a>`
    }
  },
  {
    label: '操作',
    prop: 'action',
    type: 'slot',
    slotName: 'action'
  }
]

const handleSelectionChange = (val) => {
  console.log(val)
}
</script>

<style lang="scss" scoped></style>
