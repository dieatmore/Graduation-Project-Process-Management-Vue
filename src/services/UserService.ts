import { useGet } from '@/axios'

// 获取专业列表
export const departmentNameService = async () => {
  const data = await useGet('user/departmentname')
  return data as unknown as string
}
