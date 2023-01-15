import Sortable from 'sortablejs' // eslint-disable-line
import { ref } from 'vue'
import store from '@/store'

/**
 * @description: tag拖拽功能
 */

export const tagsWrapperTarget = ref(null)
/**
 * @description: sortable 初始化
 */
export const initSortable = () => {
  const el = tagsWrapperTarget.value.querySelector('.el-scrollbar__view')

  const sortable = Sortable.create(el, {
    animation: 300,
    onEnd(event) {
      // 修改数据源
      const { oldIndex, newIndex } = event
      // console.log(oldIndex, newIndex)
      store.commit('app/moveTags', { oldIndex, newIndex })
    }
  })
}
