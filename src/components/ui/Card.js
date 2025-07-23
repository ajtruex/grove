import React from "react"
import { cn } from "../../lib/utils"

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "bg-card/80 backdrop-blur-sm border border-border/20 rounded-2xl shadow-lg animate-grow-in",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn("p-6 pb-0", className)} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={cn("text-2xl font-bold text-primary", className)} {...props}>
      {children}
    </h3>
  )
}
