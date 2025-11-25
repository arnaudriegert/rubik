import { ollCategories, OLLCase } from '../data/ollCases'
import OLLGrid from '../components/OLLGrid'

function AlgorithmText({ text }: { text: string }) {
  // Parse text for {shorthand}, ~strikethrough~, **highlight**, and [rotation] markers
  const parts = text.split(/(~[^~]+~|\*\*[^*]+\*\*|\[[^\]]+\]|\{[^}]+\})/g)

  return (
    <>
      {parts.map((part, i) => {
        if (part.match(/^~.+~$/)) {
          // Strikethrough text (simplified away)
          return (
            <span key={i} className="line-through opacity-50">
              {part.slice(1, -1)}
            </span>
          )
        } else if (part.match(/^\*\*.+\*\*$/)) {
          // Highlighted result text (simplification result)
          return (
            <span key={i} className="font-bold text-blue-600">
              {part.slice(2, -2)}
            </span>
          )
        } else if (part.match(/^\[.+\]$/)) {
          // Rotation notation
          return (
            <span key={i} className="text-purple-600">
              {part}
            </span>
          )
        } else if (part.match(/^\{.+\}$/)) {
          // Shorthand notation (italic)
          return <em key={i}>{part.slice(1, -1)}</em>
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

function OLLCaseCard({ ollCase }: { ollCase: OLLCase }) {
  return (
    <div className="group oll-case-card">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          OLL {ollCase.number} - {ollCase.name}
        </h3>

        <div className="mb-6">
          <OLLGrid orientations={ollCase.orientations} />
        </div>

        <div className="w-full space-y-2">
          {ollCase.algorithms.map((algorithm, i) => {
            const displayText = algorithm.shorthand || algorithm.full
            return (
              <div key={i} className="algorithm-box text-center group-hover:algorithm-box-hover">
                <div className="group-hover:hidden">
                  <AlgorithmText text={displayText} />
                </div>
                <div className="hidden group-hover:block">
                  <AlgorithmText text={algorithm.full} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function OLL() {
  return (
    <div className="page-bg">
      <div className="sticky top-0 z-20">
        <header className="header-gradient text-center py-10">
          <h1 className="text-4xl font-bold mb-2">
            OLL - Orientation of Last Layer
          </h1>
          <p className="text-slate-300 text-sm">
            Orient all pieces on the last layer
          </p>
        </header>

        <nav className="section-nav">
          <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
            <span className="text-slate-500 text-sm self-center mr-2">Jump to:</span>
            {ollCategories.map((category) => (
              <a
                key={category.name}
                href={`#${category.name.replace(/\s+/g, '-').toLowerCase()}`}
                className="section-nav-link"
              >
                {category.name}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <main className="max-w-5xl mx-auto px-8 py-8 my-8">
        {ollCategories.map((category, categoryIndex) => (
          <section key={categoryIndex} id={category.name.replace(/\s+/g, '-').toLowerCase()} className="section-card">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{category.name}</h2>
            <p className="text-gray-700 italic mb-8">{category.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(() => {
                const rendered = []
                let position = 0 // Track grid position (0 = left, 1 = right, then wraps)

                for (const entry of category.cases) {
                  const isRelatedPair = entry.length === 2

                  // If this is a related pair and we're at position 1 (right column),
                  // add a spacer to push the pair to the next row
                  if (isRelatedPair && position === 1) {
                    rendered.push(<div key={`spacer-${entry[0].number}`} className="hidden md:block" />)
                    position = (position + 1) % 2 // Spacer also takes a position
                  }

                  // Render related pairs in a subgrid wrapper, singles normally
                  if (isRelatedPair) {
                    // Related pair: wrap both in a container that spans 2 columns
                    rendered.push(
                      <div key={entry[0].number} className="md:col-span-2">
                        <div className="border-2 border-blue-200 rounded-lg bg-blue-50/30 p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                          <OLLCaseCard ollCase={entry[0]} />
                          <OLLCaseCard ollCase={entry[1]} />
                        </div>
                      </div>,
                    )
                    position = 0 // After a pair spanning 2 cols, we're back at position 0
                  } else {
                    // Single case
                    rendered.push(
                      <div key={entry[0].number}>
                        <OLLCaseCard ollCase={entry[0]} />
                      </div>,
                    )
                    position = (position + 1) % 2
                  }
                }

                return rendered
              })()}
            </div>
          </section>
        ))}
      </main>

      <footer className="text-center py-6 text-gray-600">
        <p>&copy; 2025 CFOP Learning Guide</p>
      </footer>
    </div>
  )
}
