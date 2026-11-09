import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang, type CaseItem, type Dict } from '../i18n'
import { Barcode, CrashBadge, Spec } from './ui'

const THEMES = [
  { bg: 'bg-hazard text-black', accent: 'text-black', tag: 'border-black', sub: 'text-black/70', rule: 'border-black' },
  { bg: 'bg-[#0b0b0d] text-white', accent: 'text-volt', tag: 'border-volt text-volt', sub: 'text-white/70', rule: 'border-white/70' },
  { bg: 'bg-cobalt text-white', accent: 'text-hazard', tag: 'border-hazard text-hazard', sub: 'text-white/80', rule: 'border-white/70' },
  { bg: 'bg-volt text-black', accent: 'text-black', tag: 'border-black', sub: 'text-black/70', rule: 'border-black' },
] as const

/* ───────────────────────── CSS: шаги человечка и спрей ───────────────────────── */

const CSS = `
@keyframes rf-step{from{transform:rotate(28deg)}to{transform:rotate(-28deg)}}
.rf-leg-a{animation:rf-step .28s ease-in-out infinite alternate}
.rf-leg-b{animation:rf-step .28s ease-in-out infinite alternate-reverse}
@keyframes rf-spray{
  0%{opacity:0;transform:translate(0,0)}
  30%{opacity:1}
  100%{opacity:0;transform:translate(9px,-3px)}
}
.rf-spray{animation:rf-spray .5s linear infinite}
@media (prefers-reduced-motion:reduce){
  .rf-leg-a,.rf-leg-b,.rf-spray{animation:none!important}
}`

/* ───────────────────────── «Помятость» (только пока карточка перевёрнута) ───────────────────────── */

function Wear({ on, i }: { on: boolean; i: number }) {
  const a = (i * 17) % 40
  const s = on ? 40 : 0
  return (
    <>
      {/* складки */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: on ? 0.6 : 0,
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

/* ───────────────────────── Граффити: у каждого кейса своя сцена ───────────────────────── */

interface Piece {
  stand: number // где стоит человечек (x)
  at: [number, number] // куда направлена рука (центр рисунка)
  paths: string[]
}
interface Scene {
  enter: 'l' | 'r'
  exit: 'l' | 'r'
  pieces: Piece[]
}

// холст 400 x 170, земля на y = 166
const GROUND = 166

const SCENES: Scene[] = [
  // 01 — приходит слева, рисует звезду, молнию, смайл и стрелку; уходит вправо
  {
    enter: 'l',
    exit: 'r',
    pieces: [
      { stand: 38, at: [70, 52], paths: ['M70 24 L78 44 L100 45 L83 58 L89 80 L70 67 L51 80 L57 58 L40 45 L62 44 Z'] },
      { stand: 195, at: [153, 54], paths: ['M158 18 L134 58 H152 L142 90 L172 50 H154 Z'] },
      {
        stand: 250,
        at: [290, 60],
        paths: ['M290 36 a24 24 0 1 1 0 48 a24 24 0 1 1 0 -48', 'M281 53 V57 M299 53 V57', 'M279 68 Q290 79 301 68'],
      },
      { stand: 318, at: [355, 138], paths: ['M335 138 H375 M362 126 L376 138 L362 150'] },
    ],
  },
  // 02 — приходит справа, рисует чашку, корону, глаз и крестик; уходит влево
  {
    enter: 'r',
    exit: 'l',
    pieces: [
      {
        stand: 368,
        at: [336, 70],
        paths: [
          'M312 50 H352 V80 Q352 98 332 98 Q312 98 312 80 Z',
          'M352 58 Q368 58 368 72 Q368 84 352 84',
          'M324 42 Q318 34 324 26 M338 42 Q332 34 338 26',
        ],
      },
      { stand: 272, at: [210, 60], paths: ['M180 82 L184 42 L198 62 L210 36 L222 62 L236 42 L240 82 Z'] },
      {
        stand: 168,
        at: [110, 60],
        paths: ['M70 60 Q110 25 150 60 Q110 95 70 60 Z', 'M110 50 a10 10 0 1 1 0 20 a10 10 0 1 1 0 -20'],
      },
      { stand: 88, at: [40, 136], paths: ['M22 120 L56 152 M56 120 L22 152'] },
    ],
  },
  // 03 — приходит слева, рисует пин, глобус, радар и стрелку вниз; уходит вправо
  {
    enter: 'l',
    exit: 'r',
    pieces: [
      {
        stand: 108,
        at: [60, 62],
        paths: ['M60 100 C34 72 38 34 60 34 C82 34 86 72 60 100 Z', 'M60 54 a7 7 0 1 1 0 14 a7 7 0 1 1 0 -14'],
      },
      {
        stand: 160,
        at: [205, 70],
        paths: [
          'M205 42 a28 28 0 1 1 0 56 a28 28 0 1 1 0 -56',
          'M205 42 Q181 70 205 98 Q229 70 205 42',
          'M177 70 H233',
        ],
      },
      {
        stand: 272,
        at: [330, 50],
        paths: ['M316 68 Q330 54 344 68', 'M304 58 Q330 34 356 58', 'M292 48 Q330 14 368 48'],
      },
      { stand: 330, at: [372, 136], paths: ['M372 118 V152 M358 138 L372 152 L386 138'] },
    ],
  },
  // 04 — приходит справа, рисует ₽, график, монету и процент; уходит влево
  {
    enter: 'r',
    exit: 'l',
    pieces: [
      {
        stand: 288,
        at: [332, 70],
        paths: ['M314 100 V40 H338 Q358 40 358 58 Q358 76 338 76 H308 M308 90 H342'],
      },
      {
        stand: 262,
        at: [190, 70],
        paths: ['M150 110 V30 M150 110 H240', 'M160 95 L185 75 L205 85 L235 45', 'M222 44 H236 V58'],
      },
      {
        stand: 132,
        at: [80, 60],
        paths: ['M80 34 a26 26 0 1 1 0 52 a26 26 0 1 1 0 -52', 'M80 46 a14 14 0 1 1 0 28 a14 14 0 1 1 0 -28'],
      },
      {
        stand: 100,
        at: [44, 138],
        paths: [
          'M30 118 a7 7 0 1 1 0 14 a7 7 0 1 1 0 -14',
          'M58 144 a7 7 0 1 1 0 14 a7 7 0 1 1 0 -14',
          'M64 114 L24 160',
        ],
      },
    ],
  },
]

type Phase = 'idle' | 'walk' | 'draw' | 'gone'

function GraffitiWall({
  active,
  reduce,
  scene,
  className,
}: {
  active: boolean
  reduce: boolean | null
  scene: Scene
  className: string
}) {
  const [drawn, setDrawn] = useState(0)
  const [target, setTarget] = useState(0)
  const [x, setX] = useState(scene.enter === 'l' ? -40 : 440)
  const [dir, setDir] = useState<1 | -1>(scene.enter === 'l' ? 1 : -1)
  const [dur, setDur] = useState(0.9)
  const [phase, setPhase] = useState<Phase>('idle')

  useEffect(() => {
    const startX = scene.enter === 'l' ? -40 : 440

    if (!active) {
      // стену очищаем, когда оборот уже скрыт
      const id = window.setTimeout(() => {
        setDrawn(0)
        setTarget(0)
        setX(startX)
        setDir(scene.enter === 'l' ? 1 : -1)
        setPhase('idle')
      }, 900)
      return () => window.clearTimeout(id)
    }

    if (reduce) {
      setDrawn(scene.pieces.length)
      setPhase('gone')
      return
    }

    let dead = false
    const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms))

    void (async () => {
      let cur = startX
      await wait(900)
      for (let k = 0; k < scene.pieces.length; k++) {
        if (dead) return
        const { stand, at, paths } = scene.pieces[k]
        const ms = Math.max(600, Math.min(1500, Math.abs(stand - cur) * 6))
        setDir(stand >= cur ? 1 : -1)
        setPhase('walk')
        setDur(ms / 1000)
        setX(stand)
        cur = stand
        await wait(ms + 50)
        if (dead) return
        setDir(at[0] >= stand ? 1 : -1) // поворачиваемся лицом к рисунку
        setTarget(k)
        setPhase('draw')
        setDrawn(k + 1)
        await wait(1250 + (paths.length - 1) * 250)
      }
      if (dead) return
      const exitX = scene.exit === 'l' ? -40 : 440
      const ms = Math.max(700, Math.min(1500, Math.abs(exitX - cur) * 6))
      setDir(exitX >= cur ? 1 : -1)
      setPhase('walk')
      setDur(ms / 1000)
      setX(exitX)
      await wait(ms + 50)
      if (!dead) setPhase('gone')
    })()

    return () => {
      dead = true
    }
  }, [active, reduce, scene])

  const walking = phase === 'walk'
  const drawing = phase === 'draw'
  const legStyle = { transformBox: 'fill-box', transformOrigin: '50% 0%' } as const

  // рука тянется к тому месту, где рисуем
  const [ax, ay] = scene.pieces[target].at
  const lx = (ax - x) * dir - 4
  const ly = ay - (GROUND - 23)
  const len = Math.hypot(lx, ly) || 1
  const ux = lx / len
  const uy = ly / len
  const tipX = 4 + ux * 17
  const tipY = -23 + uy * 17
  const deg = (Math.atan2(uy, ux) * 180) / Math.PI

  return (
    <div aria-hidden="true" className={`pointer-events-none relative mt-6 min-h-[10rem] flex-1 ${className}`}>
      <svg
        viewBox="0 0 400 170"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {scene.pieces.map((p, k) =>
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
          transition={{ duration: walking ? dur : 0, ease: 'linear' }}
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
              x2={drawing ? tipX : 8}
              y2={drawing ? tipY : -12}
              stroke="currentColor"
              strokeWidth={4}
            />
            {drawing && (
              <g transform={`translate(${tipX} ${tipY}) rotate(${deg})`} fill="currentColor" stroke="none">
                <rect x={-1} y={-3.5} width={9} height={7} rx={1.5} />
                <circle className="rf-spray" cx={11} cy={0} r={1.6} />
                <circle className="rf-spray" cx={13} cy={-2.5} r={1.3} style={{ animationDelay: '.15s' }} />
                <circle className="rf-spray" cx={13} cy={2.5} r={1.2} style={{ animationDelay: '.3s' }} />
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
  const toggle = () => setFlipped((f) => !f)

  // небольшой перекос карточки, только пока она перевёрнута
  const tilt = flipped ? (i % 2 ? 0.5 : -0.5) : 0

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
        className="relative [perspective:2200px]"
        style={{ transform: `rotate(${tilt}deg)`, transition: 'transform .7s ease' }}
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

                {/* стена для граффити: у каждого кейса своя сцена */}
                <GraffitiWall
                  active={flipped}
                  reduce={reduce}
                  scene={SCENES[i % SCENES.length]}
                  className={th.accent}
                />
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

            {/* помятость: есть только на перевёрнутой стороне */}
            <Wear on={flipped} i={i} />
          </div>
        </motion.article>
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
