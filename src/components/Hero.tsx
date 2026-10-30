import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { LINKS } from '../config'
import { useLang } from '../i18n'
import { Barcode, Spec } from './ui'

function ChromeShape() {
  const reduce = useReducedMotion()
  return (
    <motion.svg
      viewBox="0 0 600 600"
      className="pointer-events-none absolute right-[-12%] top-[2%] w-[78vw] max-w-[760px] opacity-90 md:right-[-4%]"
      aria-hidden="true"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 70, ease: 'linear', repeat: Infinity }}
    >
      <defs>
        <linearGradient id="ch1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".18" stopColor="#8f96a3" />
          <stop offset=".36" stopColor="#14161b" />
          <stop offset=".5" stopColor="#f2f5f9" />
          <stop offset=".68" stopColor="#4c525d" />
          <stop offset=".84" stopColor="#0b0c10" />
          <stop offset="1" stopColor="#d6dbe3" />
        </linearGradient>
        <radialGradient id="ch2" cx=".3" cy=".25" r=".6">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset=".4" stopColor="#fff" stopOpacity=".1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ch3" cx=".75" cy=".85" r=".5">
          <stop offset="0" stopColor="#0A1F8F" stopOpacity=".9" />
          <stop offset="1" stopColor="#0A1F8F" stopOpacity="0" />
        </radialGradient>
        <filter id="melt" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="38" />
        </filter>
      </defs>
      <g filter="url(#melt)">
        <path
          d="M300 40c120-10 230 70 250 190 20 120-40 200-90 260-60 70-170 90-250 50C110 510 50 430 50 320 50 170 170 50 300 40z"
          fill="url(#ch1)"
        />
        <path
          d="M300 40c120-10 230 70 250 190 20 120-40 200-90 260-60 70-170 90-250 50C110 510 50 430 50 320 50 170 170 50 300 40z"
          fill="url(#ch3)"
        />
        <ellipse cx="210" cy="170" rx="120" ry="60" fill="url(#ch2)" transform="rotate(-28 210 170)" />
      </g>
    </motion.svg>
  )
}

const line = {
  hidden: { y: '110%' },
  show: (i: number) => ({ y: 0, transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] as const } }),
}

export default function Hero() {
  const { t } = useLang()
  const h = t.hero
  const size = 'text-[clamp(2rem,8.4vw,8.75rem)]'

  return (
    <section id="top" className="relative isolate overflow-hidden border-b-4 border-hazard">
      <ChromeShape />
      <div className="relative mx-auto max-w-[1500px] px-4 pb-20 pt-10 md:px-8 md:pb-28 md:pt-16">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Spec className="text-hazard">[AWGE-SPEC // 2026]</Spec>
          <span className="sticker">RISEFAME LAB / BATCH 001</span>
          <Barcode seed={11} className="h-6 w-28 text-white" />
        </div>

        <h1 className={`font-display uppercase leading-[.88] tracking-tighter ${size}`}>
          {[h.line1, h.line2, h.line3].map((txt, i) => (
            <span key={txt} className="block overflow-hidden pb-[.06em]">
              <motion.span
                className={`block ${i === 1 ? 'chrome-text' : i === 2 ? 'text-hazard' : 'text-white'}`}
                variants={line}
                custom={i}
                initial="hidden"
                animate="show"
              >
                {txt}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[1.1fr_1fr] md:items-end">
          <p className="max-w-xl border-l-4 border-volt pl-4 text-base leading-relaxed text-white/85 md:text-lg">{h.sub}</p>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <a href={LINKS.telegram} target="_blank" rel="noreferrer" className="btn-invert">
              {h.ctaPrimary} <ArrowUpRight size={20} />
            </a>
            <a href="#work" className="btn-invert ghost">
              {h.ctaSecondary} <ChevronDown size={20} />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t-2 border-dashed border-white/25 pt-4">
          <Spec className="text-white/60">{h.tag}</Spec>
          <Spec className="text-volt">REF: RF-26-0001</Spec>
        </div>
      </div>
    </section>
  )
}
