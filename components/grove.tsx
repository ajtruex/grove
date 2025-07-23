"use client"

import React from "react"
import { motion } from "framer-motion"
import { Trees, Plus, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GroveVisualization } from "@/components/ui/enhanced-tree"
import { useGroveStore } from "@/lib/stores/grove-store"
import { generateTreePosition } from "@/lib/utils"
import { GROVE_CONFIG, TREE_TYPES } from "@/lib/constants"

export function Grove() {
  const { trees, selectedTree, selectTree, addTree, isTimerActive } =
    useGroveStore()

  const handleAddTree = () => {
    if (isTimerActive) return

    const position = generateTreePosition(
      GROVE_CONFIG.GROVE_WIDTH,
      GROVE_CONFIG.GROVE_HEIGHT,
      trees
    )

    const treeTypes = Object.keys(TREE_TYPES) as Array<keyof typeof TREE_TYPES>
    const randomType = treeTypes[Math.floor(Math.random() * treeTypes.length)]

    addTree({
      x: position.x,
      y: position.y,
      size: 0.8 + Math.random() * 0.6,
      type: randomType,
    })
  }

  const handleTreeClick = (tree: any) => {
    selectTree(selectedTree === tree.id ? null : tree.id)
  }

  const getGroveHealthColor = () => {
    const health = Math.min(100, trees.length * 2)
    if (health >= 80) return "success"
    if (health >= 50) return "warning"
    return "destructive"
  }

  const getGroveHealthText = () => {
    const health = Math.min(100, trees.length * 2)
    if (health >= 80) return "Thriving"
    if (health >= 50) return "Growing"
    if (health >= 20) return "Budding"
    return "Seedling"
  }

  return (
    <Card className="h-full min-h-[500px] flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trees className="h-6 w-6 text-green-600" />
            <CardTitle>Your Digital Grove</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <span className="text-lg">🌳</span>
              {trees.length} {trees.length === 1 ? "Tree" : "Trees"}
            </Badge>
            <Badge variant={getGroveHealthColor()}>
              {getGroveHealthText()} Grove
            </Badge>
          </div>
        </div>

        {selectedTree && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 bg-muted/50 rounded-lg"
          >
            {(() => {
              const tree = trees.find((t) => t.id === selectedTree)
              if (!tree) return null

              const treeType = TREE_TYPES[tree.type]
              const age = Math.floor(
                (Date.now() - new Date(tree.plantedAt).getTime()) /
                  (1000 * 60 * 60 * 24)
              )

              return (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium capitalize">
                      {treeType.name} Tree
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Age: {age} days • Size: {(tree.size * 100).toFixed(0)}%
                    </p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {treeType.rarity}
                  </Badge>
                </div>
              )
            })()}
          </motion.div>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Grove Visualization */}
        <div className="flex-1 min-h-[400px]">
          <GroveVisualization
            trees={trees}
            selectedTreeId={selectedTree}
            onTreeClick={handleTreeClick}
            className="w-full h-full"
          />
        </div>

        {/* Grove Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleAddTree}
              disabled={
                isTimerActive ||
                trees.length >= GROVE_CONFIG.MAX_TREES_PER_GROVE
              }
              size="lg"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Plant Tree
            </Button>

            {trees.length >= GROVE_CONFIG.MAX_TREES_PER_GROVE && (
              <Badge variant="warning" className="text-xs">
                Grove Full
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {isTimerActive ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Focus session in progress...
              </motion.div>
            ) : (
              <span>Complete focus sessions to grow trees automatically</span>
            )}
          </div>
        </div>

        {/* Grove Statistics */}
        {trees.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t"
          >
            {Object.entries(TREE_TYPES).map(([type, config]) => {
              const count = trees.filter((t) => t.type === type).length
              return (
                <div key={type} className="text-center">
                  <div className="text-2xl font-bold text-primary">{count}</div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {config.name} {count === 1 ? "Tree" : "Trees"}
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
