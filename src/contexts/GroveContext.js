import React, { createContext, useContext, useReducer, useEffect } from "react"
import { STORAGE_KEYS } from "../constants"

const GroveContext = createContext()

const initialState = {
  trees: [],
  totalSessions: 0,
  earnedAchievements: [],
  isTimerActive: false,
}

function groveReducer(state, action) {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return { ...state, ...action.payload }

    case "ADD_TREE":
      const newTrees = [...state.trees, action.payload]
      return { ...state, trees: newTrees }

    case "SET_TIMER_ACTIVE":
      return { ...state, isTimerActive: action.payload }

    case "INCREMENT_SESSIONS":
      return { ...state, totalSessions: state.totalSessions + 1 }

    case "ADD_ACHIEVEMENT":
      if (state.earnedAchievements.find((a) => a.id === action.payload.id)) {
        return state
      }
      return {
        ...state,
        earnedAchievements: [...state.earnedAchievements, action.payload],
      }

    case "RESET_GROVE":
      return { ...initialState }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function GroveProvider({ children }) {
  const [state, dispatch] = useReducer(groveReducer, initialState)

  // Load initial state from localStorage
  useEffect(() => {
    const savedTrees = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.TREES) || "[]"
    )
    const savedAchievements = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS) || "[]"
    )
    const savedSessions = parseInt(
      localStorage.getItem(STORAGE_KEYS.TOTAL_SESSIONS) || "0"
    )

    dispatch({
      type: "SET_INITIAL_STATE",
      payload: {
        trees: savedTrees,
        earnedAchievements: savedAchievements,
        totalSessions: savedSessions,
      },
    })
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TREES, JSON.stringify(state.trees))
  }, [state.trees])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.ACHIEVEMENTS,
      JSON.stringify(state.earnedAchievements)
    )
  }, [state.earnedAchievements])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.TOTAL_SESSIONS,
      state.totalSessions.toString()
    )
  }, [state.totalSessions])

  const value = { state, dispatch }

  return <GroveContext.Provider value={value}>{children}</GroveContext.Provider>
}

export function useGrove() {
  const context = useContext(GroveContext)
  if (!context) {
    throw new Error("useGrove must be used within a GroveProvider")
  }
  return context
}
