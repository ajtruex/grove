"use client"

import React, { useRef, useEffect } from "react"
import * as d3 from "d3"
import { motion } from "framer-motion"
import { Tree } from "@/lib/stores/grove-store"
import { GROVE_CONFIG, TREE_TYPES } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface EnhancedTreeProps {
  tree: Tree
  isSelected?: boolean
  onClick?: (tree: Tree) => void
  animationDelay?: number
}

export function EnhancedTree({
  tree,
  isSelected = false,
  onClick,
  animationDelay = 0,
}: EnhancedTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const treeType = TREE_TYPES[tree.type]

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    // Create tree group
    const treeGroup = svg
      .append("g")
      .attr("class", "tree-group")
      .style("cursor", onClick ? "pointer" : "default")

    // Tree trunk
    const trunkHeight = 20 + tree.size * 15
    const trunkWidth = 4 + tree.size * 2

    treeGroup
      .append("rect")
      .attr("class", "tree-trunk")
      .attr("x", -trunkWidth / 2)
      .attr("y", -trunkHeight / 2)
      .attr("width", trunkWidth)
      .attr("height", trunkHeight)
      .attr("rx", trunkWidth / 4)
      .attr("fill", treeType.colors[0])
      .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")

    // Tree canopy layers
    const canopyRadius = 15 + tree.size * 8
    const layers = tree.type === "pine" ? 3 : tree.type === "willow" ? 2 : 4

    for (let i = 0; i < layers; i++) {
      const layerRadius = canopyRadius - i * ((canopyRadius / layers) * 0.2)
      const yOffset = -trunkHeight / 2 - layerRadius + i * 5
      const colorIndex = Math.min(i + 1, treeType.colors.length - 1)

      treeGroup
        .append("circle")
        .attr("class", `tree-canopy-layer-${i}`)
        .attr("cx", 0)
        .attr("cy", yOffset)
        .attr("r", layerRadius)
        .attr("fill", treeType.colors[colorIndex])
        .style("filter", "drop-shadow(0 1px 3px rgba(0,0,0,0.1))")
        .style("opacity", 0.9 - i * 0.1)
    }

    // Seasonal effects
    if (tree.seasonalEffects) {
      if (tree.seasonalEffects.autumn) {
        // Add falling leaves effect
        for (let i = 0; i < 3; i++) {
          treeGroup
            .append("circle")
            .attr("class", "falling-leaf")
            .attr("cx", Math.random() * 30 - 15)
            .attr("cy", Math.random() * 20 - 10)
            .attr("r", 2)
            .attr("fill", "#FF6B35")
            .style("opacity", 0.7)
        }
      }

      if (tree.seasonalEffects.spring) {
        // Add small flowers
        for (let i = 0; i < 2; i++) {
          treeGroup
            .append("circle")
            .attr("class", "flower")
            .attr("cx", Math.random() * 20 - 10)
            .attr("cy", -trunkHeight / 2 - 10 + Math.random() * 10)
            .attr("r", 3)
            .attr("fill", "#FFB6C1")
            .style("opacity", 0.8)
        }
      }
    }

    // Selection indicator
    if (isSelected) {
      treeGroup
        .append("circle")
        .attr("class", "selection-ring")
        .attr("cx", 0)
        .attr("cy", -trunkHeight / 2 - canopyRadius / 2)
        .attr("r", canopyRadius + 8)
        .attr("fill", "none")
        .attr("stroke", "#22C55E")
        .attr("stroke-width", 3)
        .attr("stroke-dasharray", "5,5")
        .style("opacity", 0.8)

      // Animate the selection ring
      treeGroup
        .select(".selection-ring")
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", -20)
        .on("end", function () {
          d3.select(this).attr("stroke-dashoffset", 0)
        })
    }

    // Add click handler
    if (onClick) {
      treeGroup.on("click", () => onClick(tree))
    }

    // Add hover effects
    treeGroup
      .on("mouseenter", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "scale(1.05)")
      })
      .on("mouseleave", function () {
        d3.select(this).transition().duration(200).attr("transform", "scale(1)")
      })

    // Growth animation for new trees
    if (tree.age < 1000) {
      // New tree (age in milliseconds since planted)
      treeGroup
        .attr("transform", "scale(0)")
        .transition()
        .delay(animationDelay)
        .duration(1500)
        .ease(d3.easeElastic.period(0.5))
        .attr("transform", "scale(1)")
    }
  }, [tree, isSelected, onClick, animationDelay, treeType])

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: animationDelay / 1000 }}
    >
      <svg
        ref={svgRef}
        width={tree.size * 80}
        height={tree.size * 80}
        viewBox="-40 -40 80 80"
        className={cn(
          "overflow-visible",
          isSelected && "ring-2 ring-primary ring-offset-2 rounded-full"
        )}
        style={{
          transform: `translate(${tree.x}px, ${tree.y}px)`,
        }}
      />
    </motion.g>
  )
}

interface GroveVisualizationProps {
  trees: Tree[]
  selectedTreeId?: string | null
  onTreeClick?: (tree: Tree) => void
  className?: string
}

export function GroveVisualization({
  trees,
  selectedTreeId,
  onTreeClick,
  className,
}: GroveVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full min-h-[400px] overflow-hidden rounded-lg",
        "bg-gradient-to-b from-sky-200 via-sky-100 to-green-100",
        "dark:from-sky-900 dark:via-sky-800 dark:to-green-900",
        className
      )}
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)
        `,
      }}
    >
      {/* Ground layer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-300 to-green-200 dark:from-green-800 dark:to-green-700"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 10px,
            rgba(0,0,0,0.05) 10px,
            rgba(0,0,0,0.05) 12px
          )`,
        }}
      />

      {/* Sun/Moon */}
      <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-yellow-300 dark:bg-gray-300 shadow-lg opacity-80" />

      {/* Trees container */}
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${GROVE_CONFIG.GROVE_WIDTH} ${GROVE_CONFIG.GROVE_HEIGHT}`}
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        {trees.map((tree, index) => (
          <foreignObject
            key={tree.id}
            x={tree.x - tree.size * 40}
            y={tree.y - tree.size * 40}
            width={tree.size * 80}
            height={tree.size * 80}
          >
            <EnhancedTree
              tree={tree}
              isSelected={selectedTreeId === tree.id}
              onClick={onTreeClick}
              animationDelay={index * 100}
            />
          </foreignObject>
        ))}
      </svg>

      {/* Empty state */}
      {trees.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-2xl font-semibold text-muted-foreground mb-2">
              Your Grove Awaits
            </h3>
            <p className="text-muted-foreground">
              Complete focus sessions to grow your first tree
            </p>
          </div>
        </div>
      )}

      {/* Grove stats overlay */}
      <div className="absolute top-4 left-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
        <div className="text-sm font-medium">Trees: {trees.length}</div>
        <div className="text-xs text-muted-foreground">
          Grove Health: {trees.length > 0 ? Math.min(100, trees.length * 2) : 0}
          %
        </div>
      </div>
    </div>
  )
}
