import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Scene } from './components3d/Scene'
import { PortfolioUI } from './ui/PortfolioUI'
import { OriginNote } from './ui/OriginNote'
import { useStore } from './store/useStore'

function App() {
  const isOriginVisible = useStore((state) => state.isOriginVisible)

  return (
    <motion.div 
      className="w-full relative selection:bg-teal-500/30"
      animate={{
        backgroundColor: isOriginVisible ? "#1a120b" : "#050a14"
      }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{
        // Fallback for initial load
        backgroundColor: "#050a14"
      }}
    >
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${isOriginVisible ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 bg-cinematic" />
      </div>

      {/* 3D Canvas Layer */}
      <Scene />

      {/* 2D HUD Layer */}
      <PortfolioUI />
      
      {/* Surprise Origin Layer */}
      <OriginNote />

      {/* The Scroll Track - Invisible but forces the page to scroll */}
      <div className="h-[400vh] w-full pointer-events-none" />
      
    </motion.div>
  )
}

export default App
