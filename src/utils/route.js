// tag:路由表处理
import path from 'path'

// 获取所有子集路由(注意此方法 不适用于 二级以上路由，如果路由层级很多，需要递归处理)
export const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children) // route.children 是一个数组
      // 递归
      // result.push(...getChildrenRoutes(route.children))
    }
  })
  return result
}

// 处理脱离层级的路由
export const filterRoutes = (routes) => {
  // 获取所有子路由
  const childrenRoutes = getChildrenRoutes(routes)
  console.log(
    '🚀 ~ file: route.js:18 ~ filterRoutes ~ childrenRoutes',
    childrenRoutes
  )
  // 根据子路由进行查重
  // filter() 利用所有使得 callbackFn 返回 true 或等价于 true 的值的元素创建一个新数组
  // 被定义为假值以外的任何值都为真值。（即所有除 false、0、-0、0n、""、null、undefined 和 NaN 以外的皆为真值）
  return routes.filter((route) => {
    // 在childrenRoutes中进行查重，剔除所有重复的route

    // find() 方法返回数组中满足提供的测试函数的第一个元素的值，找不到就返回undefined
    // !写在函数前，是对函数的返回值进行取反操作：undefined取反为true、真值（如，1）取反为false
    // 返回一个布尔值
    return !childrenRoutes.find((childrenRoute) => {
      // 是否重复
      return childrenRoute.path === route.path // 返回对应元素 或 undefined
    })
  })
}

// 判断是否为空值
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

// 根据 filterRoutes() 数据，返回对应的menu规则数据
export const generateMenus = (routes, basePath = '') => {
  const result = []
  // 不满足 meta && meta.title && meta.icon 的数据要剔除
  routes.forEach((route) => {
    // 情况1:不存在 children && 不存在 meta，不需要处理，则return(结束当前循环，继续下一次循环)
    if (isNull(route.children) && isNull(route.meta)) return
    // 情况2:存在 children，不存在 meta，是父节点，需要解析，则递归，继续判断 children 是否要处理
    if (isNull(route.meta) && !isNull(route.children)) {
      result.push(...generateMenus(route.children))
      // generateMenus(route.children) 返回一个数组
      return // 结束当前循环，继续下一次循环
    }
    // 情况3: 不存在children，存在 meta || 存在children，存在 meta ，需要处理
    // 考虑可能存在的情况：合并path（如果children的path不带有基础路径如 '/profile'；那么要合并成 'user/profile'，也就是，要加上基础路径
    // 借助 node里的 path 进行 路由的path合并
    const routePath = path.resolve(basePath, route.path)
    // 考虑可能存在的情况：因为路由分离（常量、异步），可能会有路由重复
    // 判断 该路由 是否已经 处理过
    let routeWithMeta = result.find((item) => item.path === routePath)

    // 如果 routeWithMeta 不存在，说明 该route 还没有被加入 result 数组中，需要构建一个新的 route对象，把合并path放进去，把再它追加到 result数组中
    if (!routeWithMeta) {
      // 深拷贝？
      routeWithMeta = {
        ...route, // route是一个对象
        path: routePath, // 相同属性会自动覆盖，相当于给path这个属性重新赋值
        children: []
      }

      // meta.title && meta.icon 必须全部存在，才会在menu中展示
      if (routeWithMeta.meta.title && routeWithMeta.meta.icon) {
        // 把 route 追加到 result 数组中
        result.push(routeWithMeta)
      }
    }

    // 存在children，(存在 meta
    if (route.children) {
      // 是父节点，需要解析，则递归，继续判断 children 是否要处理
      // 把 父节点 的路径（处理过的合并path）传入，作为基础路径
      routeWithMeta.children.push(
        ...generateMenus(route.children, routeWithMeta.path)
      ) // generateMenus返回一个数组
    }
  })
  return result
}
