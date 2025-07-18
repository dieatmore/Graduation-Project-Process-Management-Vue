import type { User } from '@/types'
import { shallowRef } from 'vue'

const UserS = shallowRef<User>()
const clear = () => (UserS.value = undefined)
const store = { UserS, clear }

export const useUserStore = () => store
