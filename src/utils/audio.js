// A soft synthesized clock tick (Web Audio, no asset needed). Off by default;
// the visitor turns it on from the nav, which also unlocks the AudioContext.
class Ticker {
  constructor() {
    this.ctx = null
  }

  unlock() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (Ctx) this.ctx = new Ctx()
    }
    if (this.ctx?.state === 'suspended') this.ctx.resume()
  }

  play() {
    const ctx = this.ctx
    if (!ctx || ctx.state !== 'running') return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(1800, t)
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.03)
    gain.gain.setValueAtTime(0.12, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.05)
  }
}

export const ticker = new Ticker()
