import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'

export function OriginNote({ scrollYProgress }) {
  const isOriginVisible = useStore((state) => state.isOriginVisible)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOriginVisible ? 1 : 0, y: isOriginVisible ? 0 : -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 text-center"
    >
      <div 
        className="text-[#ffeedd] tracking-widest leading-loose mix-blend-exclusion text-xl max-w-sm"
        style={{ textShadow: "0 0 20px rgba(255, 238, 221, 0.4)" }}
      >
        <p className="font-mono text-sm mb-4">/ ORIGIN_SECTOR_0.0</p>
        <h1 className="text-4xl font-light italic mb-6">The Start of Time</h1>
        <p className="text-sm opacity-80">
          We begin not in the void, but in the echoes of everything yet to be built.
        </p>
      </div>
    </motion.div>
  )
}
