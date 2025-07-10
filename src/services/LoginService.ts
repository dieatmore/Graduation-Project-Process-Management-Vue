import router from '@/router'
import { useUserStore } from '@/stores/UserStore'
import type { ResultVO, User } from '@/types'
import { Role } from '@/types'
import axios from 'axios'

export const loginService = async (user: User) => {
  // 封装的usePost只返回resp.data.data，不包含token
  const resp = await axios.post<ResultVO<User>>('login', user)
  const data = resp.data.data
  const token = resp.headers.token
  const role = resp.headers.role
  if (!data || !token || !role) {
    throw '登录错误'
  }
  sessionStorage.setItem('token', token)
  useUserStore().setUser(data)
  let path = ''
  switch (role) {
    case Role.ADMIN:
      path = '/admin'
      break
    case Role.STUDENT:
      path = '/student'
      break
    case Role.TEACHER:
      path = '/teacher'
      break
  }
  router.push(path)
}
