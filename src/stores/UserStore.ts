import type { User } from '@/types'
import { shallowRef } from 'vue'

const UserS = shallowRef<User>()
const clear = () => (UserS.value = undefined)

// 持久存储会话方法
const setUser = (user: User) => {
  sessionStorage.setItem('user', JSON.stringify(user))
}

const user = sessionStorage.getItem('user')

user && (UserS.value = JSON.parse(user))

const store = { UserS, clear, setUser }

export const useUserStore = () => store
