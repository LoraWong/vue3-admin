// 是否为外部资源
export function isExternal(path) {
  // 正则验证 资源路径
  return /^(https?:|mailto:|tel:)/.test(path)
}
