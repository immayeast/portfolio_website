import { experience, toolkit } from '../content'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

export function Experience() {
  return (
    <section id="experience" className="page-x scroll-mt-20 py-24 sm:py-32">
      <div className="lg:pr-[18vw]">
        <SectionHeader numeral="III" title="Experience" time="09:00" />

        <Reveal className="mb-12 sm:mb-16">
          <h2 className="font-serif text-headline">
            Time <em className="text-brass">well</em> spent
          </h2>
        </Reveal>

        <ol className="border-b border-line">
          {experience.map((e, i) => (
            <Reveal
              as="li"
              key={`${e.org}-${e.start}`}
              delay={i * 0.05}
              className="grid gap-2 border-t border-line py-7 sm:grid-cols-[10rem_1fr] md:grid-cols-[10rem_1fr_1fr] md:gap-8"
            >
              <span className="label pt-1 tabular-nums">
                {e.start} — {e.end}
              </span>
              <span>
                <span className="block font-serif text-[1.75rem] leading-tight">{e.title}</span>
                <span className="text-sm text-muted">{e.org}</span>
              </span>
              <span className="text-[15px] leading-relaxed text-muted sm:col-start-2 md:col-start-auto md:pt-1.5">
                {e.detail}
              </span>
            </Reveal>
          ))}
        </ol>

        <div className="mt-20 grid gap-10 sm:grid-cols-3">
          {toolkit.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.08}>
              <p className="label mb-4">{g.group}</p>
              <ul className="space-y-1.5 text-[15px]">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
