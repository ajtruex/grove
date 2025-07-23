import { useCallback } from "react"
import { useGrove } from "../contexts/GroveContext"
import { useAchievements } from "./useAchievements"
import {
  GROVE_WIDTH,
  GROVE_HEIGHT,
  TREE_MIN_SIZE,
  TREE_MAX_SIZE,
  EVENTS,
} from "../constants"

export function useGroveManager() {
  const { state, dispatch } = useGrove()
  const { checkAchievements } = useAchievements()

  const generateTreePosition = useCallback(() => {
    // Add some padding from edges
    const padding = 50
    return {
      x: padding + Math.random() * (GROVE_WIDTH - 2 * padding),
      y: padding + Math.random() * (GROVE_HEIGHT - 150), // Leave space for ground
      size: TREE_MIN_SIZE + Math.random() * (TREE_MAX_SIZE - TREE_MIN_SIZE),
      id: Date.now() + Math.random(), // Unique ID for each tree
    }
  }, [])

  const addTree = useCallback(() => {
    const newTree = generateTreePosition()
    dispatch({ type: "ADD_TREE", payload: newTree })

    const newTreeCount = state.trees.length + 1
    checkAchievements(newTreeCount)

    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent(EVENTS.TREE_GROWN, {
        detail: { count: newTreeCount, tree: newTree },
      })
    )
  }, [dispatch, generateTreePosition, state.trees.length, checkAchievements])

  const setTimerActive = useCallback(
    (isActive) => {
      dispatch({ type: "SET_TIMER_ACTIVE", payload: isActive })
    },
    [dispatch]
  )

  const incrementSessions = useCallback(() => {
    dispatch({ type: "INCREMENT_SESSIONS" })
  }, [dispatch])

  const resetGrove = useCallback(() => {
    if (
      window.confirm(
        "Are you sure you want to reset your entire grove? This cannot be undone."
      )
    ) {
      dispatch({ type: "RESET_GROVE" })
      localStorage.clear()
    }
  }, [dispatch])

  return {
    trees: state.trees,
    totalSessions: state.totalSessions,
    isTimerActive: state.isTimerActive,
    addTree,
    setTimerActive,
    incrementSessions,
    resetGrove,
  }
}
