import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../content'
import { useStore } from '../store/useStore'
import { ticker } from '../utils/audio'
import { formatTime, useNow, zoneLabel } from '../hooks/useNow'

const sections = [
  { id: 'about', numeral: 'I', label: 'About' },
  { id: 'work', numeral: 'II', label: 'Work' },
  { id: 'experience', numeral: 'III', label: 'Experience' },
  { id: 'contact', numeral: 'IV', label: 'Contact' },
]

function useActiveSection() {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return active
}

function LocalTime() {
  const now = useNow()
  return (
    <span className="label tabular-nums">
      {formatTime(now, site.timezone)} <span className="text-faint">{zoneLabel(now, site.timezone)}</span>
    </span>
  )
}

function SoundToggle() {
  const soundOn = useStore((s) => s.soundOn)
  const toggleSound = useStore((s) => s.toggleSound)
  return (
    <button
      type="button"
      onClick={() => {
        ticker.unlock()
        toggleSound()
      }}
      aria-pressed={soundOn}
      className="label flex items-center gap-2 transition-colors hover:text-ink"
    >
      <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`w-[2px] bg-current transition-all duration-300 ${soundOn ? 'animate-pulse' : ''}`}
            style={{ height: soundOn ? `${[60, 100, 40][i]}%` : '20%', animationDelay: `${i * 150}ms` }}
          />
        ))}
      </span>
      Sound {soundOn ? 'on' : 'off'}
    </button>
  )
}

export function Nav() {
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled ? 'border-b border-line bg-paper/80 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className="page-x flex h-14 items-center justify-between gap-6 sm:h-16">
          <a href="#top" className="font-serif text-xl leading-none tracking-tight">
            {site.name}
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`label flex items-baseline gap-1.5 transition-colors hover:text-ink ${
                  active === s.id ? 'text-ink' : ''
                }`}
              >
                <span className="text-faint">{s.numeral}</span>
                {s.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 md:flex">
            <LocalTime />
            <SoundToggle />
          </div>

          <button
            type="button"
            className="label text-ink md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col bg-paper md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="page-x flex h-14 items-center justify-between">
              <span className="font-serif text-xl">{site.name}</span>
              <button type="button" className="label text-ink" onClick={() => setMenuOpen(false)}>
                Close
              </button>
            </div>
            <nav aria-label="Sections" className="page-x mt-10 flex flex-col">
              {sections.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 border-t border-line py-5 font-serif text-5xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
                >
                  <span className="label w-8">{s.numeral}</span>
                  {s.label}
                </motion.a>
              ))}
            </nav>
            <div className="page-x mt-auto flex items-center justify-between border-t border-line py-5">
              <LocalTime />
              <SoundToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
