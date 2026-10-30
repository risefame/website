/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tar: '#030303',
        hazard: '#FFE600',
        volt: '#CCFF00',
        cobalt: '#0A1F8F',
        steel: '#9aa0a6',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        marqueeRev: { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
        flicker: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '25%': { transform: 'translate(-3%,2%)' },
          '50%': { transform: 'translate(2%,-3%)' },
          '75%': { transform: 'translate(-2%,-1%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        marqueeRev: 'marqueeRev 34s linear infinite',
        flicker: 'flicker 1.4s steps(2) infinite',
        grain: 'grain 0.8s steps(4) infinite',
      },
    },
  },
  plugins: [],
}
