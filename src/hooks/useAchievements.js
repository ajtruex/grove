import { useCallback } from "react"
import { useGrove } from "../contexts/GroveContext"
import { ACHIEVEMENTS, EVENTS } from "../constants"

export function useAchievements() {
  const { state, dispatch } = useGrove()

  const checkAchievements = useCallback(
    (treeCount) => {
      const newAchievements = ACHIEVEMENTS.filter(
        (achievement) =>
          treeCount >= achievement.id &&
          !state.earnedAchievements.find(
            (earned) => earned.id === achievement.id
          )
      )

      newAchievements.forEach((achievement) => {
        dispatch({ type: "ADD_ACHIEVEMENT", payload: achievement })
        // Dispatch custom event for notifications
        window.dispatchEvent(
          new CustomEvent(EVENTS.ACHIEVEMENT_EARNED, {
            detail: { achievement },
          })
        )
      })
    },
    [state.earnedAchievements, dispatch]
  )

  const getAchievementProgress = useCallback(
    (achievementId) => {
      const currentCount = state.trees.length
      return Math.min((currentCount / achievementId) * 100, 100)
    },
    [state.trees.length]
  )

  return {
    earnedAchievements: state.earnedAchievements,
    allAchievements: ACHIEVEMENTS,
    checkAchievements,
    getAchievementProgress,
  }
}
