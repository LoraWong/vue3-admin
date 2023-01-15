// 动态表格 列数据源

import i18n from '@/i18n'

const t = i18n.global.t

// 为什么不直接导出数组？而导出一个函数
// 当语言发生变化时，此时需要调用函数才能重新获取 列数据（t函数被调用）， 从而更换语言
// 如果暴露一个数组，那么 label 的值在导出时就已经决定了，无法再更改
export default () => [
  {
    label: t('msg.article.ranking'),
    prop: 'ranking'
  },
  {
    label: t('msg.article.title'),
    prop: 'title'
  },
  {
    label: t('msg.article.author'),
    prop: 'author'
  },
  {
    label: t('msg.article.publicDate'),
    prop: 'publicDate'
  },
  {
    label: t('msg.article.desc'),
    prop: 'desc'
  },
  {
    label: t('msg.article.action'),
    prop: 'action'
  }
]
