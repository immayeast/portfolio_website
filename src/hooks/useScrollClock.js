import { useEffect } from 'react'
import { scrollState, useStore } from '../store/useStore'
import { ticker } from '../utils/audio'

const SECTION_IDS = ['about', 'work', 'experience', 'contact']
// A section "arrives" when its top reaches this fraction of the viewport
const ARRIVE_AT = 0.35

// Writes page scroll progress (0 → 1) and section marks into scrollState for
// the 3D watch, and plays a soft tick while scrolling if sound is on.
export function useScrollClock() {
  useEffect(() => {
    let lastTick = 0
    let frame = 0

    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max <= 0) return
      let prev = 0
      scrollState.marks = SECTION_IDS.map((id) => {
        const el = document.getElementById(id)
        if (!el) return prev
        const top = el.getBoundingClientRect().top + window.scrollY
        const m = Math.min(1, Math.max(prev + 0.01, (top - window.innerHeight * ARRIVE_AT) / max))
        prev = m
        return m
      })
    }

    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      scrollState.progress = p

      const tick = Math.floor(p * 144)
      if (tick !== lastTick) {
        lastTick = tick
        if (useStore.getState().soundOn) ticker.play()
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    update()
    // Page height changes as fonts load and sections animate in
    const ro = new ResizeObserver(onResize)
    ro.observe(document.body)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame)
    }
  }, [])
}
