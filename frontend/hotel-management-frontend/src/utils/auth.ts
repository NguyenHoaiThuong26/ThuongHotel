import { API_BASE_URL } from "../configuration/configuration"

export interface RoleResponse {
  roleId: string
  roleName: string
}

export interface UserInfo {
  userId: string
  username: string
  email: string
  roles: RoleResponse[]
  [key: string]: unknown
}

export async function getUserRoles(): Promise<string[]> {
  const token = localStorage.getItem("token")
  if (!token) {
    return []
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/myInfo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      const roles = data.result?.roles || []
      // Convert RoleResponse[] to string[]
      return roles.map((r: RoleResponse) => r.roleName)
    }
    return []
  } catch (error) {
    console.error("Error fetching user roles", error)
    return []
  }
}

export async function getUserInfo(): Promise<UserInfo | null> {
  const token = localStorage.getItem("token")
  if (!token) {
    return null
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/myInfo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      return data.result || null
    }
    return null
  } catch (error) {
    console.error("Error fetching user info", error)
    return null
  }
}

export function hasRole(roles: string[], role: string): boolean {
  return roles.includes(role)
}

export async function isAdmin(): Promise<boolean> {
  const roles = await getUserRoles()
  return hasRole(roles, "ADMIN")
}

export async function isStaff(): Promise<boolean> {
  const roles = await getUserRoles()
  return hasRole(roles, "STAFF")
}

export function hasRoleSync(roles: string[] | RoleResponse[], role: string): boolean {
  if (!roles || roles.length === 0) return false

  // Handle both string[] and RoleResponse[]
  if (typeof roles[0] === 'string') {
    return (roles as string[]).includes(role)
  } else {
    return (roles as RoleResponse[]).some(r => r.roleName === role)
  }
}

export function isAdminSync(roles: string[] | RoleResponse[]): boolean {
  return hasRoleSync(roles, "ADMIN")
}

export function isStaffSync(roles: string[] | RoleResponse[]): boolean {
  return hasRoleSync(roles, "STAFF")
}

export function isReceptionistSync(roles: string[] | RoleResponse[]): boolean {
  return hasRoleSync(roles, "RECEPTIONIST")
}
