import { Github, Send } from 'lucide-react'
import { LINKS } from '../config'
import { useLang, type Lang } from '../i18n'

function LangSwitch() {
  const { lang, setLang } = useLang()
  const opt = (l: Lang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(l)}
      aria-pressed={lang === l}
      className={`px-2 py-1 transition-colors ${lang === l ? 'bg-hazard text-black' : 'text-white hover:text-hazard'}`}
    >
      {label}
    </button>
  )
  return (
    <div className="tape flex items-center border-2 border-white/80" role="group" aria-label="Language">
      <span className="px-1.5 text-white/60">[</span>
      {opt('ru', 'RU')}
      <span className="text-white/40">|</span>
      {opt('en', 'EN')}
      <span className="px-1.5 text-white/60">]</span>
    </div>
  )
}

export default function Header() {
  const { t } = useLang()
  return (
    <header className="sticky top-0 z-50 border-b-2 border-hazard bg-tar/90 backdrop-blur">
      <div className="hazard-thin h-1.5 w-full" aria-hidden="true" />
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-3 md:px-8">
        <a href="#top" className="font-display text-lg leading-none tracking-tight md:text-2xl">
          RISEFAME <span className="text-hazard">// LAB</span>
        </a>

        <div className="tape hidden items-center gap-2 lg:flex">
          <span className="animate-flicker text-volt">●</span>
          <span className="text-white/80">{t.header.status}</span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <LangSwitch />
          <a href={LINKS.telegram} target="_blank" rel="noreferrer" aria-label={t.header.tg}
             className="tape hidden items-center gap-2 text-white hover:text-hazard sm:inline-flex">
            <Send size={16} /> {t.header.tg}
          </a>
          <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label={t.header.gh}
             className="tape hidden items-center gap-2 text-white hover:text-hazard sm:inline-flex">
            <Github size={16} /> {t.header.gh}
          </a>
          <a href={LINKS.telegram} target="_blank" rel="noreferrer" aria-label={t.header.tg} className="text-white hover:text-hazard sm:hidden"><Send size={18} /></a>
          <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label={t.header.gh} className="text-white hover:text-hazard sm:hidden"><Github size={18} /></a>
        </div>
      </div>
    </header>
  )
}
