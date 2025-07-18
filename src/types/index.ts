// 后端role值
export enum Role {
  STUDENT = 'uWq2',
  TEACHER = 'bU3e',
  ADMIN = 'Qe1p'
}

// 前端role值
export enum Role2 {
  STUDENT = 'bY81',
  TEACHER = 'Viq9',
  ADMIN = 'Lbc1'
}

export interface ResultVO<T> {
  code: number
  message?: string
  data: T
}

export interface User {
  id?: string
  name?: string
  number?: string
  password?: string
  groupNumber?: number
  role?: string
  student?: string
  teacher?: string
  departmentId?: string
  insertTime?: string
  updateTime?: string
}

// export interface Student {
//   teacherId?: string
//   teacherName?: string
//   queueNumber?: number
//   projectTitle?: string
// }

// export interface Teacher {
//   total?: number
//   A?: number
//   B?: number
//   C?: number
// }

export interface Department {
  id?: string
  name?: string
  updateTime?: string
  insertTime?: string
}
