import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Time formatting utilities
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

// Date utilities
export function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export function getTimeOfDay(): "morning" | "afternoon" | "evening" | "night" {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return "morning"
  if (hour >= 12 && hour < 17) return "afternoon"
  if (hour >= 17 && hour < 21) return "evening"
  return "night"
}

// Number utilities
export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

// Array utilities
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Local storage utilities with error handling
export function safeLocalStorage() {
  const isAvailable = typeof window !== "undefined" && window.localStorage

  return {
    getItem: (key: string): string | null => {
      if (!isAvailable) return null
      try {
        return localStorage.getItem(key)
      } catch {
        return null
      }
    },
    setItem: (key: string, value: string): boolean => {
      if (!isAvailable) return false
      try {
        localStorage.setItem(key, value)
        return true
      } catch {
        return false
      }
    },
    removeItem: (key: string): boolean => {
      if (!isAvailable) return false
      try {
        localStorage.removeItem(key)
        return true
      } catch {
        return false
      }
    },
  }
}

// Achievement utilities
export function getAchievementRarityColor(rarity: string): string {
  switch (rarity) {
    case "common":
      return "text-green-600"
    case "rare":
      return "text-blue-600"
    case "epic":
      return "text-purple-600"
    case "legendary":
      return "text-yellow-600"
    default:
      return "text-gray-600"
  }
}

// Grove utilities
export function generateTreePosition(
  width: number,
  height: number,
  existingTrees: Array<{ x: number; y: number }> = []
) {
  let attempts = 0
  let position

  do {
    position = {
      x: randomBetween(60, width - 60),
      y: randomBetween(60, height - 100), // Leave space for ground/UI
    }
    attempts++
  } while (
    attempts < 10 &&
    existingTrees.some(
      (tree) =>
        Math.abs(tree.x - position.x) < 80 && Math.abs(tree.y - position.y) < 80
    )
  )

  return position
}

// Notification utilities
export function createNotification(
  title: string,
  body: string,
  options?: NotificationOptions
) {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return null
  }

  if (Notification.permission === "granted") {
    return new Notification(title, { body, ...options })
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        return new Notification(title, { body, ...options })
      }
    })
  }

  return null
}

// Debug utilities
export function debugLog(message: string, ...args: any[]) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Focus Grove] ${message}`, ...args)
  }
}
