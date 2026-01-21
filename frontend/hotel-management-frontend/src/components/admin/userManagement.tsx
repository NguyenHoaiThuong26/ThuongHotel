"use client"

import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Shield, User as UserIcon } from "lucide-react"
import { API_BASE_URL } from "../../configuration/configuration"
import toast from "react-hot-toast"

interface Role {
  roleId: string;
  roleName: string;
}

interface RoleEntity {
  roleId: string;
  roleName: string;
}

interface User {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Role[];
  dob: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [availableRoles, setAvailableRoles] = useState<RoleEntity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${API_BASE_URL}/roles`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setAvailableRoles(data.result || [])
      }
    } catch (error) {
      console.error("Error fetching roles", error)
    }
  }

  const fetchUsers = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setUsers(data.result || [])
      } else {
        toast.error("Không thể tải danh sách người dùng")
      }
    } catch (error) {
      console.error("Error fetching users", error)
      toast.error("Lỗi kết nối")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateUser = async (userId: string, selectedRoleIds: string[]) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          roles: selectedRoleIds
        })
      })
      if (response.ok) {
        toast.success("Đã cập nhật vai trò người dùng")
        fetchUsers() // Refresh user list
        setShowModal(false)
        setEditingUser(null)
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Không thể cập nhật người dùng")
      }
    } catch (error) {
      console.error("Error updating user", error)
      toast.error("Lỗi kết nối")
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return

    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        toast.success("Đã xóa người dùng")
        setUsers(users.filter(u => u.userId !== userId))
      } else {
        toast.error("Không thể xóa người dùng")
      }
    } catch (error) {
      console.error("Error deleting user", error)
      toast.error("Lỗi kết nối")
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.firstName && user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesRole = roleFilter === "all" || user.roles.some(r => r.roleName === roleFilter)

    return matchesSearch && matchesRole
  })



  const getRoleBadge = (roleName: string) => {
    switch (roleName) {
      case 'ADMIN': return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800"><Shield size={12} /> Admin</span>
      case 'RECEPTIONIST': return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-yellow-100 text-yellow-800"><Shield size={12} /> Receptionist</span>
      case 'USER': return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800"><UserIcon size={12} /> User</span>;
      default: return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-800">{roleName}</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Quản lý người dùng</h1>
        <button
          onClick={() => {
            toast.error("Chức năng tạo người dùng mới chưa được triển khai")
          }}
          className="flex items-center gap-2 bg-slate-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
          disabled
        >
          <Plus size={20} />
          Thêm người dùng
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-md">
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Tìm kiếm</label>
          <input
            type="text"
            placeholder="Tìm theo username hoặc tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Vai trò</label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="ADMIN">Quản trị viên (ADMIN)</option>
            <option value="RECEPTIONIST">Lễ tân (RECEPTIONIST)</option>
            <option value="USER">Người dùng (USER)</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Kết quả</label>
          <div className="mt-1 px-3 py-2 bg-slate-50 rounded-lg text-slate-700 font-medium">
            {filteredUsers.length} người dùng
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500">Đang tải dữ liệu...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-slate-500">Không tìm thấy người dùng.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">User ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Username</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Họ và Tên</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Vai trò</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 whitespace-nowrap">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.userId} className="border-b border-slate-200 hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm text-slate-500 font-mono text-xs">{user.userId}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{user.username}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{user.lastName} {user.firstName}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {user.roles.map(r => getRoleBadge(r.roleName))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingUser(user)
                            setShowModal(true)
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                          title="Sửa vai trò"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.userId)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-slate-600">Tổng số người dùng</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{filteredUsers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-slate-600">Quản trị viên (Admin)</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {filteredUsers.filter(u => u.roles.some(r => r.roleName === 'ADMIN')).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-slate-600">Người dùng (User)</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {filteredUsers.filter(u => !u.roles.some(r => r.roleName === 'ADMIN')).length}
          </p>
        </div>
      </div>

      {/* Role Update Modal */}
      {showModal && editingUser && (
        <RoleUpdateModal
          user={editingUser}
          availableRoles={availableRoles}
          onSave={handleUpdateUser}
          onClose={() => {
            setShowModal(false)
            setEditingUser(null)
          }}
        />
      )}
    </div>
  )
}

// Simple Role Update Modal Component
function RoleUpdateModal({
  user,
  availableRoles,
  onSave,
  onClose
}: {
  user: User
  availableRoles: RoleEntity[]
  onSave: (userId: string, roleIds: string[]) => void
  onClose: () => void
}) {
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>(
    availableRoles
      .filter(role => user.roles.some(r => r.roleName === role.roleName))
      .map(role => role.roleId)
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedRoleIds.length === 0) {
      toast.error("Vui lòng chọn ít nhất một vai trò")
      return
    }
    onSave(user.userId, selectedRoleIds)
  }

  const toggleRole = (roleId: string) => {
    setSelectedRoleIds(prev =>
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-slate-900">Cập nhật vai trò</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <span className="text-2xl">×</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <p className="text-sm text-slate-600">Username: <span className="font-semibold text-slate-900">{user.username}</span></p>
            <p className="text-sm text-slate-600">Họ tên: <span className="font-semibold text-slate-900">{user.lastName} {user.firstName}</span></p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Chọn vai trò:</label>
            <div className="space-y-2">
              {availableRoles.map(role => (
                <label key={role.roleId} className="flex items-center gap-2 p-2 border rounded hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRoleIds.includes(role.roleId)}
                    onChange={() => toggleRole(role.roleId)}
                    className="w-4 h-4 text-teal-600"
                  />
                  <span className="text-sm font-medium">{role.roleName}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition font-medium"
            >
              Cập nhật
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-200 text-slate-900 py-2 rounded-lg hover:bg-slate-300 transition font-medium"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
