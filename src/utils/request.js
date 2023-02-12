// axios二次封装

import axios from 'axios'
// 导入 element 对应消息模块
import { ElMessage } from 'element-plus'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  // 在发请求之前做些什么
  // 成功
  (config) => {
    // 请求头
    config.headers.icode = '38A93C7D63AB5AEE'
    // 因为获取用户信息需要对应的 token ，所以我们可以利用 axios 的 请求拦截器 对 token 进行统一注入
    if (store.getters.token) {
      // 判断 token是否超时
      if (isCheckTimeout()) {
        // 超时，退出登录
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    //  接口国际化
    config.headers['Accept-Language'] = store.getters.language
    return config
  },
  // 失败
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  // 在发请求之后做些什么
  // 请求成功
  (response) => {
    const { success, message, data } = response.data
    // 判断当前请求业务是否成功
    if (success) {
      // 业务成功，返回解析后的数据
      return data
    } else {
      // 业务失败 （请求成功，但业务失败），消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败
  (error) => {
    // 判断token是否失效
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // 退出登录
      store.dispatch('user/logout')
    }
    // 消息提示
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
