import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { useStore } from '../store/useStore'
import { Pendant } from './Pendant'

export function TimeObject() {
  const mesh = useRef()
  const timeOffset = useStore((state) => state.timeOffset)

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = timeOffset * Math.PI * 2
    mesh.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    mesh.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.05
  })

  return (
    <group ref={mesh}>
      <mesh>
        <cylinderGeometry args={[1.5, 1.5, 0.3, 64]} />
        <meshStandardMaterial metalness={0.9} roughness={0.1} color="#151b22" />
      </mesh>

      <mesh position={[0, 0, 0.16]}>
        <torusGeometry args={[1.4, 0.05, 32, 64]} />
        <meshStandardMaterial metalness={1} roughness={0.2} color="#cca35e" />
      </mesh>

      <mesh position={[0, 0, 0.15]}>
        <circleGeometry args={[1.4, 64]} />
        <meshStandardMaterial metalness={0.5} roughness={0.8} color="#0d1117" />
      </mesh>

      <mesh position={[0, 0, 0.17]}>
        <circleGeometry args={[1.4, 64]} />
        <MeshTransmissionMaterial envMapIntensity={2} ior={1.5} fresnel={1} toneMapped={false} />
      </mesh>

      <Pendant position={[0, -2.5, 0]} />
    </group>
  )
}
