import React from "react"
import { cn } from "../../lib/utils"

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className,
  ...props
}) {
  const baseStyles =
    "font-bold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90 focus:ring-primary",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-muted focus:ring-secondary",
    destructive:
      "bg-destructive text-destructive-foreground hover:opacity-90 focus:ring-destructive",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2 text-lg",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  )
}
