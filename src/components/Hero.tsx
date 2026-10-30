import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Smartphone, Globe, Layers, Cpu, ShieldCheck, Sparkles, Terminal } from 'lucide-react'
import { LINKS } from '../config'
import { useLang } from '../i18n'
import { Barcode, Spec } from './ui'

function ProductionConsole() {
  const reduce = useReducedMotion()
  const { t } = useLang()
  const c = t.hero.console

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative mx-auto w-full max-w-[480px] select-none lg:max-w-[520px]"
    >
      {/* Liquid chrome ambient glow */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cobalt/40 via-hazard/20 to-volt/25 blur-3xl opacity-70" />

      {/* Main Console Frame */}
      <motion.div
        animate={reduce ? undefined : { y: [-4, 4, -4] }}
        transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
        className="relative rounded-2xl border-2 border-white/25 bg-[#09090b] p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] backdrop-blur-md"
      >
        {/* Top Header / Control Bar */}
        <div className="flex items-center justify-between border-b border-white/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-volt animate-ping" />
            <span className="font-mono text-xs font-bold tracking-wider text-white">
              {c.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="sticker bg-hazard text-black font-mono font-bold text-[9px] py-0.5 px-2">
              {c.badge}
            </span>
          </div>
        </div>

        {/* 3 Core Direction Cards */}
        <div className="mt-4 space-y-2.5">
          {c.services.map((item, idx) => (
            <div
              key={item.title}
              className="group relative rounded-xl border border-white/10 bg-neutral-900/80 p-3 transition-all hover:border-hazard/60 hover:bg-neutral-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-800 text-hazard group-hover:bg-hazard group-hover:text-black transition-colors">
                    {idx === 0 && <Smartphone size={15} />}
                    {idx === 1 && <Globe size={15} />}
                    {idx === 2 && <Layers size={15} />}
                  </div>
                  <div>
                    <h4 className="font-display text-xs tracking-tight text-white uppercase group-hover:text-hazard transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-mono text-[10px] text-white/55">{item.sub}</p>
                  </div>
                </div>
                <span className="font-mono text-[9px] font-bold tracking-widest text-volt border border-volt/30 px-1.5 py-0.5 rounded">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Compilation Viewport */}
        <div className="mt-4 rounded-xl border border-white/10 bg-black/90 p-3 font-mono text-[10px] leading-relaxed">
          <div className="flex items-center justify-between text-white/40 pb-1.5 border-b border-white/10 mb-2">
            <span className="flex items-center gap-1.5">
              <Terminal size={11} className="text-volt" /> PIPELINE_OUTPUT
            </span>
            <span className="text-volt">LIVE // 0ms</span>
          </div>
          <p className="text-white/80">{c.pipeline}</p>
          <p className="text-hazard/90 mt-1">&gt; CLIENTS: iOS • ANDROID • WEB (PWA &amp; SSR)</p>
          <p className="text-volt/90 mt-1 flex items-center gap-1">
            <Sparkles size={10} /> &gt; SYSTEM STATUS: READY TO DEPLOY
            <span className="inline-block w-1.5 h-3 bg-volt animate-pulse ml-1" />
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/15 pt-3 text-center">
          {c.specs.map(([label, val]) => (
            <div key={label} className="rounded-lg bg-neutral-950 p-2 border border-white/5">
              <span className="block font-mono text-[8px] tracking-wider text-white/40">{label}</span>
              <span className="font-display text-[11px] uppercase tracking-tight text-hazard mt-0.5 block">{val}</span>
            </div>
          ))}
        </div>

        {/* Console Footer Meta */}
        <div className="mt-3.5 flex items-center justify-between pt-2 border-t border-dashed border-white/10 text-[9px] font-mono text-white/40">
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-volt" /> {c.ready}
          </span>
          <Barcode seed={19} className="h-4 w-20 text-white/50" />
        </div>
      </motion.div>
    </motion.div>
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

        {/* Main Grid: Headline Left + Console Right */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
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

          {/* High-End Production Console (replaces phone & coffee) */}
          <div className="flex justify-center lg:justify-end">
            <ProductionConsole />
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
