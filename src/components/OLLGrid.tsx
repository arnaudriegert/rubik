import LastLayerGrid from './LastLayerGrid'
import { ollToColors } from '../utils/ollToColors'
import { OLLOrientations } from '../types/cube'

interface OLLGridProps {
  orientations: OLLOrientations;
}

/**
 * OLLGrid - Specialized grid for OLL cases
 * @param orientations - Tuple of 9 orientations (one per top face sticker)
 */
export default function OLLGrid({ orientations }: OLLGridProps) {
  const colors = ollToColors(orientations)
  return <LastLayerGrid colors={colors} />
}
