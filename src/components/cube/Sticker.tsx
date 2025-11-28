import { useMemo } from 'react'
import { Color } from '../../types/cube'
import { colorToTailwind } from '../../utils/colors'
import {
  type GridSize,
  STICKER_CLASSES,
  SIDE_HORIZONTAL_CLASSES,
  SIDE_VERTICAL_CLASSES,
} from './constants'

// Border radius classes for top face stickers (CSS grid positions 0-8)
const topFaceBorderRadius: Record<number, string> = {
  1: 'rounded-b-xl',  // top-middle
  3: 'rounded-r-xl',  // middle-left
  4: 'rounded-2xl',   // center
  5: 'rounded-l-xl',  // middle-right
  7: 'rounded-t-xl',  // bottom-middle
}

export type StickerLocation = 'top' | 'back' | 'front' | 'left' | 'right'

const middleBorderRadius: Record<Exclude<StickerLocation, 'top'>, string> = {
  back: 'rounded-t-xl',
  front: 'rounded-b-xl',
  left: 'rounded-l-xl',
  right: 'rounded-r-xl',
}

interface StickerProps {
  color: Color
  location: StickerLocation
  position?: number // Position within the face (0-8 for top, 0-2 for sides)
  size?: GridSize
  className?: string
}

export default function Sticker({
  color,
  location,
  position = 0,
  size = 'normal',
  className = '',
}: StickerProps) {
  const bgColor = colorToTailwind[color] || colorToTailwind[Color.GRAY]

  // Determine size classes based on location
  const sizeClasses = useMemo(() => {
    if (location === 'top') {
      return STICKER_CLASSES[size]
    } else if (location === 'back' || location === 'front') {
      return SIDE_HORIZONTAL_CLASSES[size]
    } else {
      return SIDE_VERTICAL_CLASSES[size]
    }
  }, [location, size])

  // Determine border radius based on location and position
  const borderRadius = useMemo(() => {
    if (location === 'top') {
      return topFaceBorderRadius[position] || 'rounded-sm'
    } else if (position === 1) {
      return middleBorderRadius[location]
    } else {
      return 'rounded-sm'
    }
  }, [location, position])

  return (
    <div
      className={`${sizeClasses} ${borderRadius} ${bgColor} ${className}`}
    />
  )
}
