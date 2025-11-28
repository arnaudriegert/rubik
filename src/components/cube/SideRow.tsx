import { useMemo } from 'react'
import { SideRowColors } from '../../types/cube'
import { GridSize, GRID_SPACING_CLASS } from './constants'
import Sticker from './Sticker'

interface SideRowProps {
  colors: SideRowColors
  side: 'back' | 'front' | 'left' | 'right'
  size?: GridSize
  className?: string
}

export default function SideRow({
  colors,
  side,
  size = 'normal',
  className = '',
}: SideRowProps) {
  const isVertical = side === 'left' || side === 'right'
  const layout = isVertical ? 'flex-col' : 'flex-row'
  const borderRadius = useMemo(() => {
    switch (side) {
      case 'back':
        return 'rounded-t-sm'
      case 'front':
        return 'rounded-b-sm'
      case 'left':
        return 'rounded-l-sm'
      case 'right':
        return 'rounded-r-sm'
    }
  }, [side])

  return (
    <div className={`flex ${layout} ${GRID_SPACING_CLASS} bg-gray-800 ${borderRadius} ${className}`}>
      {colors.map((color, i) => (
        <Sticker
          key={i}
          color={color}
          location={side}
          position={i}
          size={size}
        />
      ))}
    </div>
  )
}
