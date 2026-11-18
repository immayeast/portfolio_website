import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { PocketWatch } from './PocketWatch'

// Renders once everything in its Suspense boundary (the HDR environment) has loaded
function Ready({ onReady }) {
  useEffect(() => onReady(), [onReady])
  return null
}

export function Scene() {
  const [ready, setReady] = useState(false)

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-[1400ms] ease-out ${
        ready ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 9], fov: 35 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[-4, 6, 6]} intensity={1.4} />
        <directionalLight position={[5, -2, 4]} intensity={0.35} color="#ffe9cc" />
        <Suspense fallback={null}>
          <Environment preset="apartment" environmentIntensity={0.6} />
          <PocketWatch />
          <Ready onReady={() => setReady(true)} />
        </Suspense>
      </Canvas>
    </div>
  )
}
