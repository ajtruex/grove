"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useGroveStore } from "@/lib/stores/grove-store"
import { GROVE_CONFIG, GROVE_EVENTS } from "@/lib/constants"
import { createNotification, debugLog } from "@/lib/utils"

export interface UseTimerOptions {
  onComplete?: () => void
  onTick?: (time: number) => void
  onStart?: () => void
  onPause?: () => void
  onReset?: () => void
}

export interface TimerState {
  time: number
  isActive: boolean
  isPaused: boolean
  progress: number
  formattedTime: string
  sessionType: "focus" | "break" | "longBreak"
}

export function useTimer(options: UseTimerOptions = {}) {
  const {
    settings,
    startFocusSession,
    completeFocusSession,
    cancelFocusSession,
    isTimerActive,
    currentSessionId,
  } = useGroveStore()

  const [time, setTime] = useState(settings.timerDuration)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [sessionType, setSessionType] = useState<
    "focus" | "break" | "longBreak"
  >("focus")

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const initialTimeRef = useRef(settings.timerDuration)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize audio context for web audio sounds
  const initAudioContext = useCallback(() => {
    if (typeof window !== "undefined" && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)()
    }
  }, [])

  // Play completion sound using Web Audio API
  const playCompletionSound = useCallback(() => {
    if (!settings.soundEnabled || !audioContextRef.current) return

    try {
      const ctx = audioContextRef.current
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.frequency.setValueAtTime(600, ctx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(
        800,
        ctx.currentTime + 0.1
      )
      oscillator.frequency.exponentialRampToValueAtTime(
        600,
        ctx.currentTime + 0.2
      )

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.5)
    } catch (error) {
      debugLog("Error playing completion sound:", error)
    }
  }, [settings.soundEnabled])

  // Start timer
  const start = useCallback(() => {
    initAudioContext()
    setIsActive(true)
    setIsPaused(false)

    if (sessionType === "focus" && !currentSessionId) {
      startFocusSession()
    }

    options.onStart?.()
    debugLog("Timer started", { sessionType, time })
  }, [
    sessionType,
    currentSessionId,
    startFocusSession,
    options,
    initAudioContext,
    time,
  ])

  // Pause timer
  const pause = useCallback(() => {
    setIsActive(false)
    setIsPaused(true)
    options.onPause?.()
    debugLog("Timer paused", { time })
  }, [options, time])

  // Reset timer
  const reset = useCallback(() => {
    setTime(initialTimeRef.current)
    setIsActive(false)
    setIsPaused(false)

    if (currentSessionId) {
      cancelFocusSession()
    }

    options.onReset?.()
    debugLog("Timer reset")
  }, [currentSessionId, cancelFocusSession, options])

  // Toggle timer state
  const toggle = useCallback(() => {
    if (isActive) {
      pause()
    } else {
      start()
    }
  }, [isActive, pause, start])

  // Switch session type
  const switchSessionType = useCallback(
    (type: "focus" | "break" | "longBreak") => {
      setSessionType(type)

      let duration: number
      switch (type) {
        case "focus":
          duration = settings.timerDuration
          break
        case "break":
          duration = GROVE_CONFIG.BREAK_DURATION
          break
        case "longBreak":
          duration = GROVE_CONFIG.LONG_BREAK_DURATION
          break
      }

      setTime(duration)
      initialTimeRef.current = duration
      setIsActive(false)
      setIsPaused(false)

      debugLog("Session type switched", { type, duration })
    },
    [settings.timerDuration]
  )

  // Format time display
  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`
  }, [])

  // Calculate progress percentage
  const progress =
    ((initialTimeRef.current - time) / initialTimeRef.current) * 100

  // Main timer effect
  useEffect(() => {
    if (isActive && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1

          // Emit tick event
          options.onTick?.(newTime)
          window.dispatchEvent(
            new CustomEvent(GROVE_EVENTS.TIMER_TICK, {
              detail: {
                time: newTime,
                progress:
                  ((initialTimeRef.current - newTime) /
                    initialTimeRef.current) *
                  100,
              },
            })
          )

          // Timer completion
          if (newTime <= 0) {
            setIsActive(false)
            setIsPaused(false)

            // Handle session completion
            if (sessionType === "focus") {
              completeFocusSession()

              // Show notification
              if (settings.notificationsEnabled) {
                createNotification(
                  "Focus Session Complete! 🌳",
                  "Great job! Your tree is ready to be planted in the grove.",
                  { icon: "/icons/tree.png" }
                )
              }
            }

            // Play completion sound
            playCompletionSound()

            // Call completion callback
            options.onComplete?.()

            // Dispatch completion event
            window.dispatchEvent(
              new CustomEvent(GROVE_EVENTS.SESSION_COMPLETED, {
                detail: { sessionType, duration: initialTimeRef.current },
              })
            )

            debugLog("Timer completed", {
              sessionType,
              duration: initialTimeRef.current,
            })

            // Reset time for next session
            return initialTimeRef.current
          }

          return newTime
        })
      }, GROVE_CONFIG.TIMER_INTERVAL)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [
    isActive,
    time,
    sessionType,
    completeFocusSession,
    settings.notificationsEnabled,
    playCompletionSound,
    options,
  ])

  // Update timer duration when settings change
  useEffect(() => {
    if (sessionType === "focus" && !isActive && !isPaused) {
      setTime(settings.timerDuration)
      initialTimeRef.current = settings.timerDuration
    }
  }, [settings.timerDuration, sessionType, isActive, isPaused])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const timerState: TimerState = {
    time,
    isActive,
    isPaused,
    progress,
    formattedTime: formatTime(time),
    sessionType,
  }

  return {
    ...timerState,
    start,
    pause,
    reset,
    toggle,
    switchSessionType,
  }
}
