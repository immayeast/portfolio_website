import { useState } from 'react'
import { contact, site } from '../content'
import { Reveal, RiseLines } from './Reveal'
import { SectionHeader } from './SectionHeader'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="label transition-colors hover:text-ink"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(site.email)
          setCopied(true)
          setTimeout(() => setCopied(false), 1800)
        } catch {
          /* clipboard unavailable */
        }
      }}
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  )
}

export function Contact() {
  return (
    <section id="contact" className="page-x scroll-mt-20 pt-24 sm:pt-32">
      <SectionHeader numeral="IV" title="Contact" time="12:00" />

      <div className="lg:max-w-[56vw]">
        <h2 className="font-serif text-[clamp(2.75rem,6.4vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
          <RiseLines lines={contact.headline} lineClassName={(i) => (i === 1 ? 'italic text-brass' : '')} />
        </h2>

        <Reveal className="mt-8 max-w-md text-[17px] leading-relaxed text-muted">
          <p>{contact.note}</p>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <a
            href={`mailto:${site.email}`}
            className="break-all font-serif text-[clamp(1.75rem,3.4vw,3rem)] leading-none underline decoration-line decoration-1 underline-offset-[0.18em] transition-colors hover:decoration-ink"
          >
            {site.email}
          </a>
          <CopyEmail />
        </Reveal>

        <Reveal className="mt-12">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="link-underline text-[15px]">
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="label mt-8 flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
            {site.availability}
          </p>
        </Reveal>
      </div>

      <footer className="mt-32 flex flex-col gap-4 border-t border-line py-6 sm:mt-40 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="label">Built with React &amp; Three.js</p>
        <a href="#top" className="label text-ink">
          Back to now <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </section>
  )
}
