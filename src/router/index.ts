import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/IndexView.vue')
  },
  {
    path: '/student',
    component: () => import('@/views/student/IndexView.vue')
  },
  {
    path: '/teacher',
    component: () => import('@/views/teacher/IndexView.vue')
  },
  {
    path: '/admin',
    redirect: '/departmentmanage',
    component: () => import('@/views/admin/IndexView.vue'),
    children: [
      {
        path: '/departmentmanage',
        component: () => import('@/views/admin/DepartmentManage.vue')
      },
      {
        path: '/teachermanage',
        component: () => import('@/views/admin/TeacherManage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
