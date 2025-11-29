import { LastLayerGrid, GridSize } from './cube'
import { pllToColors } from '../utils/pllToColors'
import { PLLCase } from '../data/pllCases'
import { rotatePLLColors } from '../utils/rotateColors'
import { Color } from '../types/cube'
import PLLArrowOverlay from './PLLArrowOverlay'

interface PLLGridProps {
  pllCase: PLLCase
  size?: GridSize
  selectedColor?: Color
  showArrows?: boolean
}

/**
 * PLLGrid - Specialized grid for PLL cases
 * @param pllCase - The PLL case containing side colors
 * @param size - 'normal' (default) or 'compact' for smaller display
 * @param selectedColor - The target color to rotate to (optional)
 * @param showArrows - Show swap/cycle arrows overlay (default false)
 */
export default function PLLGrid({
  pllCase, size = 'normal', selectedColor, showArrows = false,
}: PLLGridProps) {
  // Apply color rotation if a different color is selected (all cases use blue as reference)
  const sideColors = selectedColor && selectedColor !== Color.BLUE
    ? rotatePLLColors(pllCase, selectedColor)
    : pllCase.sideColors

  const colors = pllToColors({
    ...pllCase,
    sideColors,
  })

  return (
    <div className="relative">
      <LastLayerGrid colors={colors} size={size} />
      {showArrows && pllCase.swaps && (
        <PLLArrowOverlay swaps={pllCase.swaps} size={size} />
      )}
    </div>
  )
}
