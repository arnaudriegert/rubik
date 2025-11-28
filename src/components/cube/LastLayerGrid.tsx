import { LastLayerColors } from '../../types/cube'
import { GridSize } from './constants'
import Face from './Face'
import SideRow from './SideRow'

interface LastLayerGridProps {
  colors: LastLayerColors
  size?: GridSize
}

/**
 * LastLayerGrid - Displays the last layer of a Rubik's cube (top-down view)
 * Used for OLL and PLL pattern visualization
 */
export default function LastLayerGrid({
  colors,
  size = 'normal',
}: LastLayerGridProps) {
  return (
    <div className="inline-flex flex-col items-center gap-1">
      {/* Back side */}
      <SideRow colors={colors.back} side="back" size={size} />

      {/* Middle row: Left + Top face + Right */}
      <div className="flex flex-row gap-1 items-center">
        <SideRow colors={colors.left} side="left" size={size} />
        <Face colors={colors.top} size={size} />
        <SideRow colors={colors.right} side="right" size={size} />
      </div>

      {/* Front side */}
      <SideRow colors={colors.front} side="front" size={size} />
    </div>
  )
}
