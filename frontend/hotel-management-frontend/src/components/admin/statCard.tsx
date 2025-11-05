import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  bgColor: string
}

export default function StatCard({ title, value, change, icon: Icon, bgColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          <p className="text-xs text-green-600 mt-2">{change}</p>
        </div>
        <div className={`${bgColor} rounded-lg p-3 text-white`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}
