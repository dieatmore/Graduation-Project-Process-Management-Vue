import { useDelete, useGet, usePost } from '@/axios'
import { useMessage } from '@/components/message'
import { useDepartmentStore } from '@/stores/DepartmentStore'
import type { Department, User } from '@/types'

const message = useMessage()

const departmentStore = useDepartmentStore()

// 获取专业列表
export const departmentListService = async () => {
  if (departmentStore.departmentsS.value?.length) return departmentStore.departmentsS
  const data = await useGet('admin/departments')
  departmentStore.departmentsS.value = data as unknown as Department[]
  return departmentStore.departmentsS
}

// 搜索专业
export const searchDepartmentService = async (departmentName: string) => {
  return (await useGet(`admin/search/${departmentName}`)) as Department[]
}

// 添加专业
export const addDepartmentService = async (params: Department) => {
  const data = await usePost('admin/departments', params)
  departmentStore.departmentsS.value = data as unknown as Department[]
  return departmentStore.departmentsS
}

// 删除专业
export const deleteDepartmentService = async (departmentId: string) => {
  const data = await useDelete(`admin/departments/${departmentId}`)
  departmentStore.departmentsS.value = data as unknown as Department[]
  return departmentStore.departmentsS
}

// 导入教师
export const addTeacherService = async (teachers: User[], departmentId: string) => {
  teachers.forEach(item => {
    item.teacher = JSON.stringify(item.teacher)
  })
  const resp = await usePost(`admin/teachers/${departmentId}`, teachers)
  return resp
}

// export const addTeachers = (params: any, departmentId: string) => {
//   return useAxios<ResultVO<User>>(
//     `admin/teachers/${departmentId}`,
//     {
//       method: 'POST',
//       data: params.map((item: any) => ({
//         name: item.name,
//         number: item.number,
//         password: ''
//       }))
//     },
//     service,
//     {
//       immediate: false
//     }
//   )
// }
