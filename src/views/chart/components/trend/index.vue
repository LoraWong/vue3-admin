<template>
  <el-card class="container">
    <el-row :gutter="32" v-if="chartTrendData.allAmount">
      <!-- 图表 -->
      <el-col :span="6">
        <trend-data-vue :data="chartTrendData" />
      </el-col>
      <!-- 数据 -->
      <el-col :span="18">
        <trend-chart-vue :data="chartTrendData" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import {} from 'vuex'
import {} from 'vue-router'
import trendDataVue from './trend-data.vue'
import trendChartVue from './trend-chart.vue'
import { getChartTrend } from '@/api/chart'
import { ref } from 'vue'

const chartTrendData = ref({})
const getChartTrendData = async () => {
  const res = await getChartTrend()
  chartTrendData.value = res
}

getChartTrendData()
</script>

<style lang="scss" scoped>
.container {
  height: 320px;
}
</style>
