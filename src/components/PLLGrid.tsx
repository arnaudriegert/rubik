import LastLayerGrid, { GridSize } from './LastLayerGrid'
import { pllToColors } from '../utils/pllToColors'
import { PLLCase } from '../data/pllCases'
import { rotatePLLColors } from '../utils/rotateColors'
import { Color } from '../types/cube'

interface PLLGridProps {
  pllCase: PLLCase
  size?: GridSize
  selectedColor?: Color
}

/**
 * PLLGrid - Specialized grid for PLL cases
 * @param pllCase - The PLL case containing side colors
 * @param size - 'normal' (default) or 'compact' for smaller display
 * @param selectedColor - The target color to rotate to (optional)
 */
export default function PLLGrid({
  pllCase, size = 'normal', selectedColor,
}: PLLGridProps) {
  // Apply color rotation if a different color is selected
  const sideColors = selectedColor && selectedColor !== pllCase.referenceColor
    ? rotatePLLColors(pllCase, selectedColor)
    : pllCase.sideColors

  const colors = pllToColors({
    ...pllCase,
    sideColors,
  })
  return <LastLayerGrid colors={colors} size={size} />
}
