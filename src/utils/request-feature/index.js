import axios from 'axios'
import { showFullLoading, hideFullLoading } from './util'
import { toast } from '@/utils/message'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_FEATURE_API
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 进度条开始
    showFullLoading()
    // 往header头自动添加token
    const token = store.state.feature.featureToken
    if (token) {
      config.headers.token = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 进度条结束
    hideFullLoading()
    // 对响应数据做点什么
    return response.request.responseType === 'blob'
      ? response.data
      : response.data.data
  },
  function (error) {
    const msg = error.response.data.msg || '请求失败'

    if (msg === '非法token，请先登录！') {
      // bug: 无法返回登录页
      // router.push('/login')
    }

    toast(msg, 'error')
    // 进度条结束
    hideFullLoading()
    return Promise.reject(error)
  }
)

export default service
