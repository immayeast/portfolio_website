// Proceed with standard Web Audio API for synthesized tick since we don't have an asset
class TickerGenerator {
  constructor() {
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  play() {
    if (!this.audioCtx) return;
    
    // Create a very short, high-pitched mechanical noise click
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  }
}

export const ticker = new TickerGenerator();

// Initialize on user interact to comply with browser autoplay policies
if (typeof window !== 'undefined') {
  window.addEventListener('click', () => ticker.init(), { once: true });
  window.addEventListener('touchstart', () => ticker.init(), { once: true });
}
