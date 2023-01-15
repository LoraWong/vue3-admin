// 全局属性配置

import dayjs from 'dayjs'
// 相对时间插件
import rt from 'dayjs/plugin/relativeTime'
// 中文语言包
import 'dayjs/locale/zh-cn'
import store from '@/store'
/**
 * 时间格式化
 * @param {*} val
 * @param {*} format
 */
export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  // 是否可以转换为数字
  // 如果isNaN函数的参数不是Number类型， isNaN函数会首先尝试将这个参数转换为数值，然后才会对转换后的结果是否是NaN进行判断
  // 将某些不能强制转换为数值的非数值转换为数值的时候，也会得到NaN
  if (!isNaN(val)) {
    // 转换为数字
    // parseInt(string, radix) 解析一个字符串并返回指定基数的十进制整数
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

/**
 * 相对时间格式化
 */
// 加载 相对时间 插件
dayjs.extend(rt)
function relativeTime(val) {
  if (!isNaN(val)) {
    // 转换为数字
    // parseInt(string, radix) 解析一个字符串并返回指定基数的十进制整数
    val = parseInt(val)
  }
  return dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
