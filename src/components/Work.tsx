import { motion } from 'framer-motion'
import { useLang, type CaseItem } from '../i18n'
import { Barcode, CrashBadge, Spec } from './ui'

const THEMES = [
  { bg: 'bg-hazard text-black', accent: 'text-black', tag: 'border-black', sub: 'text-black/70', rule: 'border-black' },
  { bg: 'bg-[#0b0b0d] text-white', accent: 'text-volt', tag: 'border-volt text-volt', sub: 'text-white/70', rule: 'border-white/70' },
  { bg: 'bg-cobalt text-white', accent: 'text-hazard', tag: 'border-hazard text-hazard', sub: 'text-white/80', rule: 'border-white/70' },
] as const

function Card({ c, i, specLabel, stackLabel }: { c: CaseItem; i: number; specLabel: string; stackLabel: string }) {
  const th = THEMES[i % THEMES.length]
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      whileHover={{ rotate: i % 2 ? 0.4 : -0.4 }}
      className={`relative border-4 border-black outline outline-2 outline-white/20 ${th.bg}`}
    >
      <div className="hazard-thin h-2 w-full" aria-hidden="true" />
      <div className="grid gap-8 p-5 md:grid-cols-[1.4fr_1fr] md:p-10">
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
            <Spec className={th.accent}>{specLabel}</Spec>
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
            <Spec className={th.accent}>{stackLabel}</Spec>
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
        <Barcode seed={i * 5 + 3} className="h-7 w-32" />
      </div>
    </motion.article>
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
          <Card key={c.id} c={c} i={i} specLabel={w.specLabel} stackLabel={w.stackLabel} />
        ))}
      </div>
    </section>
  )
}
