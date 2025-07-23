import { useState, useEffect, useCallback, useRef } from "react"
import { TIMER_DURATION, TIMER_INTERVAL, EVENTS } from "../constants"

export function useTimer({ onComplete }) {
  const [time, setTime] = useState(TIMER_DURATION)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  const start = useCallback(() => {
    setIsActive(true)
    setIsPaused(false)
  }, [])

  const pause = useCallback(() => {
    setIsActive(false)
    setIsPaused(true)
  }, [])

  const reset = useCallback(() => {
    setTime(TIMER_DURATION)
    setIsActive(false)
    setIsPaused(false)
  }, [])

  const toggle = useCallback(() => {
    if (isActive) {
      pause()
    } else {
      start()
    }
  }, [isActive, pause, start])

  useEffect(() => {
    if (isActive && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false)
            setIsPaused(false)
            onComplete?.()
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent(EVENTS.TIMER_COMPLETE))
            return TIMER_DURATION // Reset to initial time
          }
          return prevTime - 1
        })
      }, TIMER_INTERVAL)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isActive, time, onComplete])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const formatTime = useCallback((timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }, [])

  const progress = ((TIMER_DURATION - time) / TIMER_DURATION) * 100

  return {
    time,
    isActive,
    isPaused,
    progress,
    formattedTime: formatTime(time),
    start,
    pause,
    reset,
    toggle,
  }
}
