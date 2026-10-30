import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Wifi, Battery, Clock, Coffee, QrCode, CheckCircle2, Sparkles } from 'lucide-react'
import { LINKS } from '../config'
import { useLang } from '../i18n'
import { Barcode, Spec } from './ui'

function AppPhoneMockup() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative mx-auto w-full max-w-[340px] select-none lg:max-w-[380px]"
    >
      {/* Liquid chrome ambient glow */}
      <div className="pointer-events-none absolute -inset-4 rounded-[50px] bg-gradient-to-tr from-cobalt/40 via-hazard/20 to-volt/30 blur-2xl opacity-70" />

      {/* Chrome Device Chassis */}
      <motion.div
        animate={reduce ? undefined : { y: [-6, 6, -6] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
        className="relative rounded-[44px] p-[2.5px] bg-gradient-to-b from-white via-steel to-[#15171e] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.25)]"
      >
        {/* Screen Bezel */}
        <div className="relative overflow-hidden rounded-[41px] bg-[#070708] p-4 border border-white/10">
          
          {/* Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-2.5 border border-white/10 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-volt animate-ping" />
            <span className="text-[9px] font-mono text-white/70 tracking-widest uppercase">LIVE APP</span>
            <div className="w-2 h-2 rounded-full bg-neutral-800" />
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between px-2 pt-4 pb-2 text-[10px] font-mono text-white/70">
            <span className="font-bold tracking-tight">09:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] bg-hazard/20 text-hazard px-1 rounded border border-hazard/40 font-mono">5G</span>
              <Wifi size={11} />
              <Battery size={13} className="text-volt" />
            </div>
          </div>

          {/* App Header / Brand */}
          <div className="mt-2 rounded-2xl bg-neutral-900/90 p-3 border border-white/10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <Coffee size={14} className="text-hazard" />
                <span className="font-display text-sm tracking-tight text-white uppercase">COFFEE OS</span>
              </div>
              <p className="text-[10px] font-mono text-white/50 tracking-wider">PRE-ORDER // KITCHEN DISPLAY</p>
            </div>
            <span className="sticker text-[9px] py-0.5 px-1.5 bg-hazard text-black font-mono font-bold">#ORDER-042</span>
          </div>

          {/* Live Order Card */}
          <div className="mt-3 rounded-2xl bg-neutral-950 border border-hazard/50 p-3.5 relative overflow-hidden shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-mono text-volt tracking-wider uppercase flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-volt animate-pulse" /> В РАБОТЕ
                </span>
                <h4 className="font-display text-base text-white uppercase mt-0.5 tracking-tight">FLAT WHITE</h4>
                <p className="text-[11px] font-mono text-white/60">350 ML • ОВСЯНОЕ МОЛОКО</p>
              </div>
              <div className="text-right">
                <span className="font-display text-base text-hazard">320 ₽</span>
                <p className="text-[9px] font-mono text-white/40 uppercase">СБП ОПЛАЧЕНО</p>
              </div>
            </div>

            {/* Preparation Progress */}
            <div className="mt-3 space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono text-white/80">
                <span className="flex items-center gap-1"><Clock size={11} className="text-hazard" /> ГОТОВНОСТЬ ЧЕРЕЗ:</span>
                <span className="font-bold text-hazard">03:45 МИН</span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-hazard to-volt h-full rounded-full w-[72%] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Quick Specs / Modifiers */}
          <div className="mt-2.5 grid grid-cols-3 gap-1.5 text-center">
            <div className="p-1.5 rounded-xl bg-neutral-900 border border-white/10">
              <span className="block text-[8px] font-mono text-white/40">ОБЪЕМ</span>
              <span className="text-[10px] font-bold text-white font-mono">350 ML</span>
            </div>
            <div className="p-1.5 rounded-xl bg-neutral-900 border border-volt/30">
              <span className="block text-[8px] font-mono text-volt">МОЛОКО</span>
              <span className="text-[10px] font-bold text-white font-mono">OAT</span>
            </div>
            <div className="p-1.5 rounded-xl bg-neutral-900 border border-white/10">
              <span className="block text-[8px] font-mono text-white/40">САХАР</span>
              <span className="text-[10px] font-bold text-white font-mono">0%</span>
            </div>
          </div>

          {/* QR Action Bar */}
          <div className="mt-3">
            <div className="w-full py-2.5 px-3 rounded-xl bg-hazard text-black font-display text-xs uppercase tracking-tight flex items-center justify-between font-bold shadow-[0_4px_12px_rgba(255,230,0,0.3)]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} /> QR ДЛЯ ВЫДАЧИ
              </span>
              <QrCode size={15} />
            </div>
          </div>

          {/* Device Meta Specs */}
          <div className="mt-3 pt-2 border-t border-white/10 flex justify-between items-center text-[8px] font-mono text-white/40">
            <span>CLIENT APP V2.4</span>
            <span className="text-volt flex items-center gap-1">
              <Sparkles size={9} /> LATENCY: 0ms
            </span>
          </div>

          {/* Home Indicator */}
          <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-2.5" />
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
          <Spec className="text-hazard">[AWGE-SPEC // 2026]</Spec>
          <span className="sticker font-bold text-black bg-hazard">
            {h.serviceBadge}
          </span>
          <Barcode seed={11} className="h-6 w-28 text-white" />
        </div>

        {/* Main Grid: Headline Left + Phone Mockup Right */}
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
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

          {/* Interactive Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <AppPhoneMockup />
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
