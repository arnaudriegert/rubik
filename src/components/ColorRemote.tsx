import { Color } from '../types/cube'
import { SIDE_COLORS, colorToTailwind } from '../utils/colors'

interface ColorRemoteProps {
  selectedColor: Color
  onColorSelect: (color: Color) => void
}

export default function ColorRemote({
  selectedColor,
  onColorSelect,
}: ColorRemoteProps) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 bg-gray-900/80 backdrop-blur-sm rounded-full px-2 py-3 shadow-lg">
      {SIDE_COLORS.map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          className={`size-8 rounded-full ${colorToTailwind[color]} transition-all ${
            selectedColor === color
              ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110'
              : 'hover:scale-105 opacity-70 hover:opacity-100'
          }`}
          aria-label={`Show ${color} color variant`}
          aria-pressed={selectedColor === color}
        />
      ))}
    </div>
  )
}
