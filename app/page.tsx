"use client"

import React from "react"
import { motion } from "framer-motion"
import { Timer } from "@/components/timer"
import { Grove } from "@/components/grove"
import { Achievements } from "@/components/achievements"
import { SessionStats } from "@/components/session-stats"
import { AchievementModal } from "@/components/achievement-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import { SettingsDialog } from "@/components/settings-dialog"
import { useGroveStore } from "@/lib/stores/grove-store"

export default function HomePage() {
  const { showAchievementModal } = useGroveStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <SettingsDialog />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-4">
            Focus Grove
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Cultivate your focus, one digital tree at a time. Transform your
            productivity sessions into a thriving forest ecosystem.
          </p>
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Timer & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 space-y-8"
          >
            <Timer />
            <SessionStats />
            <Achievements />
          </motion.div>

          {/* Main Grove Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-8"
          >
            <Grove />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 py-8 border-t border-border/50"
        >
          <p className="text-sm text-muted-foreground">
            Built with 🌳 and Next.js • Designed for mindful productivity
          </p>
        </motion.footer>
      </div>

      {/* Achievement Modal */}
      {showAchievementModal && <AchievementModal />}
    </div>
  )
}
