import axios from '@/axios'
import { useMessage } from '@/components/message'
import { useUserStore } from '@/stores/UserStore'
import { Role, Role2, type ResultVO, type User } from '@/types'

const message = useMessage()
const userStore = useUserStore()

export const loginService = async (user: User) => {
  // 封装的usePost只返回resp.data.data，不包含token
  try {
    const resp = await axios.post<ResultVO<User>>('login', user)
    const data = resp.data.data
    const token = resp.headers.token
    let role = resp.headers.role
    if (!data || !token || !role) {
      message.error('登录错误')
    }
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('user', JSON.stringify(data))
    userStore.UserS.value = data
    let path = null
    if (role == Role.ADMIN) {
      path = '/admin'
      role = Role2.ADMIN
    } else if (role == Role.STUDENT) {
      path = '/student'
      role = Role2.STUDENT
    } else if (role == Role.TEACHER) {
      path = '/teacher'
      role = Role2.TEACHER
    }
    sessionStorage.setItem('role', role)
    return path
  } catch (err: any) {
    message.error(err)
  }
}
