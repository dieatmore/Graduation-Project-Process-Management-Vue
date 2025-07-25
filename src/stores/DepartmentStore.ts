import type { Department } from '@/types'
import { shallowRef } from 'vue'

const departmentsS = shallowRef<Department[]>()
const clear = () => (departmentsS.value = undefined)
const store = { departmentsS, clear }

export const useDepartmentStore = () => store
