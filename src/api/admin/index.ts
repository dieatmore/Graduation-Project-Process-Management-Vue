import type { Department, ResultVO } from '@/types'
import service from '@/utils/request'
import { useAxios } from '@vueuse/integrations/useAxios'

// 获取专业列表
export const getDepartmentList = () => {
  return useAxios<ResultVO<Department[]>>(
    'admin/departments',
    {
      method: 'GET'
    },
    service,
    {
      immediate: true
    }
  )
}

// 搜索专业
export const getSearchDepartment = (departmentName: string) => {
  return useAxios<ResultVO<Department[]>>(
    `admin/search/${departmentName}`,
    {
      method: 'GET'
    },
    service,
    {
      immediate: false
    }
  )
}

// 添加专业
export const addDepartment = (params: Department) => {
  return useAxios<ResultVO<Department>>(
    'admin/departments',
    {
      method: 'POST',
      data: {
        name: params.name
      }
    },
    service,
    {
      immediate: false
    }
  )
}

// 删除专业
export const deleteDepartment = (departmentId: string) => {
  return useAxios<ResultVO<Department[]>>(
    `admin/departments/${departmentId}`,
    {
      method: 'DELETE'
    },
    service,
    {
      immediate: false
    }
  )
}
