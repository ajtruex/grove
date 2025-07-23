import React, { memo } from "react"
import { useAchievements } from "../hooks/useAchievements"
import { useGroveManager } from "../hooks/useGroveManager"
import { Card, CardContent, CardTitle } from "./ui/Card"

const AchievementItem = memo(({ achievement, isEarned, progress }) => (
  <li
    className={`p-3 rounded-lg transition-all duration-300 ${
      isEarned ? "bg-primary/10 border-l-4 border-primary" : "bg-secondary/50"
    }`}
    aria-describedby={`achievement-${achievement.id}-description`}
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <p
          className={`font-bold ${
            isEarned ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {achievement.name}
          {isEarned && <span className="ml-2 text-xs">✓</span>}
        </p>
        <p
          id={`achievement-${achievement.id}-description`}
          className="text-sm text-muted-foreground"
        >
          {achievement.description}
        </p>
      </div>
      {!isEarned && (
        <div className="ml-2 text-xs text-muted-foreground">
          {Math.round(progress)}%
        </div>
      )}
    </div>
    {!isEarned && (
      <div className="mt-2 w-full bg-secondary rounded-full h-1">
        <div
          className="bg-primary h-1 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
          aria-label={`${Math.round(progress)}% progress towards ${
            achievement.name
          }`}
        />
      </div>
    )}
  </li>
))

AchievementItem.displayName = "AchievementItem"

function Achievements() {
  const { trees } = useGroveManager()
  const { earnedAchievements, allAchievements, getAchievementProgress } =
    useAchievements()

  const totalEarned = earnedAchievements.length
  const totalAchievements = allAchievements.length

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <CardTitle>Achievements</CardTitle>
          <div className="text-sm text-muted-foreground">
            {totalEarned}/{totalAchievements}
          </div>
        </div>

        {trees.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            Your achievements will appear here. Start growing!
          </p>
        ) : (
          <ul className="space-y-3">
            {allAchievements.map((achievement) => {
              const isEarned = earnedAchievements.some(
                (earned) => earned.id === achievement.id
              )
              const progress = getAchievementProgress(achievement.id)

              return (
                <AchievementItem
                  key={achievement.id}
                  achievement={achievement}
                  isEarned={isEarned}
                  progress={progress}
                />
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

export default memo(Achievements)
