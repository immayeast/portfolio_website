import { motion } from 'framer-motion'

const ease = [0.2, 0.7, 0.2, 1]

export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Tag>
  )
}

// Masked line-by-line rise, for large serif headings
export function RiseLines({ lines, className, lineClassName, delay = 0, immediate = false }) {
  const animateProps = immediate
    ? { animate: { y: '0%' } }
    : { whileInView: { y: '0%' }, viewport: { once: true } }
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${typeof lineClassName === 'function' ? lineClassName(i) : lineClassName ?? ''}`}
            initial={{ y: '105%' }}
            {...animateProps}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
