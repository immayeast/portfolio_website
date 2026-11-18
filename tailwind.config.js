/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f3efe7',
        'paper-deep': '#ebe5d9',
        ink: '#1a1814',
        muted: '#6b665c',
        faint: '#a39d91',
        line: 'rgba(26, 24, 20, 0.12)',
        brass: '#94672c',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['clamp(3.25rem, 9vw, 9rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        headline: ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.015em' }],
      },
      maxWidth: {
        page: '88rem',
      },
    },
  },
  plugins: [],
}
