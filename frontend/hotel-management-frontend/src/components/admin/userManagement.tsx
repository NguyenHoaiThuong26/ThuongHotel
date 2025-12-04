"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, Shield } from "lucide-react"
import UserModal from "../admin/userModal"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "receptionist" | "customer"
  status: "active" | "inactive"
  joinDate: string
}

const sampleUsers: User[] = [
  {
    id: "U001",
    name: "Sarah Anderson",
    email: "sarah.anderson@luxury.com",
    role: "admin",
    status: "active",
    joinDate: "2023-01-15",
  },
  {
    id: "U002",
    name: "Mike Thompson",
    email: "mike.thompson@luxury.com",
    role: "receptionist",
    status: "active",
    joinDate: "2023-03-20",
  },
  {
    id: "U003",
    name: "Emily Brown",
    email: "emily.brown@email.com",
    role: "customer",
    status: "active",
    joinDate: "2023-06-10",
  },
  {
    id: "U004",
    name: "James Wilson",
    email: "james.wilson@email.com",
    role: "customer",
    status: "inactive",
    joinDate: "2023-02-05",
  },
]

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(sampleUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleAddUser = (newUser: Omit<User, "id">) => {
    const user: User = { ...newUser, id: `U${Date.now()}` }
    setUsers([...users, user])
    setShowModal(false)
  }

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
    setEditingUser(null)
    setShowModal(false)
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const toggleUserStatus = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)))
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "receptionist":
        return "bg-blue-100 text-blue-800"
      case "customer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Quản lý người dùng</h1>
        <button
          onClick={() => {
            setEditingUser(null)
            setShowModal(true)
          }}
          className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
        >
          <Plus size={20} />
          Thêm người dùng
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-md">
        <div>
          <label className="text-sm font-medium text-slate-700">Tìm kiếm</label>
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email..."
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
            <option value="admin">Quản trị viên</option>
            <option value="receptionist">Lễ tân</option>
            <option value="customer">Khách hàng</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Trạng thái</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">ID người dùng</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Tên</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Vai trò</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Trạng thái</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Ngày tham gia</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{user.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}
                    >
                      {user.role === "admin" && <Shield size={14} />}
                      {user.role === "admin" ? "Quản trị viên" : user.role === "receptionist" ? "Lễ tân" : "Khách hàng"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium cursor-pointer border-0 transition ${getStatusColor(user.status)}`}
                    >
                      {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{user.joinDate}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingUser(user)
                          setShowModal(true)
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
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
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-slate-600">Tổng số người dùng</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{filteredUsers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-slate-600">Người dùng hoạt động</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {filteredUsers.filter((u) => u.status === "active").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-sm text-slate-600">Quản trị viên</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {filteredUsers.filter((u) => u.role === "admin").length}
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <UserModal
          user={editingUser}
          onSave={editingUser ? handleEditUser : handleAddUser}
          onClose={() => {
            setShowModal(false)
            setEditingUser(null)
          }}
        />
      )}
    </div>
  )
}
