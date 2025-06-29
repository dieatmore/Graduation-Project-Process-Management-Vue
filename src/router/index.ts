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
    component: () => import('@/views/admin/IndexView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
