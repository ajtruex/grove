import React, { memo } from "react"
import { useGroveManager } from "../hooks/useGroveManager"
import { Button } from "./ui/Button"
import { Badge } from "./ui/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import Tree from "./ui/Tree"
import { GROVE_WIDTH, GROVE_HEIGHT } from "../constants"

const GroveVisualization = memo(({ trees }) => (
  <div className="relative flex-1 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-green-100">
    <svg
      viewBox={`0 0 ${GROVE_WIDTH} ${GROVE_HEIGHT}`}
      width="100%"
      height="100%"
      className="block"
      role="img"
      aria-label={`Grove visualization with ${trees.length} trees`}
    >
      {/* Sky */}
      <rect width={GROVE_WIDTH} height={GROVE_HEIGHT} fill="#87CEEB" />
      {/* Ground */}
      <rect y="350" width={GROVE_WIDTH} height="50" fill="#90EE90" />
      {/* Trees */}
      {trees.map((tree, index) => (
        <Tree
          key={tree.id || index}
          x={tree.x}
          y={tree.y}
          size={tree.size}
          id={tree.id || index}
        />
      ))}
    </svg>
  </div>
))

GroveVisualization.displayName = "GroveVisualization"

function Grove() {
  const { trees, isTimerActive, addTree } = useGroveManager()

  const treeCount = trees.length
  const treeText = treeCount === 1 ? "Tree" : "Trees"

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Your Grove</CardTitle>
          <Badge variant="default">
            {treeCount} {treeText}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <GroveVisualization trees={trees} />
        <Button
          onClick={addTree}
          disabled={isTimerActive}
          className="mt-4 w-full"
          size="lg"
          aria-label="Grow a new tree"
        >
          {isTimerActive ? "Focus in progress..." : "Grow a Tree"}
        </Button>
      </CardContent>
    </Card>
  )
}

export default memo(Grove)
