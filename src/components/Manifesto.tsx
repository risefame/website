import { motion } from 'framer-motion'
import { useLang } from '../i18n'
import { Spec } from './ui'

export default function Manifesto() {
  const { t } = useLang()
  const m = t.manifesto
  return (
    <section id="manifesto" className="border-y-4 border-black bg-[#e8e6df] text-black">
      <div className="hazard h-4 w-full" aria-hidden="true" />
      <div className="mx-auto max-w-[1500px] px-4 py-20 md:px-8 md:py-28">
        <h2 className="mb-12 font-display text-[clamp(3rem,11vw,10rem)] uppercase leading-[.85] tracking-tighter">{m.title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {m.items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex min-h-[380px] flex-col justify-between border-4 border-black bg-tar p-6 text-white"
            >
              <div className="flex items-start justify-between">
                <Spec className="text-hazard">BLOCK_{it.n}</Spec>
                <span className="sticker rotate-3">{it.stamp}</span>
              </div>
              <div>
                <h3 className={`font-display text-4xl uppercase leading-[.95] tracking-tighter md:text-5xl ${i === 1 ? 'text-volt' : i === 2 ? 'chrome-text' : 'text-hazard'}`}>
                  {it.title}
                </h3>
                <p className="mt-4 leading-relaxed text-white/80">{it.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="hazard h-4 w-full" aria-hidden="true" />
    </section>
  )
}
