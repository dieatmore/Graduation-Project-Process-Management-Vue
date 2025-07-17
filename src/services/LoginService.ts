import axios from '@/axios'
import { useMessage } from '@/components/message'
import { useUserStore } from '@/stores/UserStore'
import type { ResultVO, User } from '@/types'

const message = useMessage()

export const loginService = async (user: User) => {
  // 封装的usePost只返回resp.data.data，不包含token
  const resp = await axios.post<ResultVO<User>>('login', user)
  const data = resp.data.data
  const token = resp.headers.token
  const role = resp.headers.role
  if (!data || !token || !role) {
    message.error('登录错误')
  }
  sessionStorage.setItem('token', token)
  useUserStore().setUser(data)
  return resp
}
