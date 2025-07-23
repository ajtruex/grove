"use client"

import React from "react"
import { motion } from "framer-motion"
import { Trophy, Lock, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useGroveStore } from "@/lib/stores/grove-store"
import { ACHIEVEMENTS } from "@/lib/constants"
import { getAchievementRarityColor, cn } from "@/lib/utils"

const AchievementItem = ({
  achievement,
  isUnlocked,
  progress,
}: {
  achievement: (typeof ACHIEVEMENTS)[0]
  isUnlocked: boolean
  progress: number
}) => {
  const rarityColor = getAchievementRarityColor(achievement.rarity)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "p-4 rounded-lg border transition-all duration-200",
        isUnlocked
          ? "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-yellow-200 dark:border-yellow-800"
          : "bg-muted/30 hover:bg-muted/50 border-border"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl",
            isUnlocked ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-muted"
          )}
        >
          {isUnlocked ? (
            achievement.icon
          ) : (
            <Lock className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4
              className={cn(
                "font-semibold truncate",
                isUnlocked
                  ? "text-yellow-800 dark:text-yellow-200"
                  : "text-muted-foreground"
              )}
            >
              {achievement.name}
            </h4>
            <Badge
              variant="outline"
              className={cn("text-xs capitalize", rarityColor)}
            >
              {achievement.rarity}
            </Badge>
            {isUnlocked && <Star className="h-4 w-4 text-yellow-500" />}
          </div>

          <p
            className={cn(
              "text-sm mb-3",
              isUnlocked
                ? "text-yellow-700 dark:text-yellow-300"
                : "text-muted-foreground"
            )}
          >
            {achievement.description}
          </p>

          {!isUnlocked && (
            <div className="space-y-2">
              <Progress value={Math.min(progress, 100)} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Achievements() {
  const { achievements, trees, stats } = useGroveStore()

  const getAchievementProgress = (
    achievement: (typeof ACHIEVEMENTS)[0]
  ): number => {
    // Tree-based achievements (1-100)
    if (achievement.id <= 100) {
      return Math.min((trees.length / achievement.id) * 100, 100)
    }

    // Session-based achievements (101-200)
    if (achievement.id > 100 && achievement.id <= 200) {
      const requiredSessions = achievement.id - 100
      return Math.min((stats.completedSessions / requiredSessions) * 100, 100)
    }

    // Special achievements (200+)
    // These would require custom logic based on the specific achievement
    return 0
  }

  const unlockedCount = achievements.length
  const totalCount = ACHIEVEMENTS.length

  // Sort achievements: unlocked first, then by progress
  const sortedAchievements = [...ACHIEVEMENTS].sort((a, b) => {
    const aUnlocked = achievements.some((ua) => ua.id === a.id)
    const bUnlocked = achievements.some((ua) => ua.id === b.id)

    if (aUnlocked && !bUnlocked) return -1
    if (!aUnlocked && bUnlocked) return 1
    if (aUnlocked && bUnlocked) return 0

    // Both locked, sort by progress
    const aProgress = getAchievementProgress(a)
    const bProgress = getAchievementProgress(b)
    return bProgress - aProgress
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-lg">Achievements</CardTitle>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {unlockedCount}/{totalCount}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">
              {Math.round((unlockedCount / totalCount) * 100)}%
            </span>
          </div>
          <Progress
            value={(unlockedCount / totalCount) * 100}
            className="h-2"
          />
        </div>

        {/* Achievement List */}
        <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
          {sortedAchievements.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Start focusing to unlock achievements!</p>
            </div>
          ) : (
            sortedAchievements.map((achievement) => {
              const isUnlocked = achievements.some(
                (ua) => ua.id === achievement.id
              )
              const progress = getAchievementProgress(achievement)

              return (
                <AchievementItem
                  key={achievement.id}
                  achievement={achievement}
                  isUnlocked={isUnlocked}
                  progress={progress}
                />
              )
            })
          )}
        </div>

        {/* Recent Achievement */}
        {achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800"
          >
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800 dark:text-green-200">
                Latest: {achievements[achievements.length - 1].name}
              </span>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
