import { about } from '../content'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

export function About() {
  return (
    <section id="about" className="page-x scroll-mt-20 py-24 sm:py-32">
      <div className="lg:pr-[18vw]">
        <SectionHeader numeral="I" title="About" time="03:00" />

        <Reveal>
          <p className="max-w-4xl font-serif text-[clamp(1.85rem,3.6vw,3.25rem)] leading-[1.12] tracking-[-0.01em]">
            {about.statement}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:mt-24 md:grid-cols-12 md:gap-10">
          <div className="space-y-5 text-[16px] leading-relaxed text-muted md:col-span-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <Reveal>
              <p className="label mb-4">Disciplines</p>
            </Reveal>
            <ul>
              {about.disciplines.map((d, i) => (
                <Reveal
                  as="li"
                  key={d.title}
                  delay={i * 0.06}
                  className="flex items-baseline justify-between gap-6 border-t border-line py-4 last:border-b"
                >
                  <span className="font-serif text-2xl">{d.title}</span>
                  <span className="text-right text-sm text-muted">{d.detail}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
