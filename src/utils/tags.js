// tagsView

import { generateTitle } from '@/utils/i18n'

// 路由白名单
const witheLst = ['/login', '/import', '404', '401']

// 哪些路由需要被保存
export function isTags(path) {
  // return witheLst.indexOf(path) === -1
  return !witheLst.includes(path)
}

/**
 * 生成title (有些路由没有 title，但需要出现在 tags)
 * @return {*}
 */
export const getTitle = (route) => {
  let title = ''
  if (route.meta && route.meta.title) {
    // i18n处理
    title = generateTitle(route.meta.title)
  } else {
    // 没有 title，但需要出现在 tags，让路径的最后一个字段 作为 title
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  }
  return title
}
