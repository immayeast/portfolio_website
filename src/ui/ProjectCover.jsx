// A project's cover image, or — when no image is set — a generated cover
// in the project's colour with a quiet dial motif.
export function ProjectCover({ project, className = '', large = false }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} cover`}
        className={`h-full w-full object-cover ${className}`}
        loading="lazy"
      />
    )
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ backgroundColor: project.color }}
      role="img"
      aria-label={`${project.title} cover placeholder`}
    >
      <svg
        className="absolute -right-[18%] top-1/2 h-[130%] -translate-y-1/2 text-ink/15"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        {[96, 78, 60, 42].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeWidth="0.6" />
        ))}
        {Array.from({ length: 60 }, (_, i) => {
          const a = (i / 60) * Math.PI * 2
          const r1 = i % 5 === 0 ? 86 : 91
          return (
            <line
              key={i}
              x1={100 + Math.sin(a) * r1}
              y1={100 - Math.cos(a) * r1}
              x2={100 + Math.sin(a) * 96}
              y2={100 - Math.cos(a) * 96}
              stroke="currentColor"
              strokeWidth={i % 5 === 0 ? 1 : 0.5}
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
          {project.category} · {project.year}
        </span>
        <span
          className={`font-serif italic leading-none text-ink/85 ${large ? 'text-[clamp(2.5rem,6vw,4.5rem)]' : 'text-4xl'}`}
        >
          {project.title}
        </span>
      </div>
    </div>
  )
}
