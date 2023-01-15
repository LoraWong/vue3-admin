// token时效处理
import { getItem, setItem } from '@/utils/storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'

// 获取时间戳（登录时间
export const getTimestamp = () => {
  return getItem(TIME_STAMP)
}
// 设置时间戳（登录时间
export const setTimestamp = () => {
  setItem(TIME_STAMP, Date.now())
}
// 是否超时
// 当前时间 对比 登录时间 ，看是否超过了 时效时长
export const isCheckTimeout = () => {
  // 当前时间
  const currentTime = Date.now()
  // 登录时间
  const timeStamp = getTimestamp()
  // 判断是否超时
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
