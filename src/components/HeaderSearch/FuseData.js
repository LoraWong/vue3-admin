// 搜索数据源 处理
import path from 'path'
import i18n from '@/i18n'
/**
 * 筛选出可供搜索的路由对象
 * @param routes 路由表
 * @param basePath 基础路径，默认为 /
 * @param prefixTitle 父路由的title
 */

export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  let result = []
  // 遍历数组
  for (const route of routes) {
    // 创建 包含 title 和 path 的item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
    // 动态路由不允许被搜索（路径中 有 :冒号
    // 匹配动态路由的正则
    // exec() 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null
    const re = /.*\/:.*/
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      // 搜索结果国际化处理
      const i18ntitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18ntitle]
      if (!result.find((item) => item.path === data.path)) {
        result.push(data)
      }
    }
    // 存在 children 时，迭代调用
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        result = [...result, ...tempRoutes]
      }
    }
  }
  return result
}
