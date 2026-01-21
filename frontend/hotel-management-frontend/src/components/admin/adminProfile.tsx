"use client"

import { useState, useEffect } from "react"
import PersonalInfoSection from "../profile/profileInfo"
import ChangePasswordSection from "../profile/profileChangePassword"
import { API_BASE_URL } from "../../configuration/configuration"
import { toast } from "react-hot-toast"

interface UserProfile {
    userId: string
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    username: string
}

export default function AdminProfile() {
    const [userData, setUserData] = useState<UserProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${API_BASE_URL}/users/myInfo`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setUserData(data.result)
            } else {
                toast.error("Không thể tải thông tin cá nhân")
            }
        } catch (error) {
            console.error("Error fetching profile:", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <div className="text-center py-10">Đang tải thông tin...</div>
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Thông tin tài khoản</h1>
                <p className="text-slate-600 mt-2">Quản lý thông tin cá nhân và bảo mật.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Info */}
                <div className="space-y-6">
                    <PersonalInfoSection initialData={userData || undefined} />
                </div>

                {/* Change Password */}
                <div className="space-y-6">
                    <ChangePasswordSection userId={userData?.userId} />
                </div>
            </div>
        </div>
    )
}
