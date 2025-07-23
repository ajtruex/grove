import React, { useState, useEffect, useCallback } from "react"
import { EVENTS } from "../constants"
import { Card } from "./ui/Card"

export function NotificationSystem() {
  const [notifications, setNotifications] = useState([])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const addNotification = useCallback(
    (notification) => {
      setNotifications((prev) => [...prev, notification])

      // Auto remove after duration
      setTimeout(() => {
        removeNotification(notification.id)
      }, notification.duration)
    },
    [removeNotification]
  )

  useEffect(() => {
    const handleAchievement = (e) => {
      const { achievement } = e.detail
      addNotification({
        id: Date.now(),
        type: "achievement",
        title: "Achievement Unlocked!",
        message: `${achievement.name}: ${achievement.description}`,
        duration: 5000,
      })
    }

    const handleTimerComplete = () => {
      addNotification({
        id: Date.now(),
        type: "success",
        title: "Focus Session Complete!",
        message: "Great job! Your tree is ready to be planted.",
        duration: 3000,
      })
    }

    window.addEventListener(EVENTS.ACHIEVEMENT_EARNED, handleAchievement)
    window.addEventListener(EVENTS.TIMER_COMPLETE, handleTimerComplete)

    return () => {
      window.removeEventListener(EVENTS.ACHIEVEMENT_EARNED, handleAchievement)
      window.removeEventListener(EVENTS.TIMER_COMPLETE, handleTimerComplete)
    }
  }, [addNotification])

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className="p-4 min-w-80 animate-slide-in-right cursor-pointer"
          onClick={() => removeNotification(notification.id)}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-2 h-2 rounded-full mt-2 ${
                notification.type === "achievement"
                  ? "bg-yellow-500"
                  : notification.type === "success"
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
            />
            <div className="flex-1">
              <h4 className="font-bold text-sm text-primary">
                {notification.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {notification.message}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeNotification(notification.id)
              }}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              ✕
            </button>
          </div>
        </Card>
      ))}
    </div>
  )
}
