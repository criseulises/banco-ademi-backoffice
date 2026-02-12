import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { colors } from "@/lib/colors"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  subtitle?: string
  iconColor?: string
  iconBgColor?: string
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
  iconColor = colors.primary,
  iconBgColor = "#E0F7FA",
}: StatsCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>

            {subtitle && (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}

            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span
                  className={`text-sm font-semibold ${
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-gray-500">vs. mes anterior</span>
              </div>
            )}
          </div>

          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: iconBgColor }}
          >
            <Icon className="h-6 w-6" style={{ color: iconColor }} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
