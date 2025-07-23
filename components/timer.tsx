"use client"

import React from "react"
import { motion } from "framer-motion"
import { Play, Pause, Square, Settings, Timer as TimerIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useTimer } from "@/lib/hooks/use-timer"
import { useGroveStore } from "@/lib/stores/grove-store"
import { cn } from "@/lib/utils"

const CircularProgress = ({
  progress,
  size = 200,
}: {
  progress: number
  size?: number
}) => {
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-muted/20"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-primary transition-all duration-500 ease-out"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

const SessionTypeSelector = ({
  currentType,
  onTypeChange,
  disabled,
}: {
  currentType: "focus" | "break" | "longBreak"
  onTypeChange: (type: "focus" | "break" | "longBreak") => void
  disabled: boolean
}) => (
  <div className="flex gap-2 mb-4">
    <Button
      variant={currentType === "focus" ? "default" : "outline"}
      size="sm"
      onClick={() => onTypeChange("focus")}
      disabled={disabled}
      className="flex-1"
    >
      Focus
    </Button>
    <Button
      variant={currentType === "break" ? "default" : "outline"}
      size="sm"
      onClick={() => onTypeChange("break")}
      disabled={disabled}
      className="flex-1"
    >
      Break
    </Button>
    <Button
      variant={currentType === "longBreak" ? "default" : "outline"}
      size="sm"
      onClick={() => onTypeChange("longBreak")}
      disabled={disabled}
      className="flex-1"
    >
      Long Break
    </Button>
  </div>
)

export function Timer() {
  const { isTimerActive } = useGroveStore()

  const {
    time,
    isActive,
    isPaused,
    progress,
    formattedTime,
    sessionType,
    start,
    pause,
    reset,
    toggle,
    switchSessionType,
  } = useTimer()

  const getSessionTypeInfo = (type: "focus" | "break" | "longBreak") => {
    switch (type) {
      case "focus":
        return {
          label: "Focus Session",
          icon: <TimerIcon className="h-4 w-4" />,
          color: "bg-green-500",
        }
      case "break":
        return {
          label: "Short Break",
          icon: <Play className="h-4 w-4" />,
          color: "bg-blue-500",
        }
      case "longBreak":
        return {
          label: "Long Break",
          icon: <Settings className="h-4 w-4" />,
          color: "bg-purple-500",
        }
    }
  }

  const sessionInfo = getSessionTypeInfo(sessionType)

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          {sessionInfo.icon}
          <CardTitle className="text-xl">{sessionInfo.label}</CardTitle>
        </div>
        <Badge variant="outline" className="mx-auto">
          <div className={cn("w-2 h-2 rounded-full mr-2", sessionInfo.color)} />
          {sessionType === "focus" ? "Building Focus" : "Taking Break"}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col items-center space-y-6">
        {/* Session Type Selector */}
        <SessionTypeSelector
          currentType={sessionType}
          onTypeChange={switchSessionType}
          disabled={isActive}
        />

        {/* Timer Display */}
        <div className="relative flex items-center justify-center">
          <CircularProgress progress={progress} size={180} />
          <motion.div
            key={formattedTime}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-4xl font-mono font-bold tabular-nums">
              {formattedTime}
            </span>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3 w-full">
          <Button
            onClick={toggle}
            size="lg"
            className="flex-1"
            variant={isActive ? "destructive" : "default"}
          >
            {isActive ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                {isPaused ? "Resume" : "Start"}
              </>
            )}
          </Button>

          <Button onClick={reset} size="lg" variant="outline" className="px-8">
            <Square className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Status Message */}
        <div className="text-center">
          {isActive ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-muted-foreground"
            >
              {sessionType === "focus"
                ? "🌱 Stay focused and watch your grove grow!"
                : "☕ Take a well-deserved break"}
            </motion.p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Ready to start your {sessionType} session?
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
