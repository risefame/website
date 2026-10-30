import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Sparkles, Smartphone, Globe, Layers, Crosshair } from 'lucide-react'
import { LINKS } from '../config'
import { useLang } from '../i18n'
import { Barcode, Spec } from './ui'

function MatrixSphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const size = 500
    canvas.width = size
    canvas.height = size

    // Characters: Matrix stream, katakana, numbers, hex, RISEFAME tokens
    const chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜRISEFAME<>/{}=+*#_~'
    const fontSize = 14
    const columns = Math.floor(size / fontSize)
    
    // Each column has a drop position, speed and trail length
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -60))
    const speeds: number[] = Array.from({ length: columns }, () => 0.7 + Math.random() * 1.8)
    const lengths: number[] = Array.from({ length: columns }, () => 10 + Math.floor(Math.random() * 18))

    const draw = () => {
      // Translucent black trail for matrix glow
      ctx.fillStyle = 'rgba(5, 7, 10, 0.16)'
      ctx.fillRect(0, 0, size, size)

      ctx.font = `bold ${fontSize}px "Space Mono", monospace`

      for (let i = 0; i < columns; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length))
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Drop head shines white/yellow, trail shines in volt / hazard
        const isHead = Math.random() > 0.82
        if (isHead) {
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = '#FFE600'
          ctx.shadowBlur = 10
        } else if (i % 4 === 0) {
          ctx.fillStyle = '#FFE600' // Hazard yellow
          ctx.shadowColor = '#FFE600'
          ctx.shadowBlur = 6
        } else {
          ctx.fillStyle = '#CCFF00' // Acid volt
          ctx.shadowColor = '#00FF66'
          ctx.shadowBlur = 4
        }

        ctx.fillText(char, x, y)
        ctx.shadowBlur = 0

        // Reset column randomly after falling off the canvas
        if (y > size + 80 && Math.random() > 0.975) {
          drops[i] = -lengths[i]
        }
        drops[i] += speeds[i]
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div className="relative z-10 w-[290px] h-[290px] sm:w-[370px] sm:h-[370px] lg:w-[410px] lg:h-[410px] select-none flex items-center justify-center">
      {/* Outer 3D Sphere Housing with round clipping */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/25 shadow-[0_0_60px_rgba(204,255,0,0.25),0_25px_60px_rgba(0,0,0,0.95)] bg-[#040507]">
        
        {/* Matrix Digital Rain Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-95"
        />

        {/* 3D Rotating Celestial Wireframe / Latitude & Longitude Grid */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-45 mix-blend-screen"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {/* Outer edge ring */}
          <circle cx="50" cy="50" r="49" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.6" />
          {/* Longitude ellipses */}
          <ellipse cx="50" cy="50" rx="49" ry="32" fill="none" stroke="#FFE600" strokeWidth="0.6" strokeDasharray="4,4" />
          <ellipse cx="50" cy="50" rx="49" ry="16" fill="none" stroke="#CCFF00" strokeWidth="0.6" strokeDasharray="2,2" />
          <line x1="1" y1="50" x2="99" y2="50" stroke="#CCFF00" strokeWidth="0.5" strokeDasharray="2,3" />
          {/* Latitude ellipses */}
          <ellipse cx="50" cy="50" rx="32" ry="49" fill="none" stroke="#ffffff" strokeWidth="0.6" strokeDasharray="4,4" />
          <ellipse cx="50" cy="50" rx="16" ry="49" fill="none" stroke="#FFE600" strokeWidth="0.6" strokeDasharray="2,2" />
          <line x1="50" y1="1" x2="50" y2="99" stroke="#FFE600" strokeWidth="0.5" strokeDasharray="2,3" />
        </motion.svg>

        {/* Liquid Chrome Glare / Specular Highlight */}
        <motion.div
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          className="pointer-events-none absolute -inset-[20%] opacity-35 mix-blend-color-dodge"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.85) 60deg, transparent 120deg, rgba(204,255,0,0.5) 180deg, transparent 240deg, rgba(255,255,255,0.7) 300deg, transparent 360deg)'
          }}
        />

        {/* 3D Spherical Convex Lens & Deep Rim Shading */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 32%, transparent 65%), radial-gradient(circle at 75% 75%, rgba(10,31,143,0.45) 0%, transparent 60%)',
            boxShadow: 'inset 0 0 55px rgba(0,0,0,0.98), inset 0 0 20px rgba(204,255,0,0.35)',
          }}
        />

        {/* Outer Liquid Chrome Metallic Rim */}
        <div className="pointer-events-none absolute inset-0 rounded-full border-[2.5px] border-white/40 shadow-inner" />
      </div>
    </div>
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

        {/* Central Display: Matrix Sphere + Orbital Rings */}
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

          {/* The Matrix Sphere Artifact */}
          <MatrixSphere />

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
          <span className="bg-hazard text-black font-mono font-bold text-[11px] uppercase tracking-wider px-2.5 py-0.5">
            {h.serviceBadge}
          </span>
          <Barcode seed={11} className="h-6 w-28 text-white" />
        </div>

        {/* Main Grid: Headline Left + Matrix Sphere Artifact Right */}
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

          {/* The Matrix Digital Core Artifact */}
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
