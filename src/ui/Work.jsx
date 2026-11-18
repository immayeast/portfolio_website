import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { categories, projects } from '../content'
import { useStore } from '../store/useStore'
import { ProjectCover } from './ProjectCover'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

function Filters({ value, onChange }) {
  const counts = useMemo(() => {
    const c = { All: projects.length }
    categories.forEach((cat) => (c[cat] = projects.filter((p) => p.category === cat).length))
    return c
  }, [])

  return (
    <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label="Filter projects">
      {['All', ...categories].map((cat) => {
        const on = value === cat
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            aria-pressed={on}
            className={`label transition-colors hover:text-ink ${on ? 'text-ink' : ''}`}
          >
            <span className={on ? 'border-b border-ink pb-0.5' : ''}>{cat}</span>
            <sup className="ml-1 text-faint">{counts[cat]}</sup>
          </button>
        )
      })}
    </div>
  )
}

export function Work() {
  const [filter, setFilter] = useState('All')
  const [hovered, setHovered] = useState(null)
  const openProject = useStore((s) => s.openProject)

  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  // Cursor-following preview (fine pointers only, via CSS)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })
  const hoveredProject = projects.find((p) => p.slug === hovered)

  return (
    <section id="work" className="page-x scroll-mt-20 py-24 sm:py-32">
      <div className="lg:pr-[18vw]">
        <SectionHeader numeral="II" title="Selected work" time="06:00" />

        <Reveal className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
          <h2 className="font-serif text-headline">
            A record of <em className="text-brass">recent</em> work
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Software, product, visual and experimental projects, newest first. Select one to open the case study.
          </p>
        </Reveal>

        <Filters value={filter} onChange={setFilter} />

        <ul
          className="relative border-b border-line"
          onPointerMove={(e) => {
            x.set(e.clientX)
            y.set(e.clientY)
          }}
          onPointerLeave={() => setHovered(null)}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((p) => {
              const index = projects.indexOf(p) + 1
              const dim = hovered && hovered !== p.slug
              return (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="border-t border-line"
                >
                  <button
                    type="button"
                    onClick={() => openProject(p.slug)}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(p.slug)}
                    onFocus={() => setHovered(null)}
                    className={`group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 text-left transition-opacity duration-300 sm:grid-cols-[3.5rem_1fr_9rem_4rem_1.5rem] sm:py-8 ${
                      dim ? 'opacity-35' : 'opacity-100'
                    }`}
                  >
                    <span className="label tabular-nums">{String(index).padStart(2, '0')}</span>
                    <span className="min-w-0">
                      <span className="block font-serif text-[clamp(1.9rem,3.6vw,3.25rem)] leading-none transition-transform duration-500 ease-out group-hover:translate-x-2">
                        {p.title}
                      </span>
                      <span className="mt-2 block text-sm text-muted sm:max-w-md">{p.summary}</span>
                    </span>
                    <span className="label hidden sm:block">{p.category}</span>
                    <span className="label tabular-nums">{p.year}</span>
                    <span
                      className="hidden text-lg transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 sm:block"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </button>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      </div>

      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            key="preview"
            className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[15rem] w-[21rem] overflow-hidden shadow-[0_30px_60px_-20px_rgba(26,24,20,0.35)] [@media(hover:hover)]:block"
            style={{ x: sx, y: sy, translateX: '-50%', translateY: '-115%' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              key={hoveredProject.slug}
              className="absolute inset-0"
              initial={{ opacity: 0.5, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <ProjectCover project={hoveredProject} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
