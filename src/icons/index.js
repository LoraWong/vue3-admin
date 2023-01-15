// 导入内部 svg图标
// SvgIcon全局注册

import SvgIcon from '@/components/SvgIcon'

//  通过 require.context() 函数来创建自己的 context
// 给这个函数传入三个参数：一个要搜索的目录，一个标记表示是否还搜索其子目录， 以及一个匹配文件的正则表达式。
// \ 这是引用符，用来将这里列出的这些元字符当作普通的字符来进行匹配，\.用来匹配点字符，而不是任何字符的通配符
const svgRequire = require.context('./svg', false, /\.svg$/)

// 此函数会返回一个（require）函数，可以接收一个参数：request, 用于 require的导入
// 此导出函数有三个属性：resolve, keys, id；可以通过 require.keys() 获取到所有的 svg 图标
// console.log(svgRequire.keys()) // 返回一个数组，包含所有 svg 图标
// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

// 注册为全局组件
export default (app) => {
  app.component('svg-icon', SvgIcon)
}
