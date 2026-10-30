import { useState } from 'react'
import { Check, Copy, Github, Send } from 'lucide-react'
import { LINKS } from '../config'
import { useLang } from '../i18n'
import { Barcode, Spec } from './ui'

export default function Footer() {
  const { t } = useLang()
  const f = t.footer
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = LINKS.email
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <footer id="contact" className="relative overflow-hidden bg-hazard text-black">
      <div className="mx-auto max-w-[1500px] px-4 pb-8 pt-20 md:px-8 md:pt-28">
        <Spec>[AWGE-SPEC // 2026] — CONTACT</Spec>
        <p className="mt-6 font-display text-[clamp(2.6rem,10.5vw,10.5rem)] uppercase leading-[.86] tracking-tighter">
          {f.big1}<br />{f.big2}
        </p>
        <p className="mt-8 max-w-md text-lg">{f.sub}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href={LINKS.telegram} target="_blank" rel="noreferrer" className="btn-invert !border-black !bg-black !text-hazard hover:!bg-hazard hover:!text-black">
            <Send size={20} /> {f.tg}
          </a>
          <a href={LINKS.github} target="_blank" rel="noreferrer" className="btn-invert !border-black !bg-transparent !text-black hover:!bg-black hover:!text-hazard">
            <Github size={20} /> {f.gh}
          </a>
          <button type="button" onClick={copy} className="btn-invert !border-black !bg-transparent !text-black hover:!bg-black hover:!text-hazard">
            {copied ? <Check size={20} /> : <Copy size={20} />} {copied ? f.copied : f.copy}
            <span className="tape normal-case opacity-70">{LINKS.email}</span>
          </button>
          <span className="sr-only" role="status" aria-live="polite">{copied ? f.copied : ''}</span>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t-4 border-black pt-4">
          <Spec>© 2026 RISEFAME // LAB. {f.rights}</Spec>
          <Barcode seed={42} className="h-8 w-40" />
        </div>
      </div>
      <div className="hazard h-5 w-full" aria-hidden="true" />
    </footer>
  )
}
