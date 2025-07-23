"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Star, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useGroveStore } from "@/lib/stores/grove-store"
import { getAchievementRarityColor } from "@/lib/utils"

export function AchievementModal() {
  const { showAchievementModal, newAchievement, closeAchievementModal } =
    useGroveStore()

  if (!showAchievementModal || !newAchievement) return null

  const rarityColor = getAchievementRarityColor(newAchievement.rarity)

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeAchievementModal}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <Card className="relative overflow-hidden">
            {/* Sparkle Effects */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="absolute"
                  style={{
                    left: `${20 + i * 15 + Math.random() * 10}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                >
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                </motion.div>
              ))}
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-20"
              onClick={closeAchievementModal}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Content */}
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
                className="mb-6"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-full flex items-center justify-center text-6xl mb-4 border-4 border-yellow-200 dark:border-yellow-800">
                  {newAchievement.icon}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-2xl font-bold">Achievement Unlocked!</h2>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>

                <Badge
                  variant="outline"
                  className={`text-sm capitalize ${rarityColor}`}
                >
                  {newAchievement.rarity}
                </Badge>

                <h3 className="text-xl font-semibold text-primary">
                  {newAchievement.name}
                </h3>

                <p className="text-muted-foreground">
                  {newAchievement.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Button
                  onClick={closeAchievementModal}
                  size="lg"
                  className="w-full"
                >
                  Awesome! Continue Growing
                </Button>
              </motion.div>
            </div>

            {/* Decorative Border */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 rounded-lg border-2 border-gradient-to-r from-yellow-200 via-amber-200 to-yellow-200 dark:from-yellow-800 dark:via-amber-800 dark:to-yellow-800 opacity-50" />
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
