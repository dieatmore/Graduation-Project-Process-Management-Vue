import { useGet, usePatch } from '@/axios'
import { useMessage } from '@/components/message'
import { useUserStore } from '@/stores/UserStore'
import type { User } from '@/types'

const message = useMessage()
const userStore = useUserStore()

// 获取专业列表
export const departmentNameService = async () => {
  const data = await useGet('user/departmentname')
  return data as unknown as string
}

// 修改密码
export const updatePasswordService = async (user: User) => {
  try {
    await usePatch('user/password', user)
    let path = null
    path = '/login'
    return path
  } catch (err: any) {
    message.error(err)
  }
}

// 修改详细信息
export const updateDescriptionService = async (user: User) => {
  const data = await usePatch('user/description', user)
  userStore.UserS.value = data as unknown as User
  return userStore.UserS
}
