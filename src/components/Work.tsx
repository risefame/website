import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang, type CaseItem, type Dict } from '../i18n'
import { Barcode, CrashBadge, Spec } from './ui'

const THEMES = [
  { bg: 'bg-hazard text-black', accent: 'text-black', tag: 'border-black', sub: 'text-black/70', rule: 'border-black' },
  { bg: 'bg-[#0b0b0d] text-white', accent: 'text-volt', tag: 'border-volt text-volt', sub: 'text-white/70', rule: 'border-white/70' },
  { bg: 'bg-cobalt text-white', accent: 'text-hazard', tag: 'border-hazard text-hazard', sub: 'text-white/80', rule: 'border-white/70' },
  { bg: 'bg-volt text-black', accent: 'text-black', tag: 'border-black', sub: 'text-black/70', rule: 'border-black' },
] as const

// Обе стороны карточки лежат в одной ячейке grid, поэтому высота = высота самой высокой стороны.
const FACE =
  'col-start-1 row-start-1 border-4 border-black outline outline-2 outline-white/20 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]'

function Card({ c, i, w }: { c: CaseItem; i: number; w: Dict['work'] }) {
  const th = THEMES[i % THEMES.length]
  const [flipped, setFlipped] = useState(false)
  const reduce = useReducedMotion()
  const toggle = () => setFlipped((f) => !f)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      whileHover={{ rotate: flipped ? 0 : i % 2 ? 0.4 : -0.4 }}
      className="relative [perspective:2200px]"
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
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function Work() {
  const { t } = useLang()
  const w = t.work
  return (
    <section id="work" className="mx-auto max-w-[1500px] px-4 py-20 md:px-8 md:py-28">
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
