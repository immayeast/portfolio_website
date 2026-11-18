import { motion } from 'framer-motion'
import { hero, site } from '../content'
import { RiseLines } from './Reveal'
import { formatTime, useNow } from '../hooks/useNow'

function LiveTime() {
  const now = useNow()
  return (
    <span className="tabular-nums text-ink" aria-label="Current time">
      {formatTime(now, site.timezone)}
    </span>
  )
}

const fade = (delay) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay },
})

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col pb-10 pt-[40svh] sm:pb-12 lg:justify-center lg:pb-0 lg:pt-24"
    >
      <div className="page-x">
        <div className="lg:max-w-[54vw]">
          <motion.p className="label mb-6 sm:mb-8" {...fade(0.1)}>
            <LiveTime />
            <span className="mx-2 text-faint">—</span>
            {hero.eyebrow}
          </motion.p>

          <h1 className="font-serif text-[clamp(3.25rem,7.4vw,7.75rem)] leading-[0.92] tracking-[-0.02em]">
            <RiseLines
              lines={hero.headline}
              immediate
              delay={0.2}
              lineClassName={(i) => (i === 1 ? 'italic text-brass' : '')}
            />
          </h1>

          <div className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-10">
            <motion.p className="max-w-md text-[17px] leading-relaxed text-muted" {...fade(0.55)}>
              {hero.intro}
            </motion.p>
            <motion.div className="flex flex-col gap-3 text-[15px] leading-relaxed" {...fade(0.65)}>
              <p className="flex items-start gap-2.5">
                <span className="relative mt-[9px] flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inset-0 animate-ping rounded-full bg-brass opacity-60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-brass" />
                </span>
                {hero.currently}
              </p>
              <p className="label">
                {site.role} · {site.location}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.a
        href="#about"
        className="page-x mt-12 flex items-center gap-4 lg:absolute lg:bottom-10 lg:left-0 lg:right-0 lg:mt-0"
        {...fade(0.9)}
      >
        <span className="relative h-px w-16 overflow-hidden bg-line">
          <motion.span
            className="absolute inset-y-0 left-0 w-1/2 bg-ink"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <span className="label">Scroll to wind the clock</span>
      </motion.a>
    </section>
  )
}
