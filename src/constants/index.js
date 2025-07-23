// Timer constants
export const TIMER_DURATION = 25 * 60 // 25 minutes in seconds
export const TIMER_INTERVAL = 1000 // 1 second

// Achievement thresholds
export const ACHIEVEMENTS = [
  { id: 1, name: "First Sapling", description: "Grow your first tree." },
  { id: 5, name: "Growing Grove", description: "Grow 5 trees." },
  { id: 10, name: "Verdant Forest", description: "Grow 10 trees." },
  { id: 25, name: "Forest of Focus", description: "Grow 25 trees." },
  { id: 50, name: "Ancient Forest", description: "Grow 50 trees." },
  { id: 100, name: "Forest Guardian", description: "Grow 100 trees." },
]

// Grove constants
export const GROVE_WIDTH = 800
export const GROVE_HEIGHT = 400
export const TREE_MIN_SIZE = 0.8
export const TREE_MAX_SIZE = 1.2

// Local storage keys
export const STORAGE_KEYS = {
  TREES: "grove_trees",
  ACHIEVEMENTS: "grove_achievements",
  TOTAL_SESSIONS: "grove_total_sessions",
}

// Custom events
export const EVENTS = {
  TREE_GROWN: "grove:treeGrown",
  TIMER_COMPLETE: "grove:timerComplete",
  ACHIEVEMENT_EARNED: "grove:achievementEarned",
}
