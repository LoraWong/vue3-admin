// 主题变更

import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import formula from '@/constant/formula.json'
import axios from 'axios'

// 写入新样式到 style
/**
 * @param {*} elNewStyle element-plus 的新样式
 * @return {*}
 */
export const writeNewStyle = (elNewStyle) => {
  // 创建一个 style标签
  const style = document.createElement('style')
  // style标签中 放入 新的css样式
  style.innerText = elNewStyle
  // style标签 插入 head标签中
  document.head.appendChild(style)
}

// 根据主色值，生成最新的样式表
// generateNewStyle，在实现的过程中，需要安装两个工具类：
// rgb-hex：转换RGB(A)颜色为十六进制
// css-color-function：在CSS中提出的颜色函数的解析器和转换器
// 还需要写入一个 颜色转化计算器，根据主色值生成多个色值（ 创建 constants/formula.json
/**
 * @param {*} primaryColor 选中的主色值
 * @return {*} 主色值替换好后的 element -plus 样式表
 */
export const generateNewStyle = async (primaryColor) => {
  // 根据主色生成色值表
  const colors = generateColors(primaryColor)
  // console.log(colors)
  // 获取 element -plus 的当前默认样式表，把需要替换的色值打上标记
  let cssText = await getOriginalStyle() // 此函数返回一个promise
  // 遍历 生成的色值表，在默认样式表中进行替换
  Object.keys(colors).forEach((key) => {
    const value = colors[key]
    // 正则表达式中\s匹配任何空白字符，包括空格、制表符、换页符等
    cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + value)
  })
  return cssText
}

// 根据主色生成色值表
/**
 * @param {*} primary 选中的主色值
 * @return {*} colors 新生成的色值表
 */
export const generateColors = (primary) => {
  if (!primary) return
  const colors = {
    primary
  }
  // Object.keys(obj) 获取当前对象的所有key值，返回一个数组
  Object.keys(formula).forEach((key) => {
    // 替换 主色值 (将 formula文件中的 primary 替换为 选中的颜色)
    // replace() 方法 替换字符串或正则, 返回一个新的字符串；在进行全局的搜索替换时，正则表达式需包含 g 标志
    const value = formula[key].replace(/primary/g, primary)
    // colors[key] = value  // 不能直接赋值，要转换RGB(A)颜色为十六进制（rgbHex工具、css-color-function工具
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

// 获取 element -plus 的当前默认样式表, 把需要替换的色值打上标记
export const getOriginalStyle = async () => {
  // element -plus的css文件， https://unpkg.com/element-plus@2.2.26/dist/index.css
  // 为了匹配当前 element -plus 版本号，需要动态获取 版本号字段
  // 获取 当前 element -plus 版本号
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  // 发起一个 GET 请求 (默认请求方式) axios('/user/12345');
  const { data } = await axios(url)
  // console.log(data)
  return getStyleTemplate(data)
}

// 把element -plus 样式表中 需要替换的色值打上标记
const getStyleTemplate = (data) => {
  // element-plus 默认色值(需要替换的色值)；如， #3a8ee6 替换为 shade-1
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#337ecc': 'primary', // 新增 --el-button-active-bg-color
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    // 正则全局替换, 如 #3a8ee6 替换为 shade-1
    // new RegExp('ab+c', 'i'); // 创建一个正则表达式 /ab+c/i
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
