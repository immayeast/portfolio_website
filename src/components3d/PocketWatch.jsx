import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '../store/useStore'
import { site } from '../content'
import { zonedHMS } from '../hooks/useNow'

const GOLD = '#c79b5b'
const GOLD_DEEP = '#9c7440'
const DIAL = '#f6f1e7'
const INK = '#1f1c17'
const BLUED = '#1b2236' // blued-steel hands

const TAU = Math.PI * 2
const R = 1.5 // case radius
const DEPTH = 0.36 // case thickness
const FRONT = DEPTH / 2

const SPIN_SPEED = 0.55 // rad/s while idling in the hero
const INTRO_SECONDS = 2.6

const smooth = (t) => t * t * (3 - 2 * t)
const clamp01 = (t) => Math.min(1, Math.max(0, t))

// Piecewise interpolation between keyframes [[at, value], ...]
function keyframe(stops, p) {
  if (p <= stops[0][0]) return stops[0][1]
  for (let i = 1; i < stops.length; i++) {
    const [a0, v0] = stops[i - 1]
    const [a1, v1] = stops[i]
    if (p <= a1) return v0 + (v1 - v0) * smooth((p - a0) / (a1 - a0 || 1))
  }
  return stops[stops.length - 1][1]
}

// Clock hours (0–12) for a scroll position: 12:00 at the top, then exactly
// 3, 6, 9 and 12 o'clock as each section arrives.
function scrollHours(p, marks) {
  const pts = [0, ...marks]
  for (let i = 1; i < pts.length; i++) {
    if (p <= pts[i]) return (i - 1) * 3 + 3 * clamp01((p - pts[i - 1]) / (pts[i] - pts[i - 1] || 1))
  }
  return 12
}

const shared = {
  gold: new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.22 }),
  goldSatin: new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.42 }),
  goldDeep: new THREE.MeshStandardMaterial({ color: GOLD_DEEP, metalness: 1, roughness: 0.5 }),
  blued: new THREE.MeshStandardMaterial({ color: BLUED, metalness: 0.6, roughness: 0.3 }),
  ink: new THREE.MeshStandardMaterial({ color: INK, roughness: 0.6 }),
  inkSoft: new THREE.MeshStandardMaterial({ color: '#5f594e', roughness: 0.6 }),
}

function Dial() {
  const ticks = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => {
        const major = i % 5 === 0
        const a = (i / 60) * TAU
        const len = major ? 0.16 : 0.06
        const r = 1.3 - len / 2
        return {
          i,
          major,
          position: [Math.sin(a) * r, Math.cos(a) * r, 0],
          rotation: [0, 0, -a],
          scale: [major ? 0.03 : 0.012, len, 0.008],
        }
      }),
    [],
  )
  const subTicks = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * TAU
        return { i, position: [Math.sin(a) * 0.27, Math.cos(a) * 0.27, 0], rotation: [0, 0, -a] }
      }),
    [],
  )

  return (
    <group position={[0, 0, FRONT + 0.004]}>
      <mesh>
        <circleGeometry args={[R - 0.09, 96]} />
        <meshStandardMaterial color={DIAL} roughness={0.8} />
      </mesh>
      {/* chapter ring */}
      <mesh position={[0, 0, 0.002]}>
        <ringGeometry args={[1.0, 1.006, 128]} />
        <meshBasicMaterial color="#bdb4a4" />
      </mesh>
      <group position={[0, 0, 0.004]}>
        {ticks.map((t) => (
          <mesh
            key={t.i}
            position={t.position}
            rotation={t.rotation}
            scale={t.scale}
            material={t.major ? shared.ink : shared.inkSoft}
          >
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
        ))}
      </group>
      {/* small seconds sub-dial at six o'clock */}
      <group position={[0, -0.6, 0.004]}>
        <mesh>
          <ringGeometry args={[0.31, 0.316, 64]} />
          <meshBasicMaterial color="#9d9586" />
        </mesh>
        {subTicks.map((t) => (
          <mesh key={t.i} position={t.position} rotation={t.rotation} material={shared.inkSoft}>
            <boxGeometry args={[0.008, 0.05, 0.004]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// Breguet-style hand: a slim shaft with a hollow "moon" near the tip
function Hand({ handRef, length, width, z, moon }) {
  return (
    <group ref={handRef} position={[0, 0, z]}>
      <mesh position={[0, length / 2 - 0.06, 0]} material={shared.blued}>
        <boxGeometry args={[width, length + 0.12, 0.012]} />
      </mesh>
      {moon && (
        <mesh position={[0, length * 0.72, 0]} material={shared.blued}>
          <ringGeometry args={[moon * 0.55, moon, 32]} />
        </mesh>
      )}
    </group>
  )
}

function Caseback() {
  return (
    <group position={[0, 0, -FRONT - 0.002]} rotation={[0, Math.PI, 0]}>
      <mesh material={shared.goldSatin}>
        <circleGeometry args={[R - 0.04, 96]} />
      </mesh>
      {/* engraved concentric rings */}
      {[1.32, 1.18, 1.0, 0.8, 0.55, 0.3].map((r) => (
        <mesh key={r} position={[0, 0, 0.002]} material={shared.goldDeep}>
          <ringGeometry args={[r - 0.012, r, 128]} />
        </mesh>
      ))}
      {/* sunburst engraving */}
      {Array.from({ length: 48 }, (_, i) => {
        const a = (i / 48) * TAU
        return (
          <mesh
            key={i}
            position={[Math.sin(a) * 0.68, Math.cos(a) * 0.68, 0.002]}
            rotation={[0, 0, -a]}
            material={shared.goldDeep}
          >
            <planeGeometry args={[0.008, 0.22]} />
          </mesh>
        )
      })}
      <mesh position={[0, 0, 0.003]} material={shared.gold}>
        <circleGeometry args={[0.2, 48]} />
      </mesh>
    </group>
  )
}

function Crown() {
  return (
    <group position={[0, R, 0]}>
      {/* stem */}
      <mesh position={[0, 0.1, 0]} material={shared.gold}>
        <cylinderGeometry args={[0.075, 0.09, 0.22, 24]} />
      </mesh>
      {/* knurled crown */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 28]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.3} flatShading />
      </mesh>
      <mesh position={[0, 0.41, 0]} material={shared.gold}>
        <sphereGeometry args={[0.12, 24, 12, 0, TAU, 0, Math.PI / 2]} />
      </mesh>
      {/* bow */}
      <mesh position={[0, 0.72, 0]} material={shared.gold}>
        <torusGeometry args={[0.3, 0.045, 20, 64]} />
      </mesh>
    </group>
  )
}

const CHAIN_START = R + 1.02 // top of the bow
const LINK_STEP = 0.23
const LINK_COUNT = 64

function Chain() {
  const links = useMemo(() => Array.from({ length: LINK_COUNT }, (_, i) => i), [])
  return (
    <group position={[0, CHAIN_START, 0]}>
      {links.map((i) => (
        <mesh
          key={i}
          position={[0, 0.08 + i * LINK_STEP, 0]}
          rotation={[0, i % 2 ? Math.PI / 2 : 0, 0]}
          scale={[1, 1.65, 1]}
          material={shared.gold}
        >
          <torusGeometry args={[0.085, 0.022, 10, 24]} />
        </mesh>
      ))}
    </group>
  )
}

function Crystal() {
  // Shallow domed glass: a thin cap of a large sphere
  const a = R - 0.08
  const dome = 0.09
  const rs = (a * a + dome * dome) / (2 * dome)
  const theta = Math.asin(a / rs)
  return (
    <mesh position={[0, 0, FRONT + dome - rs]} rotation={[Math.PI / 2, 0, 0]}>
      <sphereGeometry args={[rs, 96, 8, 0, TAU, 0, theta]} />
      <meshPhysicalMaterial
        transparent
        opacity={0.16}
        roughness={0.04}
        clearcoat={1}
        clearcoatRoughness={0.04}
        color="#ffffff"
        depthWrite={false}
      />
    </mesh>
  )
}

export function PocketWatch() {
  const root = useRef()
  const tilt = useRef()
  const spin = useRef()
  const hourHand = useRef()
  const minuteHand = useRef()
  const secondHand = useRef()

  const eased = useRef(0)
  const angle = useRef(0)
  const introStart = useRef(null)
  const timeCache = useRef({ sec: -1, h: 0, m: 0, s: 0 })
  const { viewport, pointer } = useThree()

  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1)
    const t = state.clock.elapsedTime
    if (introStart.current === null) introStart.current = t
    const intro = reduceMotion ? 1 : clamp01((t - introStart.current) / INTRO_SECONDS)
    const introEase = 1 - Math.pow(1 - intro, 3)

    eased.current = THREE.MathUtils.damp(eased.current, scrollState.progress, 6, delta)
    const p = eased.current
    const marks = scrollState.marks
    // 0 in the hero → 1 once About arrives
    const leave = smooth(clamp01(p / (marks[0] || 0.2)))

    // ── Time ─────────────────────────────────────────────
    const now = Date.now()
    const sec = Math.floor(now / 1000)
    const tc = timeCache.current
    if (sec !== tc.sec) Object.assign(tc, { sec }, zonedHMS(new Date(now), site.timezone))
    const s = tc.s + (now % 1000) / 1000
    const live = (tc.h % 12) + tc.m / 60 + s / 3600

    // Blend from live time to the scroll-driven hour along the shortest way round
    let diff = scrollHours(p, marks) - live
    diff -= Math.round(diff / 12) * 12
    const hours = live + diff * leave

    hourHand.current.rotation.z = -(hours / 12) * TAU
    minuteHand.current.rotation.z = -hours * TAU
    secondHand.current.rotation.z = -(s / 60) * TAU

    // ── Spin ─────────────────────────────────────────────
    // Drops in spinning fast, settles to a slow live turn in the hero,
    // and eases round to face the reader once you scroll on.
    const rest = -0.22
    const introBoost = reduceMotion ? 0 : 8 * Math.pow(1 - intro, 3)
    const speed = (reduceMotion ? 0 : SPIN_SPEED + introBoost) * (1 - leave)
    angle.current += speed * delta
    if (leave > 0) {
      const target = rest + Math.round((angle.current - rest) / TAU) * TAU
      angle.current = THREE.MathUtils.damp(angle.current, target, 5 * leave, delta)
    }
    spin.current.rotation.y = angle.current

    // Pointer parallax + a gentle hanging sway
    tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, -pointer.y * 0.1, 3, delta)
    tilt.current.rotation.z = THREE.MathUtils.damp(
      tilt.current.rotation.z,
      Math.sin(t * 0.9) * 0.025 - pointer.x * 0.04,
      3,
      delta,
    )

    // ── Layout ───────────────────────────────────────────
    const w = viewport.width
    const h = viewport.height
    const compact = state.size.width < 1024
    const [mAbout, , , mContact] = marks
    let x, y, sc

    if (compact) {
      // Hangs at the top of the hero (which leaves pt-[40svh] free), then is drawn up
      x = 0
      y = keyframe([[0, h * 0.27], [mAbout * 0.7, h * 0.95]], p)
      sc = Math.min(h * 0.075, w * 0.23)
    } else {
      const sHero = Math.min(h / 7, 1.0)
      // In the middle sections the watch hangs, whole, in the right margin column
      const sMid = Math.min((w * 0.18 * 0.42) / 1.57, (h * 0.22) / 1.57)
      const endStart = Math.max(marks[2], mContact - 0.12)
      x = keyframe([[0, w * 0.24], [mAbout, w * 0.4], [endStart, w * 0.4], [mContact, w * 0.25]], p)
      y = keyframe([[0, -0.25], [mAbout, -0.1], [endStart, -0.1], [mContact, -0.15]], p)
      sc = keyframe([[0, sHero], [mAbout, sMid], [endStart, sMid], [mContact, sHero * 0.95]], p)
    }

    // Intro: lowered in on its chain from above the viewport
    y += (1 - introEase) * h * 0.95

    root.current.position.x = THREE.MathUtils.damp(root.current.position.x, x, 4, delta)
    root.current.position.y = intro < 1 ? y : THREE.MathUtils.damp(root.current.position.y, y, 4, delta)
    root.current.scale.setScalar(sc)
  })

  return (
    <group ref={root} position={[0, 10, 0]}>
      <group ref={tilt}>
        <group ref={spin}>
          {/* Case band */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={shared.gold}>
            <cylinderGeometry args={[R, R, DEPTH, 128]} />
          </mesh>
          {/* Front and back bezels */}
          <mesh position={[0, 0, FRONT]} material={shared.gold}>
            <torusGeometry args={[R - 0.03, 0.075, 24, 128]} />
          </mesh>
          <mesh position={[0, 0, -FRONT]} material={shared.gold}>
            <torusGeometry args={[R - 0.03, 0.06, 24, 128]} />
          </mesh>

          <Dial />
          <Hand handRef={hourHand} length={0.68} width={0.05} z={FRONT + 0.022} moon={0.09} />
          <Hand handRef={minuteHand} length={1.08} width={0.032} z={FRONT + 0.036} moon={0.075} />
          <group position={[0, -0.6, FRONT + 0.016]}>
            <Hand handRef={secondHand} length={0.26} width={0.012} z={0} />
          </group>
          {/* centre cap */}
          <mesh position={[0, 0, FRONT + 0.05]} rotation={[Math.PI / 2, 0, 0]} material={shared.gold}>
            <cylinderGeometry args={[0.05, 0.05, 0.03, 32]} />
          </mesh>

          <Crystal />
          <Caseback />
          <Crown />
          <Chain />
        </group>
      </group>
    </group>
  )
}
