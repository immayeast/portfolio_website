import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../content'
import { useStore } from '../store/useStore'
import { ProjectCover } from './ProjectCover'

const ease = [0.2, 0.7, 0.2, 1]

function Meta({ label, value }) {
  return (
    <div className="border-t border-line pt-3">
      <dt className="label mb-1">{label}</dt>
      <dd className="text-[15px]">{value}</dd>
    </div>
  )
}

function Panel({ project }) {
  const closeProject = useStore((s) => s.closeProject)
  const openProject = useStore((s) => s.openProject)
  const closeRef = useRef(null)
  const scrollRef = useRef(null)

  const i = projects.indexOf(project)
  const next = projects[(i + 1) % projects.length]

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })
    scrollRef.current?.scrollTo({ top: 0 })
  }, [project.slug])

  return (
    <motion.div
      ref={scrollRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-title"
      className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto overscroll-contain bg-paper sm:w-[min(46rem,92vw)] sm:border-l sm:border-line"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-line bg-paper/90 px-4 backdrop-blur-md sm:h-16 sm:px-10">
        <span className="label tabular-nums">
          Case study {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
        <button ref={closeRef} type="button" onClick={closeProject} className="label text-ink">
          Close <span aria-hidden="true">✕</span>
        </button>
      </div>

      <article className="px-4 pb-16 pt-10 sm:px-10 sm:pt-14">
        <p className="label mb-4">
          {project.category} · {project.year}
        </p>
        <h2 id="case-title" className="font-serif text-headline">
          {project.title}
        </h2>
        <p className="mt-6 max-w-xl font-serif text-2xl leading-snug text-muted">{project.summary}</p>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          <Meta label="Year" value={project.year} />
          <Meta label="Client" value={project.client} />
          <Meta label="Role" value={project.role} />
          <Meta label="Discipline" value={project.category} />
        </dl>

        <div className="mt-10 aspect-[16/10] w-full">
          <ProjectCover project={project} large />
        </div>

        <div className="mt-14 space-y-12">
          {[
            ['The challenge', project.challenge],
            ['The approach', project.approach],
            ['The outcome', project.outcome],
          ].map(([label, body]) => (
            <section key={label} className="grid gap-3 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <h3 className="label pt-1.5">{label}</h3>
              <p className="text-[17px] leading-relaxed">{body}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm text-paper transition-opacity hover:opacity-85"
          >
            Visit project <span aria-hidden="true">↗</span>
          </a>
        )}

        <button
          type="button"
          onClick={() => openProject(next.slug)}
          className="group mt-20 block w-full border-t border-line pt-6 text-left"
        >
          <span className="label">Next project</span>
          <span className="mt-2 flex items-baseline justify-between font-serif text-4xl sm:text-5xl">
            {next.title}
            <span className="text-2xl transition-transform duration-500 group-hover:translate-x-2" aria-hidden="true">
              →
            </span>
          </span>
        </button>
      </article>
    </motion.div>
  )
}

export function CaseStudy() {
  const activeProject = useStore((s) => s.activeProject)
  const closeProject = useStore((s) => s.closeProject)
  const project = projects.find((p) => p.slug === activeProject)
  const lastFocus = useRef(null)
  const isOpen = Boolean(project)

  useEffect(() => {
    if (!isOpen) return
    lastFocus.current = document.activeElement
    const onKey = (e) => e.key === 'Escape' && closeProject()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      lastFocus.current?.focus?.({ preventScroll: true })
    }
  }, [isOpen, closeProject])

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="scrim"
            className="fixed inset-0 z-50 bg-ink/25 backdrop-blur-[2px]"
            onClick={closeProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <Panel key="panel" project={project} />
        </>
      )}
    </AnimatePresence>
  )
}
