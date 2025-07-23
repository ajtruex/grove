// Timer configurations
export const GROVE_CONFIG = {
  DEFAULT_TIMER_DURATION: 25 * 60, // 25 minutes in seconds
  BREAK_DURATION: 5 * 60, // 5 minutes
  LONG_BREAK_DURATION: 15 * 60, // 15 minutes
  TIMER_INTERVAL: 1000, // 1 second

  // Grove dimensions
  GROVE_WIDTH: 1000,
  GROVE_HEIGHT: 600,

  // Tree properties
  TREE_MIN_SIZE: 0.6,
  TREE_MAX_SIZE: 1.4,
  MAX_TREES_PER_GROVE: 100,

  // Animation timings
  TREE_GROW_DURATION: 2000,
  PARTICLE_DURATION: 3000,
} as const

// Achievement definitions with enhanced properties
export const ACHIEVEMENTS = [
  // Tree Growing Achievements
  {
    id: 1,
    name: "First Sapling",
    description: "Plant your very first tree in the grove.",
    icon: "🌱",
    rarity: "common" as const,
  },
  {
    id: 5,
    name: "Small Grove",
    description: "Grow 5 trees and watch your grove take shape.",
    icon: "🌿",
    rarity: "common" as const,
  },
  {
    id: 10,
    name: "Budding Forest",
    description: "Cultivate 10 trees in your digital sanctuary.",
    icon: "🌳",
    rarity: "common" as const,
  },
  {
    id: 25,
    name: "Verdant Grove",
    description: "Nurture 25 trees into a flourishing ecosystem.",
    icon: "🏞️",
    rarity: "rare" as const,
  },
  {
    id: 50,
    name: "Ancient Forest",
    description: "Create a majestic forest of 50 trees.",
    icon: "🌲",
    rarity: "epic" as const,
  },
  {
    id: 100,
    name: "Forest Guardian",
    description: "Master of 100 trees - a true guardian of the grove.",
    icon: "🦌",
    rarity: "legendary" as const,
  },

  // Focus Session Achievements
  {
    id: 101,
    name: "First Focus",
    description: "Complete your first 25-minute focus session.",
    icon: "⏰",
    rarity: "common" as const,
  },
  {
    id: 110,
    name: "Focused Mind",
    description: "Complete 10 focus sessions with dedication.",
    icon: "🧠",
    rarity: "rare" as const,
  },
  {
    id: 125,
    name: "Concentration Master",
    description: "Achieve 25 completed focus sessions.",
    icon: "🎯",
    rarity: "epic" as const,
  },
  {
    id: 150,
    name: "Zen Master",
    description: "Reach the pinnacle with 50 focus sessions.",
    icon: "🧘",
    rarity: "legendary" as const,
  },

  // Special Achievements
  {
    id: 200,
    name: "Night Owl",
    description: "Complete a focus session after 10 PM.",
    icon: "🦉",
    rarity: "rare" as const,
  },
  {
    id: 201,
    name: "Early Bird",
    description: "Start a focus session before 6 AM.",
    icon: "🐦",
    rarity: "rare" as const,
  },
  {
    id: 202,
    name: "Streak Warrior",
    description: "Maintain a 7-day focus streak.",
    icon: "🔥",
    rarity: "epic" as const,
  },
] as const

// Storage keys for persistence
export const STORAGE_KEYS = {
  GROVE_STATE: "focus-grove-state",
  USER_PREFERENCES: "focus-grove-preferences",
  ANALYTICS: "focus-grove-analytics",
} as const

// Custom events for inter-component communication
export const GROVE_EVENTS = {
  TREE_PLANTED: "grove:tree-planted",
  SESSION_COMPLETED: "grove:session-completed",
  ACHIEVEMENT_UNLOCKED: "grove:achievement-unlocked",
  GROVE_RESET: "grove:grove-reset",
  TIMER_TICK: "grove:timer-tick",
} as const

// Tree types with enhanced properties
export const TREE_TYPES = {
  oak: {
    name: "Oak",
    rarity: "common",
    growthRate: 1.0,
    seasonalBonus: { autumn: true },
    colors: ["#8B4513", "#228B22", "#32CD32"],
  },
  pine: {
    name: "Pine",
    rarity: "common",
    growthRate: 1.2,
    seasonalBonus: { winter: true },
    colors: ["#8B4513", "#006400", "#228B22"],
  },
  birch: {
    name: "Birch",
    rarity: "rare",
    growthRate: 0.9,
    seasonalBonus: { spring: true },
    colors: ["#F5F5DC", "#90EE90", "#ADFF2F"],
  },
  maple: {
    name: "Maple",
    rarity: "rare",
    growthRate: 1.1,
    seasonalBonus: { autumn: true },
    colors: ["#8B4513", "#FF4500", "#FF6347"],
  },
  willow: {
    name: "Willow",
    rarity: "epic",
    growthRate: 0.8,
    seasonalBonus: { summer: true },
    colors: ["#8B4513", "#9ACD32", "#32CD32"],
  },
} as const

// Animation configurations
export const ANIMATIONS = {
  // Tree growth
  TREE_SCALE_IN: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 1.5, ease: "easeOut" },
  },

  // UI elements
  FADE_IN: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },

  SLIDE_UP: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4, ease: "easeOut" },
  },

  // Achievement modal
  ACHIEVEMENT_MODAL: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
} as const

// Theme colors optimized for nature aesthetic
export const THEME_COLORS = {
  grove: {
    sky: "#87CEEB",
    ground: "#8FBC8F",
    water: "#4682B4",
    sun: "#FFD700",
    moon: "#F5F5DC",
  },
  achievements: {
    common: "#22C55E",
    rare: "#3B82F6",
    epic: "#A855F7",
    legendary: "#F59E0B",
  },
} as const

// Sound configurations (for future implementation)
export const SOUND_CONFIG = {
  TIMER_COMPLETE: "/sounds/timer-complete.mp3",
  ACHIEVEMENT_UNLOCK: "/sounds/achievement.mp3",
  TREE_PLANT: "/sounds/tree-plant.mp3",
  AMBIENT_FOREST: "/sounds/forest-ambient.mp3",
  BUTTON_CLICK: "/sounds/click.mp3",
} as const

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: "640px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1280px",
} as const
