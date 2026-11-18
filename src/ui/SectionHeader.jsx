import { Reveal } from './Reveal'

export function SectionHeader({ numeral, title, time }) {
  return (
    <Reveal y={12} className="mb-12 flex items-baseline justify-between border-t border-line pt-4 sm:mb-16">
      <p className="label">
        <span className="text-ink">{numeral}</span>
        <span className="mx-2 text-faint">—</span>
        {title}
      </p>
      <p className="label tabular-nums" aria-label={`Clock time ${time}`}>
        {time}
      </p>
    </Reveal>
  )
}
