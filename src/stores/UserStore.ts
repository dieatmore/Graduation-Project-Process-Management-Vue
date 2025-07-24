import type { User } from '@/types'
import { shallowRef } from 'vue'

const UserS = shallowRef<User>()
const clear = () => (UserS.value = undefined)

const user = sessionStorage.getItem('user')

user && (UserS.value = JSON.parse(user))

const store = { UserS, clear }

export const useUserStore = () => store
