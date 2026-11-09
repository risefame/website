import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang, type CaseItem, type Dict } from '../i18n'
import { Barcode, CrashBadge, Spec } from './ui'

const THEMES = [
  { bg: 'bg-hazard text-black', accent: 'text-black', tag: 'border-black', sub: 'text-black/70', rule: 'border-black' },
  { bg: 'bg-[#0b0b0d] text-white', accent: 'text-volt', tag: 'border-volt text-volt', sub: 'text-white/70', rule: 'border-white/70' },
  { bg: 'bg-cobalt text-white', accent: 'text-hazard', tag: 'border-hazard text-hazard', sub: 'text-white/80', rule: 'border-white/70' },
  { bg: 'bg-volt text-black', accent: 'text-black', tag: 'border-black', sub: 'text-black/70', rule: 'border-black' },
] as const

/* ───────────────────────── CSS-эффекты (глитч, шаги, спрей) ───────────────────────── */

const glitchFrames = (name: string) => `
@keyframes ${name}{
  0%{transform:translate(0,0) skewX(0);filter:none}
  8%{transform:translate(-7px,2px) skewX(-5deg);filter:drop-shadow(6px 0 0 rgba(255,0,70,.9)) drop-shadow(-6px 0 0 rgba(0,235,255,.9))}
  16%{transform:translate(6px,-3px) skewX(4deg);filter:drop-shadow(-5px 0 0 rgba(255,0,70,.9)) drop-shadow(5px 0 0 rgba(0,235,255,.9)) contrast(1.4)}
  24%{transform:translate(0,0) skewX(0);filter:none}
  38%{transform:translate(4px,1px) skewX(2deg);filter:hue-rotate(90deg) saturate(2)}
  46%{transform:translate(-5px,-1px) skewX(-3deg);filter:drop-shadow(4px 0 0 rgba(255,0,70,.8)) drop-shadow(-4px 0 0 rgba(0,235,255,.8))}
  54%{transform:translate(0,0);filter:none}
  70%{transform:translate(-3px,0) skewX(1.5deg);filter:brightness(1.6) contrast(1.3)}
  74%{transform:translate(0,0);filter:none}
  100%{transform:translate(0,0) skewX(0);filter:none}
}`

const CSS = `
${glitchFrames('rf-glitch-a')}
${glitchFrames('rf-glitch-b')}
.rf-gl-1{animation:rf-glitch-a .8s steps(1,end) 1}
.rf-gl-2{animation:rf-glitch-b .8s steps(1,end) 1}
@keyframes rf-bar{
  0%{opacity:0;transform:translateX(-40%)}
  15%{opacity:1;transform:translateX(12%)}
  30%{opacity:0}
  45%{opacity:1;transform:translateX(-10%)}
  60%{opacity:0}
  75%{opacity:.9;transform:translateX(25%)}
  100%{opacity:0;transform:translateX(50%)}
}
.rf-bar{animation:rf-bar .8s steps(1,end) both}
@keyframes rf-step{from{transform:rotate(28deg)}to{transform:rotate(-28deg)}}
.rf-leg-a{animation:rf-step .28s ease-in-out infinite alternate}
.rf-leg-b{animation:rf-step .28s ease-in-out infinite alternate-reverse}
@keyframes rf-spray{
  0%{opacity:0;transform:translate(0,0)}
  30%{opacity:1}
  100%{opacity:0;transform:translate(7px,-6px)}
}
.rf-spray{animation:rf-spray .5s linear infinite}
@media (prefers-reduced-motion:reduce){
  .rf-gl-1,.rf-gl-2,.rf-leg-a,.rf-leg-b,.rf-spray{animation:none!important}
  .rf-bar{display:none}
}`

const BARS = [
  { top: '12%', h: 10, c: '#ffffff', d: '0s' },
  { top: '38%', h: 5, c: '#ff0046', d: '.08s' },
  { top: '61%', h: 14, c: '#00ebff', d: '.16s' },
  { top: '84%', h: 7, c: '#ffffff', d: '.24s' },
]

/* ───────────────────────── «Помятость» карточки ───────────────────────── */

function Wear({ wear, i }: { wear: number; i: number }) {
  const a = (i * 17) % 40
  const s = wear === 0 ? 0 : 12 + wear * 9
  return (
    <>
      {/* складки */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: wear === 0 ? 0 : Math.min(0.2 + wear * 0.13, 0.85),
          background: [
            `linear-gradient(${115 + a}deg, transparent 38%, rgba(0,0,0,.3) 38.4%, rgba(255,255,255,.2) 39%, transparent 39.6%)`,
            `linear-gradient(${72 - a}deg, transparent 61%, rgba(255,255,255,.2) 61.3%, rgba(0,0,0,.3) 62%, transparent 62.6%)`,
            `linear-gradient(${160 + a}deg, transparent 22%, rgba(0,0,0,.2) 22.3%, rgba(255,255,255,.12) 23%, transparent 23.6%)`,
          ].join(','),
        }}
      />
      {/* загнутый уголок */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1 -top-1 transition-[width,height] duration-700"
        style={{
          width: s,
          height: s,
          background:
            'linear-gradient(225deg,#030303 0 50%,transparent 50%), linear-gradient(45deg,rgba(255,255,255,.35),rgba(0,0,0,.4))',
        }}
      />
    </>
  )
}

/* ───────────────────────── Человечек и граффити ───────────────────────── */

interface Piece { stand: number; paths: string[] }

// viewBox 400 x 150, земля на y = 146
const GROUND = 146
const PIECES: Piece[] = [
  // звезда
  { stand: 62, paths: ['M62 30 L70 52 L94 53 L75 67 L82 90 L62 76 L42 90 L49 67 L30 53 L54 52 Z'] },
  // тег «RF»
  {
    stand: 168,
    paths: [
      'M122 90 V34 H146 Q164 34 164 50 Q164 66 146 66 H122 M146 66 L166 90',
      'M184 90 V34 H214 M184 60 H208',
    ],
  },
  // смайл
  {
    stand: 272,
    paths: ['M272 38 a24 24 0 1 1 0 48 a24 24 0 1 1 0 -48', 'M263 55 V59 M281 55 V59', 'M261 70 Q272 81 283 70'],
  },
  // молния
  { stand: 350, paths: ['M352 28 L330 66 H348 L338 98 L368 56 H350 Z'] },
]

type Phase = 'idle' | 'walk' | 'draw' | 'gone'

function GraffitiWall({ active, reduce, className }: { active: boolean; reduce: boolean | null; className: string }) {
  const [drawn, setDrawn] = useState(0)
  const [x, setX] = useState(-40)
  const [dir, setDir] = useState<1 | -1>(1)
  const [phase, setPhase] = useState<Phase>('idle')

  useEffect(() => {
    if (!active) {
      // сбрасываем стену, когда оборот уже скрыт
      const id = window.setTimeout(() => {
        setDrawn(0)
        setX(-40)
        setDir(1)
        setPhase('idle')
      }, 900)
      return () => window.clearTimeout(id)
    }

    if (reduce) {
      setDrawn(PIECES.length)
      setPhase('gone')
      return
    }

    let dead = false
    const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms))

    void (async () => {
      let cur = -40
      await wait(900)
      for (let k = 0; k < PIECES.length; k++) {
        if (dead) return
        const tx = PIECES[k].stand
        setDir(tx >= cur ? 1 : -1)
        cur = tx
        setPhase('walk')
        setX(tx)
        await wait(950)
        if (dead) return
        setPhase('draw')
        setDrawn(k + 1)
        await wait(1250)
      }
      if (dead) return
      setDir(1)
      setPhase('walk')
      setX(450)
      await wait(1100)
      if (!dead) setPhase('gone')
    })()

    return () => {
      dead = true
    }
  }, [active, reduce])

  const walking = phase === 'walk'
  const drawing = phase === 'draw'
  const legStyle = { transformBox: 'fill-box', transformOrigin: '50% 0%' } as const

  return (
    <div aria-hidden="true" className={`pointer-events-none relative mt-6 min-h-[9rem] flex-1 ${className}`}>
      <svg
        viewBox="0 0 400 150"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {PIECES.map((p, k) =>
          p.paths.map((d, n) => (
            <motion.path
              key={`${k}-${n}`}
              d={d}
              initial={false}
              animate={drawn > k ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={
                drawn > k
                  ? {
                      pathLength: { duration: 1, delay: n * 0.25, ease: 'easeInOut' },
                      opacity: { duration: 0.01, delay: n * 0.25 },
                    }
                  : { duration: 0 }
              }
            />
          )),
        )}

        {/* человечек */}
        <motion.g
          initial={false}
          animate={{ x, y: GROUND }}
          transition={{ duration: walking ? 0.95 : 0, ease: 'linear' }}
        >
          <g transform={`scale(${dir} 1)`}>
            <g className={walking ? 'rf-leg-a' : ''} style={legStyle}>
              <rect x={-6} y={-13} width={5} height={13} rx={2} fill="currentColor" stroke="none" />
            </g>
            <g className={walking ? 'rf-leg-b' : ''} style={legStyle}>
              <rect x={1} y={-13} width={5} height={13} rx={2} fill="currentColor" stroke="none" />
            </g>
            <rect x={-8} y={-27} width={16} height={16} rx={4} fill="currentColor" stroke="none" />
            <circle cx={0} cy={-33} r={6} fill="currentColor" stroke="none" />
            <path d="M-7 -35 Q0 -45 7 -35 Z" fill="#ff2e63" stroke="none" />
            <path d="M3 -35 H13" stroke="#ff2e63" strokeWidth={2.5} />
            <line
              x1={4}
              y1={-23}
              x2={drawing ? 15 : 8}
              y2={drawing ? -39 : -12}
              stroke="currentColor"
              strokeWidth={4}
            />
            {drawing && (
              <g fill="currentColor" stroke="none">
                <rect x={12} y={-48} width={6} height={9} rx={1.5} />
                <circle className="rf-spray" cx={22} cy={-46} r={1.6} />
                <circle className="rf-spray" cx={24} cy={-43} r={1.4} style={{ animationDelay: '.15s' }} />
                <circle className="rf-spray" cx={21} cy={-50} r={1.2} style={{ animationDelay: '.3s' }} />
              </g>
            )}
          </g>
        </motion.g>
      </svg>
    </div>
  )
}

/* ───────────────────────── Карточка ───────────────────────── */

const FACE =
  'relative col-start-1 row-start-1 border-4 border-black outline outline-2 outline-white/20 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]'

function Card({ c, i, w }: { c: CaseItem; i: number; w: Dict['work'] }) {
  const th = THEMES[i % THEMES.length]
  const reduce = useReducedMotion()
  const [flipped, setFlipped] = useState(false)
  const [flips, setFlips] = useState(0)
  const [glitch, setGlitch] = useState<0 | 1 | 2>(0)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const toggle = () => {
    setFlipped((f) => !f)
    setFlips((n) => n + 1)
    if (!reduce) {
      setGlitch((g) => (g === 1 ? 2 : 1))
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setGlitch(0), 850)
    }
  }

  const wear = Math.min(flips, 5)
  const tilt = wear * (i % 2 ? 0.2 : -0.2)
  const glitchClass = glitch === 1 ? 'rf-gl-1' : glitch === 2 ? 'rf-gl-2' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      whileHover={{ rotate: flipped ? 0 : i % 2 ? 0.4 : -0.4 }}
      className="relative"
    >
      <div
        className={`relative [perspective:2200px] ${glitchClass}`}
        style={{ transform: `rotate(${tilt}deg)`, transition: 'transform .6s ease' }}
      >
        <motion.article
          onClick={toggle}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative grid cursor-pointer"
        >
          {/* ───────── ЛИЦЕВАЯ СТОРОНА ───────── */}
          <div
            className={`${FACE} flex flex-col ${th.bg}`}
            aria-hidden={flipped}
            style={{ pointerEvents: flipped ? 'none' : 'auto' }}
          >
            <div className="hazard-thin h-2 w-full" aria-hidden="true" />
            <div className="grid flex-1 gap-8 p-5 md:grid-cols-[1.4fr_1fr] md:p-10">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <Spec className={th.accent}>{c.id}</Spec>
                  <CrashBadge>{c.badge}</CrashBadge>
                </div>
                <h3 className="font-display text-[clamp(2.4rem,7vw,6.5rem)] uppercase leading-[.9] tracking-tighter">{c.name}</h3>
                <p className={`tape mt-3 ${th.accent}`}>{c.kind}</p>
                <p className={`mt-6 max-w-xl leading-relaxed ${th.sub}`}>{c.desc}</p>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div>
                  <Spec className={th.accent}>{w.specLabel}</Spec>
                  <dl className={`mt-2 border-t-2 ${th.rule}`}>
                    {c.specs.map(([k, v]) => (
                      <div key={k} className={`flex items-baseline justify-between gap-4 border-b border-dashed py-2 ${th.rule}`}>
                        <dt className="tape opacity-70">{k}</dt>
                        <dd className="font-display text-lg uppercase">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <Spec className={th.accent}>{w.stackLabel}</Spec>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <li key={tag} className={`tape border-2 px-2 py-1 ${th.tag}`}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-between gap-4 border-t-2 px-5 py-3 md:px-10 ${th.rule}`}>
              <Spec>[RF-SPEC // 2026]</Spec>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  tabIndex={flipped ? -1 : 0}
                  aria-label={`${w.flip}: ${c.name}`}
                  className={`tape inline-flex items-center gap-2 border-2 px-3 py-1 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${th.tag}`}
                >
                  {w.flip} <span aria-hidden="true">↻</span>
                </button>
                <Barcode seed={i * 5 + 3} className="h-7 w-32" />
              </div>
            </div>
            <Wear wear={wear} i={i} />
          </div>

          {/* ───────── ОБРАТНАЯ СТОРОНА ───────── */}
          <div
            className={`${FACE} flex flex-col ${th.bg}`}
            aria-hidden={!flipped}
            style={{ transform: 'rotateY(180deg)', pointerEvents: flipped ? 'auto' : 'none' }}
          >
            <div className="hazard-thin h-2 w-full" aria-hidden="true" />
            <div className="grid flex-1 gap-8 p-5 md:grid-cols-[1fr_1.1fr] md:p-10">
              <div className="flex flex-col">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <Spec className={th.accent}>{c.id}</Spec>
                  <Spec className={th.accent}>{w.detailsLabel}</Spec>
                </div>
                <h3 className="font-display text-[clamp(2rem,5vw,4.5rem)] uppercase leading-[.9] tracking-tighter">{c.name}</h3>
                <p className={`mt-6 max-w-xl leading-relaxed ${th.sub}`}>{c.details.lead}</p>

                {c.details.url && (
                  <a
                    href={c.details.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={flipped ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                    className={`tape mt-8 inline-flex w-fit items-center gap-2 border-2 px-4 py-2 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${th.tag}`}
                  >
                    {w.openLabel} <span aria-hidden="true">↗</span>
                  </a>
                )}

                {/* стена для граффити */}
                <GraffitiWall active={flipped} reduce={reduce} className={th.accent} />
              </div>

              <div>
                <Spec className={th.accent}>{w.featuresLabel}</Spec>
                <ol className={`mt-2 border-t-2 ${th.rule}`}>
                  {c.details.points.map((p, n) => (
                    <li key={p} className={`flex gap-4 border-b border-dashed py-3 ${th.rule}`}>
                      <span className={`tape pt-0.5 ${th.accent}`}>{String(n + 1).padStart(2, '0')}</span>
                      <span className={`leading-relaxed ${th.sub}`}>{p}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className={`flex items-center justify-between gap-4 border-t-2 px-5 py-3 md:px-10 ${th.rule}`}>
              <Spec>[RF-SPEC // 2026]</Spec>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  tabIndex={flipped ? 0 : -1}
                  className={`tape inline-flex items-center gap-2 border-2 px-3 py-1 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${th.tag}`}
                >
                  <span aria-hidden="true">↺</span> {w.back}
                </button>
                <Barcode seed={i * 5 + 3} className="h-7 w-32" />
              </div>
            </div>
            <Wear wear={wear} i={i} />
          </div>
        </motion.article>

        {/* глитч-полосы поверх карточки на время переворота */}
        {glitch !== 0 && (
          <div key={glitch} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
            {BARS.map((b) => (
              <span
                key={b.top}
                className="rf-bar absolute left-0 w-full"
                style={{ top: b.top, height: b.h, background: b.c, mixBlendMode: 'difference', animationDelay: b.d }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Work() {
  const { t } = useLang()
  const w = t.work
  return (
    <section id="work" className="mx-auto max-w-[1500px] px-4 py-20 md:px-8 md:py-28">
      <style>{CSS}</style>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-[clamp(3rem,11vw,10rem)] uppercase leading-[.85] tracking-tighter">
          <span className="chrome-text">{w.title}</span>
        </h2>
        <p className="tape max-w-xs text-white/70">{w.sub}</p>
      </div>
      <div className="flex flex-col gap-10">
        {w.cases.map((c, i) => (
          <Card key={c.id} c={c} i={i} w={w} />
        ))}
      </div>
    </section>
  )
}
