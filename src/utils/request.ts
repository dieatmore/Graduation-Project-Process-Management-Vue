import { useStorage } from '@vueuse/core'
import axios from 'axios'

const service = axios.create({
  baseURL: '/api/'
})

// Axios拦截器是全局配置，仅初始化一次，所以外部
const tokenStorage = useStorage('token', '', localStorage)

// 每次请求注入token
service.interceptors.request.use(
  req => {
    const token = tokenStorage.value
    if (token && req.headers) {
      req.headers.token = token
    }
    return req
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
