import { useGet } from '@/axios'
import type { Department } from '@/types'
import type { Ref } from 'vue'

// 获取专业列表
export const departmentListService = async () => {
  const data = await useGet('admin/departments')
  return data as unknown as Ref<Department[]>
}
