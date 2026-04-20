import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useStore } from '../store/useStore'
import { ticker } from '../utils/audio'

export function PortfolioUI() {
  const { scrollYProgress } = useScroll()
  const { setTimeOffset, setOriginVisible } = useStore()
  
  // Track previous scroll for the tick calculation
  const [lastTickProgress, setLastTickProgress] = useState(0)

  // Map scroll to different project opacities
  const pastOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const presentOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 1])
  const futureOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Offset for 3D mapping: -1 to 1 based on 0 to 1 scroll
    setTimeOffset((latest * 2) - 1)
    
    // Check if absolute top
    if (latest === 0) {
      setOriginVisible(true)
    } else {
      setOriginVisible(false)
    }

    // Tick audio every 10% increment
    // Since latest is 0 -> 1, every 0.1
    const currentTick = Math.floor(latest * 10)
    const prevTick = Math.floor(lastTickProgress * 10)
    
    if (currentTick !== prevTick) {
      ticker.play()
      setLastTickProgress(latest)
    }
  })

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {/* HUD: Top Nav */}
      <header className="flex justify-between p-8 text-xs tracking-widest uppercase text-teal-200/50">
        <div>Memory_Archive v.01</div>
        <nav className="flex gap-8 pointer-events-auto">
          <span className="cursor-pointer hover:text-white transition-colors duration-300">Index</span>
          <span className="cursor-pointer hover:text-white transition-colors duration-300">Manifesto</span>
        </nav>
      </header>

      {/* Main Narrative Panels */}
      <div className="relative h-[300vh]"> {/* Dummy scroll container size to allow layout positioning mapping? No, this is fixed. The root handles scrolling */}
        
        {/* PAST/ORIGIN PANEL - Fades out early */}
        <motion.div 
          style={{ opacity: pastOpacity }}
          className="absolute top-32 left-12 w-80 p-6 rounded-xl border border-white/10 glass-panel"
        >
          <span className="text-[#cca35e] text-[10px] block mb-2 font-mono">/ GENESIS_PHASE</span>
          <h2 className="text-3xl font-light text-white">Foundation</h2>
          <p className="text-sm text-gray-400 mt-4 leading-relaxed">
            The earliest components laid the groundwork for complex interactions.
          </p>
        </motion.div>

        {/* PRESENT PANEL */}
        <motion.div 
          style={{ opacity: presentOpacity }}
          className="absolute top-1/2 left-12 -translate-y-1/2 w-80 p-6 rounded-xl border border-white/10 glass-panel"
        >
          <span className="text-teal-400 text-[10px] block mb-2 font-mono">/ PRESENT_PHASE</span>
          <h2 className="text-3xl font-light text-white">Quantum Interface</h2>
          <p className="text-sm text-gray-400 mt-4 leading-relaxed">
            Currently building a decentralized visual engine for temporal data.
          </p>
        </motion.div>

        {/* FUTURE PANEL */}
        <motion.div 
          style={{ opacity: futureOpacity }}
          className="absolute bottom-24 right-12 w-80 p-6 rounded-xl border border-teal-500/20 bg-teal-500/5 backdrop-blur-2xl shadow-[0_0_40px_rgba(20,184,166,0.1)]"
        >
          <h2 className="text-2xl text-teal-100">Speculative Horizons</h2>
          <p className="text-xs text-teal-200/60 mt-2 font-mono">LAUNCHING Q4 2026</p>
        </motion.div>

      </div>
    </div>
  )
}
