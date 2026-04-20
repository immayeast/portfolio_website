import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../store/useStore'
import { Html } from '@react-three/drei'

export function Pendant({ position }) {
  const mesh = useRef()
  const { isPendantOpen, togglePendant, timeOffset } = useStore()

  useFrame((state) => {
    // Subtle secondary sway for the pendant
    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1
      mesh.current.rotation.y = timeOffset * Math.PI 
    }
  })

  return (
    <group position={position} ref={mesh}>
      {/* The chain link connection */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8]} />
        <meshStandardMaterial metalness={1} roughness={0.2} color="#ccaa77" />
      </mesh>
      
      {/* The Pendant Body */}
      <mesh onClick={togglePendant} cursor="pointer">
        <boxGeometry args={[0.5, 0.6, 0.1]} />
        <meshStandardMaterial metalness={0.9} roughness={0.1} color="#222" />
      </mesh>

      {/* Embedded jewel/glass */}
      <mesh position={[0, 0, 0.06]}>
        <circleGeometry args={[0.15, 32]} />
        <meshPhysicalMaterial 
          transmission={1} 
          ior={1.5} 
          thickness={0.5} 
          roughness={0} 
          color={isPendantOpen ? "#00ffcc" : "#ffffff"} 
        />
      </mesh>

      {/* HTML tooltip when active */}
      {isPendantOpen && (
        <Html position={[0.4, 0, 0]}>
          <div className="text-[10px] uppercase tracking-widest text-[#00ffcc] font-mono whitespace-nowrap bg-[#00ffcc]/10 px-2 py-1 backdrop-blur-md rounded border border-[#00ffcc]/30">
            Memory Key Active
          </div>
        </Html>
      )}
    </group>
  )
}
