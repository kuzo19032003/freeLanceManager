
export interface User {
  id: string
  email: string
  fullName: string
  isActive: boolean

  createdAt: string
  updatedAt: string
  deletedAt: string | null
}
