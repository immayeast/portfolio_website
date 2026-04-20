import { Canvas } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { TimeObject } from './TimeObject'

export function Scene() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'auto' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={1} angle={0.2} penumbra={1} castShadow />
        <Environment preset="studio" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <TimeObject />
        </Float>
      </Canvas>
    </div>
  )
}
