import { ElNotification } from 'element-plus'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 消息提示
export function toast(
  message,
  type = 'success',
  dangerouslyUseHTMLString = true
) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000
  })
}

// 显示全屏loading
export function showFullLoading() {
  nprogress.start()
}

// 隐藏全屏loading
export function hideFullLoading() {
  nprogress.done()
}
