import { useLang } from '../i18n'

export function MarqueeStrip({ reverse = false, tone = 'hazard' }: { reverse?: boolean; tone?: 'hazard' | 'volt' }) {
  const { t } = useLang()
  const items = [...t.marquee, ...t.marquee]
  const bg = tone === 'hazard' ? 'bg-hazard' : 'bg-volt'
  return (
    <div className={`${bg} overflow-hidden border-y-4 border-black py-2 text-black`} aria-hidden="true">
      <div className={`flex w-max whitespace-nowrap font-display text-2xl uppercase md:text-4xl ${reverse ? 'animate-marqueeRev' : 'animate-marquee'}`}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {items.map((s, i) => (
              <span key={i} className="px-6" style={{ letterSpacing: `${(i % 4) * 0.12 - 0.04}em` }}>
                {s} <span className="px-4">✕</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
