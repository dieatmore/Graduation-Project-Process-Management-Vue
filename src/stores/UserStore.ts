import type { User } from '@/types'
import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useUserStore = createGlobalState(() => {
  const user = ref<User>()

  const setUser = (userData: User) => {
    user.value = userData
  }

  return { user, setUser }
})
