import { useUserStore } from '@/stores/UserStore'
import type { ResultVO, User } from '@/types'
import service from '@/utils/request'
import { useAxios } from '@vueuse/integrations/useAxios'

// 登录请求
export const login = (params: User) => {
  return useAxios<ResultVO<User>>(
    'login',
    {
      method: 'POST',
      data: {
        number: params.number,
        password: params.password
      },
      // 启用transformResponse，Axios将最原始的响应数据直接传递给处理函数,需自行完成解析步骤
      transformResponse: (res, headers) => {
        const data = JSON.parse(res)
        if (data.code == 200) {
          localStorage.setItem('token', headers.token)
          useUserStore().setUser(data.data)
        }
        return data
      }
    },
    service,
    {
      immediate: false
    }
  )
}
