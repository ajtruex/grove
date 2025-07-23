"use client"

import React, { useState } from "react"
import { Settings, Volume2, VolumeX, Bell, BellOff, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGroveStore } from "@/lib/stores/grove-store"
import { GROVE_CONFIG } from "@/lib/constants"

export function SettingsDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const { settings, updateSettings, resetGrove } = useGroveStore()

  const timerOptions = [
    { label: "15 min", value: 15 * 60 },
    { label: "25 min", value: 25 * 60 },
    { label: "30 min", value: 30 * 60 },
    { label: "45 min", value: 45 * 60 },
    { label: "60 min", value: 60 * 60 },
  ]

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset your entire grove? This action cannot be undone."
      )
    ) {
      resetGrove()
      setIsOpen(false)
    }
  }

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="w-9 h-9"
      >
        <Settings className="h-4 w-4" />
        <span className="sr-only">Settings</span>
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <Card className="relative z-10 w-full max-w-md mx-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Timer Duration */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Focus Session Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timerOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    settings.timerDuration === option.value
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    updateSettings({ timerDuration: option.value })
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Sound Settings */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Audio Settings</label>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  updateSettings({ soundEnabled: !settings.soundEnabled })
                }
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  {settings.soundEnabled ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                  Sound Effects
                </span>
                <Badge
                  variant={settings.soundEnabled ? "success" : "secondary"}
                >
                  {settings.soundEnabled ? "On" : "Off"}
                </Badge>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  updateSettings({
                    notificationsEnabled: !settings.notificationsEnabled,
                  })
                }
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  {settings.notificationsEnabled ? (
                    <Bell className="h-4 w-4" />
                  ) : (
                    <BellOff className="h-4 w-4" />
                  )}
                  Notifications
                </span>
                <Badge
                  variant={
                    settings.notificationsEnabled ? "success" : "secondary"
                  }
                >
                  {settings.notificationsEnabled ? "On" : "Off"}
                </Badge>
              </Button>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Advanced</label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                updateSettings({
                  showAdvancedStats: !settings.showAdvancedStats,
                })
              }
              className="w-full justify-between"
            >
              <span>Show Advanced Statistics</span>
              <Badge
                variant={settings.showAdvancedStats ? "success" : "secondary"}
              >
                {settings.showAdvancedStats ? "On" : "Off"}
              </Badge>
            </Button>
          </div>

          {/* Danger Zone */}
          <div className="space-y-3 pt-4 border-t">
            <label className="text-sm font-medium text-destructive">
              Danger Zone
            </label>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleReset}
              className="w-full"
            >
              Reset Grove
            </Button>
            <p className="text-xs text-muted-foreground">
              This will permanently delete all your trees, achievements, and
              progress.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
