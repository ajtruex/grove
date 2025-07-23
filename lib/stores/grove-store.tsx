"use client"

import React, { createContext, useContext } from "react"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { subscribeWithSelector } from "zustand/middleware"
import { GROVE_CONFIG, ACHIEVEMENTS, STORAGE_KEYS } from "@/lib/constants"

export interface Tree {
  id: string
  x: number
  y: number
  size: number
  type: "oak" | "pine" | "birch" | "maple" | "willow"
  age: number
  plantedAt: Date
  seasonalEffects?: {
    spring?: boolean
    summer?: boolean
    autumn?: boolean
    winter?: boolean
  }
}

export interface Achievement {
  id: number
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt?: Date
}

export interface FocusSession {
  id: string
  startTime: Date
  endTime?: Date
  duration: number
  completed: boolean
  treeGrown?: string
}

export interface GroveStats {
  totalFocusTime: number
  completedSessions: number
  currentStreak: number
  longestStreak: number
  treesGrown: number
  achievementsUnlocked: number
}

interface GroveState {
  // Core data
  trees: Tree[]
  achievements: Achievement[]
  sessions: FocusSession[]
  stats: GroveStats

  // UI state
  isTimerActive: boolean
  currentSessionId: string | null
  selectedTree: string | null
  showAchievementModal: boolean
  newAchievement: Achievement | null

  // Settings
  settings: {
    timerDuration: number
    soundEnabled: boolean
    notificationsEnabled: boolean
    theme: "light" | "dark" | "auto"
    showAdvancedStats: boolean
  }

  // Actions
  addTree: (tree: Omit<Tree, "id" | "age" | "plantedAt">) => void
  removeTree: (treeId: string) => void
  selectTree: (treeId: string | null) => void

  startFocusSession: () => void
  completeFocusSession: () => void
  cancelFocusSession: () => void

  unlockAchievement: (achievementId: number) => void
  checkAchievements: () => void
  closeAchievementModal: () => void

  updateSettings: (settings: Partial<GroveState["settings"]>) => void
  resetGrove: () => void

  // Computed getters
  getTreeCount: () => number
  getCompletedSessionsCount: () => number
  getTotalFocusTime: () => number
  getCurrentStreak: () => number
}

const initialStats: GroveStats = {
  totalFocusTime: 0,
  completedSessions: 0,
  currentStreak: 0,
  longestStreak: 0,
  treesGrown: 0,
  achievementsUnlocked: 0,
}

const initialSettings = {
  timerDuration: GROVE_CONFIG.DEFAULT_TIMER_DURATION,
  soundEnabled: true,
  notificationsEnabled: true,
  theme: "auto" as const,
  showAdvancedStats: false,
}

export const useGroveStore = create<GroveState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        // Initial state
        trees: [],
        achievements: [],
        sessions: [],
        stats: initialStats,
        isTimerActive: false,
        currentSessionId: null,
        selectedTree: null,
        showAchievementModal: false,
        newAchievement: null,
        settings: initialSettings,

        // Tree actions
        addTree: (treeData) => {
          const newTree: Tree = {
            ...treeData,
            id: `tree_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            age: 0,
            plantedAt: new Date(),
          }

          set((state) => ({
            trees: [...state.trees, newTree],
            stats: {
              ...state.stats,
              treesGrown: state.stats.treesGrown + 1,
            },
          }))

          // Check for new achievements
          get().checkAchievements()
        },

        removeTree: (treeId) => {
          set((state) => ({
            trees: state.trees.filter((tree) => tree.id !== treeId),
            selectedTree:
              state.selectedTree === treeId ? null : state.selectedTree,
          }))
        },

        selectTree: (treeId) => {
          set({ selectedTree: treeId })
        },

        // Focus session actions
        startFocusSession: () => {
          const sessionId = `session_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 9)}`
          const newSession: FocusSession = {
            id: sessionId,
            startTime: new Date(),
            duration: get().settings.timerDuration,
            completed: false,
          }

          set((state) => ({
            sessions: [...state.sessions, newSession],
            currentSessionId: sessionId,
            isTimerActive: true,
          }))
        },

        completeFocusSession: () => {
          const { currentSessionId, sessions } = get()
          if (!currentSessionId) return

          const sessionIndex = sessions.findIndex(
            (s) => s.id === currentSessionId
          )
          if (sessionIndex === -1) return

          const completedSession = {
            ...sessions[sessionIndex],
            endTime: new Date(),
            completed: true,
          }

          const newSessions = [...sessions]
          newSessions[sessionIndex] = completedSession

          set((state) => ({
            sessions: newSessions,
            currentSessionId: null,
            isTimerActive: false,
            stats: {
              ...state.stats,
              completedSessions: state.stats.completedSessions + 1,
              totalFocusTime:
                state.stats.totalFocusTime + completedSession.duration,
            },
          }))

          // Auto-grow a tree on session completion
          get().addTree({
            x: Math.random() * (GROVE_CONFIG.GROVE_WIDTH - 100) + 50,
            y: Math.random() * (GROVE_CONFIG.GROVE_HEIGHT - 150) + 50,
            size: 0.8 + Math.random() * 0.4,
            type: ["oak", "pine", "birch", "maple", "willow"][
              Math.floor(Math.random() * 5)
            ] as Tree["type"],
          })
        },

        cancelFocusSession: () => {
          const { currentSessionId, sessions } = get()
          if (!currentSessionId) return

          set({
            sessions: sessions.filter((s) => s.id !== currentSessionId),
            currentSessionId: null,
            isTimerActive: false,
          })
        },

        // Achievement actions
        unlockAchievement: (achievementId) => {
          const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId)
          if (!achievement) return

          const { achievements } = get()
          if (achievements.some((a) => a.id === achievementId)) return

          const unlockedAchievement: Achievement = {
            ...achievement,
            unlockedAt: new Date(),
          }

          set((state) => ({
            achievements: [...state.achievements, unlockedAchievement],
            newAchievement: unlockedAchievement,
            showAchievementModal: true,
            stats: {
              ...state.stats,
              achievementsUnlocked: state.stats.achievementsUnlocked + 1,
            },
          }))
        },

        checkAchievements: () => {
          const { trees, achievements, stats } = get()
          const treeCount = trees.length
          const completedSessions = stats.completedSessions

          // Check tree-based achievements
          ACHIEVEMENTS.forEach((achievement) => {
            if (achievements.some((a) => a.id === achievement.id)) return

            let shouldUnlock = false

            // Tree count achievements
            if (achievement.id <= 100 && treeCount >= achievement.id) {
              shouldUnlock = true
            }

            // Session-based achievements
            if (
              achievement.id > 100 &&
              achievement.id <= 200 &&
              completedSessions >= achievement.id - 100
            ) {
              shouldUnlock = true
            }

            if (shouldUnlock) {
              get().unlockAchievement(achievement.id)
            }
          })
        },

        closeAchievementModal: () => {
          set({ showAchievementModal: false, newAchievement: null })
        },

        // Settings actions
        updateSettings: (newSettings) => {
          set((state) => ({
            settings: { ...state.settings, ...newSettings },
          }))
        },

        resetGrove: () => {
          set({
            trees: [],
            achievements: [],
            sessions: [],
            stats: initialStats,
            isTimerActive: false,
            currentSessionId: null,
            selectedTree: null,
            showAchievementModal: false,
            newAchievement: null,
          })
        },

        // Computed getters
        getTreeCount: () => get().trees.length,
        getCompletedSessionsCount: () => get().stats.completedSessions,
        getTotalFocusTime: () => get().stats.totalFocusTime,
        getCurrentStreak: () => get().stats.currentStreak,
      }),
      {
        name: STORAGE_KEYS.GROVE_STATE,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          trees: state.trees,
          achievements: state.achievements,
          sessions: state.sessions.slice(-50), // Keep only last 50 sessions
          stats: state.stats,
          settings: state.settings,
        }),
      }
    )
  )
)

// Provider component for Next.js
const GroveContext = createContext<ReturnType<typeof useGroveStore> | null>(
  null
)

export function GroveProvider({ children }: { children: React.ReactNode }) {
  return (
    <GroveContext.Provider value={useGroveStore}>
      {children}
    </GroveContext.Provider>
  )
}

export function useGrove() {
  const context = useContext(GroveContext)
  if (!context) {
    throw new Error("useGrove must be used within GroveProvider")
  }
  return context
}
