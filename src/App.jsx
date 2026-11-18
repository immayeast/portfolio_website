import { MotionConfig } from 'framer-motion'
import { Scene } from './components3d/Scene'
import { useScrollClock } from './hooks/useScrollClock'
import { Nav } from './ui/Nav'
import { Hero } from './ui/Hero'
import { About } from './ui/About'
import { Work } from './ui/Work'
import { Experience } from './ui/Experience'
import { Contact } from './ui/Contact'
import { CaseStudy } from './ui/CaseStudy'

function App() {
  useScrollClock()

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-screen">
        <Scene />
        <Nav />
        <main className="relative z-10">
          <Hero />
          <About />
          <Work />
          <Experience />
          <Contact />
        </main>
        <CaseStudy />
      </div>
    </MotionConfig>
  )
}

export default App
