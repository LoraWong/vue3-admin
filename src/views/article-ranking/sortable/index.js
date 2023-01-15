// sortable 初始化
import Sortable from 'sortablejs'
import { ref } from 'vue'
import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

// 表格元素实例
export const tableRef = ref(null)

/**
 * Sortable初始化
 * @param {*} tableData  表格数据源
 * @param {*} cb 回调函数（重新发请求获取 tableData 数据 进行展示
 */
export const initSortable = (tableData, cb) => {
  // 要拖拽的元素
  const el = tableRef.value.$el.querySelector('.el-table__body > tbody')
  // debugger
  // 配置对象
  Sortable.create(el, {
    animation: 300,
    // 拖拽时的类名
    ghostClass: 'sortable-ghost',
    // 拖拽结束的回调
    async onEnd(event) {
      const { newIndex, oldIndex } = event // 元素索引值
      // 发请求，修改排名
      await articleSort({
        initRanking: tableData.value[oldIndex].ranking, // 根据索引号获取对应数据
        finalRanking: tableData.value[newIndex].ranking
      })
      ElMessage.success({
        message: i18n.global.t('msg.article.sortSuccess'),
        type: 'success'
      })
      // 虽然已经 从新获取数据，但是 element table 无法重新渲染（监测不到数据变化），所以页面数据还是旧的， 需要手动激活
      // 先清空 数据
      tableData.value = []
      // 执行回调, 重新发请求获取 tableData 数据 进行展示
      cb && cb()
    }
  })
}
