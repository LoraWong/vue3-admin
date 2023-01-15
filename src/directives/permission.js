import store from '@/store'

function checkPermission(el, binding) {
  // value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2
  const { value } = binding
  // 获取当前用户的功能权限数据
  const points = store.getters.userInfo.permission.points
  // value必须是一个数组（一个按钮可能对应多个功能
  if (value && value instanceof Array) {
    // some() 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。
    // includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false
    // 匹配指令
    const hasPermission = value.some((item) => points.includes(item)) // 布尔值
    // 匹配失败
    if (!hasPermission) {
      // 让父节点 删除 该 Dom元素
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(
      'v-permission value is required an Array , like as ["admin", "editor", ...]'
    )
  }
}

export default {
  // 绑定元素的父组件 被 挂载之后调用
  // el：指令绑定到的元素
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding) {
    checkPermission(el, binding)
  }
}
