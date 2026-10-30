import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Sparkles, Smartphone, Globe, Layers, Crosshair } from 'lucide-react'
import { LINKS } from '../config'
import { useLang } from '../i18n'
import { Barcode, Spec } from './ui'

function ChromeSphere() {
  const reduce = useReducedMotion()
  return (
    <motion.svg
      viewBox="0 0 600 600"
      className="relative z-10 w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] select-none filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
      aria-hidden="true"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 65, ease: 'linear', repeat: Infinity }}
    >
      <defs>
        <linearGradient id="ch1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="18%" stopColor="#9ba2ad" />
          <stop offset="36%" stopColor="#14161b" />
          <stop offset="50%" stopColor="#f5f7fa" />
          <stop offset="68%" stopColor="#4c525d" />
          <stop offset="84%" stopColor="#0b0c10" />
          <stop offset="100%" stopColor="#d6dbe3" />
        </linearGradient>
        <radialGradient id="ch2" cx=".3" cy=".25" r=".6">
          <stop offset="0%" stopColor="#fff" stopOpacity=".95" />
          <stop offset="40%" stopColor="#fff" stopOpacity=".1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ch3" cx=".75" cy=".85" r=".5">
          <stop offset="0%" stopColor="#0A1F8F" stopOpacity=".95" />
          <stop offset="100%" stopColor="#0A1F8F" stopOpacity="0" />
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

function DigitalCore() {
  const reduce = useReducedMotion()
  const { t } = useLang()
  const c = t.hero.coreEngine

  return (
    <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center p-4 lg:max-w-[620px]">
      {/* Liquid chrome & cobalt ambient aura */}
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-tr from-cobalt/35 via-hazard/15 to-volt/20 blur-3xl opacity-75" />

      {/* Cybernetic HUD Reticle / Chamber Box */}
      <div className="relative w-full rounded-3xl border border-white/15 bg-neutral-950/70 p-6 backdrop-blur-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]">
        
        {/* Corner Crosshairs */}
        <div className="pointer-events-none absolute left-3 top-3 text-white/30"><Crosshair size={14} /></div>
        <div className="pointer-events-none absolute right-3 top-3 text-white/30"><Crosshair size={14} /></div>
        <div className="pointer-events-none absolute left-3 bottom-3 text-white/30"><Crosshair size={14} /></div>
        <div className="pointer-events-none absolute right-3 bottom-3 text-white/30"><Crosshair size={14} /></div>

        {/* Top HUD Telemetry */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[10px]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-volt animate-ping" />
            <span className="font-bold tracking-widest text-white">{c.status}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/40">{c.fps}</span>
            <span className="sticker bg-hazard text-black font-bold text-[9px] py-0.5 px-2">{c.badge}</span>
          </div>
        </div>

        {/* Central Display: Liquid Chrome Sphere + Orbital Rings */}
        <div className="relative my-4 flex items-center justify-center overflow-visible py-4">
          
          {/* Orbital Ring 1 (outer dashed) */}
          <motion.div
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
            className="pointer-events-none absolute h-[340px] w-[340px] rounded-full border border-dashed border-white/20 sm:h-[420px] sm:w-[420px]"
          />

          {/* Orbital Ring 2 (hazard-accented elliptical) */}
          <motion.div
            animate={reduce ? undefined : { rotate: -360 }}
            transition={{ duration: 55, ease: 'linear', repeat: Infinity }}
            className="pointer-events-none absolute h-[290px] w-[370px] rounded-full border border-hazard/30 sm:h-[350px] sm:w-[450px]"
            style={{ transform: 'rotate(-20deg)' }}
          />

          {/* The Hypnotic Liquid Chrome Sphere */}
          <ChromeSphere />

          {/* Orbital Chip 1: Top-Right (Mobile Apps) */}
          <motion.div
            animate={reduce ? undefined : { y: [-6, 6, -6] }}
            transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
            className="absolute -top-1 right-0 sm:right-2 z-20 max-w-[210px] rounded-xl border border-hazard/60 bg-[#0d0e12]/90 p-2.5 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-hazard/20 text-hazard">
                <Smartphone size={13} />
              </div>
              <div>
                <div className="font-display text-[11px] uppercase tracking-tight text-white flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse" />
                  {c.chips[0].title}
                </div>
                <div className="font-mono text-[8px] text-white/50">{c.chips[0].tech}</div>
              </div>
            </div>
          </motion.div>

          {/* Orbital Chip 2: Mid-Left (Web Platforms & SaaS) */}
          <motion.div
            animate={reduce ? undefined : { y: [6, -6, 6] }}
            transition={{ duration: 6, delay: 0.8, ease: 'easeInOut', repeat: Infinity }}
            className="absolute top-1/2 -left-2 sm:-left-4 -translate-y-1/2 z-20 max-w-[220px] rounded-xl border border-volt/60 bg-[#0d0e12]/90 p-2.5 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-volt/20 text-volt">
                <Globe size={13} />
              </div>
              <div>
                <div className="font-display text-[11px] uppercase tracking-tight text-white flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-hazard animate-pulse" />
                  {c.chips[1].title}
                </div>
                <div className="font-mono text-[8px] text-white/50">{c.chips[1].tech}</div>
              </div>
            </div>
          </motion.div>

          {/* Orbital Chip 3: Bottom-Right (Full-Cycle Websites) */}
          <motion.div
            animate={reduce ? undefined : { y: [-5, 5, -5] }}
            transition={{ duration: 5.5, delay: 1.5, ease: 'easeInOut', repeat: Infinity }}
            className="absolute -bottom-2 right-2 sm:right-6 z-20 max-w-[220px] rounded-xl border border-white/30 bg-[#0d0e12]/90 p-2.5 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white/10 text-white">
                <Layers size={13} />
              </div>
              <div>
                <div className="font-display text-[11px] uppercase tracking-tight text-white flex items-center gap-1.5">
                  <Sparkles size={11} className="text-volt" />
                  {c.chips[2].title}
                </div>
                <div className="font-mono text-[8px] text-white/50">{c.chips[2].tech}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom HUD Telemetry Footer */}
        <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[9px] text-white/40">
          <span className="text-volt">{c.specLabel}</span>
          <Barcode seed={27} className="h-4 w-24 text-white/50" />
        </div>
      </div>
    </div>
  )
}

const line = {
  hidden: { y: '110%' },
  show: (i: number) => ({ y: 0, transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] as const } }),
}

export default function Hero() {
  const { t } = useLang()
  const h = t.hero
  const size = 'text-[clamp(2.1rem,7.5vw,7.8rem)]'

  return (
    <section id="top" className="relative isolate overflow-hidden border-b-4 border-hazard">
      <div className="relative mx-auto max-w-[1500px] px-4 pb-20 pt-10 md:px-8 md:pb-28 md:pt-16">
        
        {/* Technical Header Line */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Spec className="text-hazard">[RF-SPEC // 2026]</Spec>
          <span className="sticker font-bold text-black bg-hazard">
            {h.serviceBadge}
          </span>
          <Barcode seed={11} className="h-6 w-28 text-white" />
        </div>

        {/* Main Grid: Headline Left + Digital Core Artifact Right */}
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <h1 className={`font-display uppercase leading-[.88] tracking-tighter ${size}`}>
              {[h.line1, h.line2, h.line3].map((txt: string, i: number) => (
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

            <p className="mt-8 max-w-xl border-l-4 border-volt pl-4 text-base leading-relaxed text-white/90 md:text-lg">
              {h.sub}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href={LINKS.telegram} target="_blank" rel="noreferrer" className="btn-invert">
                {h.ctaPrimary} <ArrowUpRight size={20} />
              </a>
              <a href="#work" className="btn-invert ghost">
                {h.ctaSecondary} <ChevronDown size={20} />
              </a>
            </div>
          </div>

          {/* The Liquid Chrome Digital Core with Orbital HUD chips */}
          <div className="flex justify-center lg:justify-end">
            <DigitalCore />
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t-2 border-dashed border-white/25 pt-4">
          <Spec className="text-white/60">{h.tag}</Spec>
          <Spec className="text-volt">REF: RF-26-0001</Spec>
        </div>
      </div>
    </section>
  )
}
