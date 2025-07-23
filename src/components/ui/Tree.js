import React, { memo } from "react"

const TreeSVG = memo(({ x, y, size, id, style }) => {
  // Generate consistent but varied colors based on tree ID
  const seed = parseInt(id.toString().slice(-6), 16) || 1
  const hue = (seed % 60) + 100 // Green range
  const saturation = 40 + (seed % 30) // 40-70%
  const lightness = 35 + (seed % 20) // 35-55%

  const trunkColor = "#8B4513"
  const leafColor1 = `hsl(${hue}, ${saturation}%, ${lightness}%)`
  const leafColor2 = `hsl(${hue + 10}, ${saturation + 10}%, ${lightness + 10}%)`
  const leafColor3 = `hsl(${hue + 20}, ${saturation + 5}%, ${lightness + 15}%)`

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${size})`}
      className="animate-grow-in"
      style={style}
    >
      {/* Tree trunk */}
      <rect x="-5" y="20" width="10" height="30" rx="2" fill={trunkColor} />

      {/* Main canopy */}
      <circle cx="0" cy="0" r="20" fill={leafColor1} />

      {/* Left branch */}
      <circle cx="-12" cy="-5" r="12" fill={leafColor2} />

      {/* Right branch */}
      <circle cx="12" cy="-5" r="12" fill={leafColor2} />

      {/* Top canopy */}
      <circle cx="0" cy="-15" r="12" fill={leafColor3} />
    </g>
  )
})

TreeSVG.displayName = "TreeSVG"

export default TreeSVG
