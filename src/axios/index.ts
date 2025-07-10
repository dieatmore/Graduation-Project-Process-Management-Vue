import type { ResultVO } from '@/types'
import axios from 'axios'

axios.defaults.baseURL = '/api/'

// Axios拦截器是全局配置，仅初始化一次，所以外部
const tokenStorage = localStorage.getItem('token')

// Axios请求配置：注入token
axios.interceptors.request.use(
  req => {
    const token = tokenStorage
    if (token && req.headers) {
      req.headers.token = token
    }
    return req
  },
  error => {
    return Promise.reject(error)
  }
)

// Axios响应配置
axios.interceptors.response.use(
  resp => {
    return resp
  },
  error => {
    return Promise.reject(error.message)
  }
)

// 封装axios请求方法
export const useGet = async <T>(url: string) => {
  const resp = await axios.get<ResultVO<T>>(url)
  return resp.data.data
}

export const usePost = async <T>(url: string, data: unknown) => {
  const resp = await axios.post<ResultVO<T>>(url, data)
  return resp.data.data
}

export const usePut = async <T>(url: string) => {
  const resp = await axios.put<ResultVO<T>>(url)
  return resp.data.data
}

export const usePatch = async <T>(url: string, data: unknown) => {
  const resp = await axios.patch<ResultVO<T>>(url, data)
  return resp.data.data
}

export const useDelete = async <T>(url: string) => {
  const resp = await axios.delete<ResultVO<T>>(url)
  return resp.data.data
}

export default axios
