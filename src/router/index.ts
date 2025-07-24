import { Role2 } from '@/types'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/IndexView.vue')
  },
  {
    path: '/student',
    component: () => import('@/views/student/IndexView.vue'),
    meta: { role: Role2.STUDENT }
  },
  {
    path: '/teacher',
    component: () => import('@/views/teacher/IndexView.vue'),
    meta: { role: Role2.TEACHER },
    children: [
      {
        path: '/userinfo',
        component: () => import('@/views/teacher/UserInfo.vue')
      }
    ]
  },
  {
    path: '/admin',
    redirect: '/departmentmanage',
    component: () => import('@/views/admin/IndexView.vue'),
    meta: { role: Role2.ADMIN },
    children: [
      {
        path: '/departmentmanage',
        component: () => import('@/views/admin/DepartmentManage.vue')
      },
      {
        path: '/teachermanage',
        component: () => import('@/views/admin/TeacherManage.vue')
      },
      {
        path: '/teacherfile',
        component: () => import('@/views/admin/TeacherFile.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 添加全局前置守卫
router.beforeEach(to => {
  // 排除，没有声明角色权限的路由
  if (!to.meta.role) {
    return true
  }
  if (to.meta.role == sessionStorage.getItem('role')) {
    return true
  }
  sessionStorage.clear()
  return '/login'
})

export default router
