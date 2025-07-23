"use client"

import React from "react"
import { motion } from "framer-motion"
import { BarChart3, Clock, Target, Flame } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGroveStore } from "@/lib/stores/grove-store"
import { formatDuration } from "@/lib/utils"

export function SessionStats() {
  const { stats, sessions } = useGroveStore()

  const todaySessions = sessions.filter((session) => {
    const today = new Date()
    const sessionDate = new Date(session.startTime)
    return (
      sessionDate.getDate() === today.getDate() &&
      sessionDate.getMonth() === today.getMonth() &&
      sessionDate.getFullYear() === today.getFullYear() &&
      session.completed
    )
  }).length

  const statItems = [
    {
      icon: <Clock className="h-4 w-4" />,
      label: "Total Focus Time",
      value: formatDuration(stats.totalFocusTime),
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      icon: <Target className="h-4 w-4" />,
      label: "Sessions Completed",
      value: stats.completedSessions.toString(),
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      icon: <Flame className="h-4 w-4" />,
      label: "Current Streak",
      value: `${stats.currentStreak} days`,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      label: "Today",
      value: `${todaySessions} sessions`,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Session Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg ${item.bgColor} border border-opacity-20`}
            >
              <div className={`flex items-center gap-2 ${item.color} mb-1`}>
                {item.icon}
                <span className="text-xs font-medium">{item.label}</span>
              </div>
              <div className="text-lg font-bold">{item.value}</div>
            </motion.div>
          ))}
        </div>

        {stats.longestStreak > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                🏆 Best Streak
              </span>
              <Badge
                variant="outline"
                className="text-yellow-700 dark:text-yellow-300"
              >
                {stats.longestStreak} days
              </Badge>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
