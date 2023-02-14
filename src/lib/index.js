// 全局注册组件

export default {
  install(app) {
    // 获取当前路径下所有 index.vue文件
    const requireComponent = require.context('@/lib', true, /index.vue$/)
    // components.keys() // 文件路径

    requireComponent.keys().forEach((path) => {
      // 截取组件名
      const componentName = 'm-' + path.replace('./', '').split('/')[0]
      // 获取组件配置
      const componentConfig = requireComponent(path)
      // 注册为全局组件
      app.component(componentName, componentConfig.default || componentConfig)
    })
  }
}
