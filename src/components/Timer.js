import React, { memo } from "react"
import { useTimer } from "../hooks/useTimer"
import { useGroveManager } from "../hooks/useGroveManager"
import { Button } from "./ui/Button"
import { Card, CardContent, CardTitle } from "./ui/Card"

const CircularProgress = memo(({ progress }) => {
  const circumference = 552.92
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <svg className="absolute w-full h-full transform -rotate-90">
      <circle
        cx="50%"
        cy="50%"
        r="88"
        stroke="hsl(var(--border))"
        strokeWidth="8"
        fill="transparent"
        className="text-gray-200"
      />
      <circle
        cx="50%"
        cy="50%"
        r="88"
        stroke="hsl(var(--primary))"
        strokeWidth="8"
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="transition-all duration-500 ease-in-out"
      />
    </svg>
  )
})

CircularProgress.displayName = "CircularProgress"

function Timer() {
  const { addTree, incrementSessions } = useGroveManager()

  const handleTimerComplete = () => {
    addTree()
    incrementSessions()
  }

  const { formattedTime, isActive, progress, toggle, reset } = useTimer({
    onComplete: handleTimerComplete,
  })

  return (
    <Card className="p-6 flex flex-col items-center">
      <CardTitle className="mb-4">Focus Timer</CardTitle>
      <CardContent className="p-0 flex flex-col items-center">
        <div className="relative w-48 h-48 flex items-center justify-center my-4">
          <CircularProgress progress={progress} />
          <div
            className="text-5xl font-mono font-extrabold text-primary tracking-tighter"
            role="timer"
            aria-live="polite"
            aria-label={`Timer: ${formattedTime}`}
          >
            {formattedTime}
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            onClick={toggle}
            variant={isActive ? "destructive" : "primary"}
            aria-label={isActive ? "Pause timer" : "Start timer"}
          >
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button onClick={reset} variant="secondary" aria-label="Reset timer">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(Timer)
