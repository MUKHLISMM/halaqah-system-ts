
export interface SessionAccount {
    accessToken?:string
    accountId?:number
    email?:string
    userName?:string
    roleId?:number
}
export interface Account {
    id?: number
    userName?: string
    email?: string
    password?: string
    roleId?: number
    studentId?: any
    teacherId?: number
    adminId?: any
    createdAt?: string
    updatedAt?: string
    deletedAt?: any
    admin?: any
    student?: Student
    teacher?: Teacher
    facultyId?: number

  }
  export interface Student {
    id?: number
    firstName?: string
    lastName?: string
    address?: string
    birthDay?: string
    phoneNumber?: string
    lineAccount?: string
    facebookAccount?: any
    facultyId?: number
    majorId?: number
    createdAt?: string
    updatedAt?: string
    deletedAt?: any
  }
  export interface Teacher {
    id?: number
    firstName?: string
    lastName?: string
    address?: string
    birthDay?: string
    phoneNumber?: string
    lineAccount?: string
    facebookAccount?: any
    position?: string
    isAdmin?: any
    facultyId?: number
    majorId?: number
    createdAt?: string
    updatedAt?: string
    deletedAt?: any
  }