// Grid size variants
const GRID_SIZES = ['normal', 'medium', 'compact'] as const
export type GridSize = (typeof GRID_SIZES)[number]

// Base measurements in Tailwind spacing units (1 unit = 0.25rem)
export const STICKER_TW: Record<GridSize, number> = {
  normal: 12, // 3rem
  medium: 8, // 2rem
  compact: 4, // 1rem
}

// Shorter dimension for side stickers (~2/3 ratio, constrained by Tailwind values)
export const SIDE_SHORT_TW: Record<GridSize, number> = {
  normal: 8,
  medium: 5,
  compact: 2,
}

// Grid gap/padding in Tailwind units
export const GRID_GAP_TW = 0.5

// Derived: Convert Tailwind units to rem
const twToRem = (tw: number) => tw * 0.25

// Derived: Face size in rem (3 stickers + gap/padding)
export const FACE_SIZE_REM = Object.fromEntries(
  GRID_SIZES.map((size) => [size, 3 * twToRem(STICKER_TW[size]) + 0.5]),
) as Record<GridSize, number>

// Derived: Tailwind class strings
export const STICKER_CLASSES = Object.fromEntries(
  GRID_SIZES.map((size) => [size, `size-${STICKER_TW[size]}`]),
) as Record<GridSize, string>

export const SIDE_HORIZONTAL_CLASSES = Object.fromEntries(
  GRID_SIZES.map((size) => [
    size,
    `w-${STICKER_TW[size]} h-${SIDE_SHORT_TW[size]}`,
  ]),
) as Record<GridSize, string>

export const SIDE_VERTICAL_CLASSES = Object.fromEntries(
  GRID_SIZES.map((size) => [
    size,
    `w-${SIDE_SHORT_TW[size]} h-${STICKER_TW[size]}`,
  ]),
) as Record<GridSize, string>

export const GRID_SPACING_CLASS = `gap-${GRID_GAP_TW} p-${GRID_GAP_TW}`
