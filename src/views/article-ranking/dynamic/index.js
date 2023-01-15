// 处理 动态表格列数据
import DynamicData from './DynamicData'
import { ref, watch } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
/**
 * 动态列 数据源（v-for 动态渲染 el-table-column
 */
export const dynamicData = ref(DynamicData())

// 监听语言
watchSwitchLang(() => {
  dynamicData.value = DynamicData()
})

/**
 *被勾选的列
 */
export const selectDynamicLabel = ref([])
// 默认全部勾选
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLabel()

/**
 * table 列（勾选后展示的列数据
 */
export const tableColumns = ref([])
// 监听 被勾选的列
watch(
  selectDynamicLabel,
  (val) => {
    // 清除以前的数据
    tableColumns.value = []
    // 根据 勾选的列 筛选出需要展示的列数据
    const selectData = dynamicData.value.filter((item) =>
      val.includes(item.label)
    )
    // 浅拷贝
    tableColumns.value.push(...selectData)
  },
  { immediate: true }
)
