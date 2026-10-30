import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'ru' | 'en'

export interface CaseItem {
  id: string
  name: string
  kind: string
  desc: string
  specs: [string, string][]
  tags: string[]
  badge: string
}

export interface Dict {
  meta: { title: string; description: string }
  header: { status: string; tg: string; gh: string }
  hero: { line1: string; line2: string; line3: string; sub: string; ctaPrimary: string; ctaSecondary: string; tag: string }
  marquee: string[]
  work: { title: string; sub: string; specLabel: string; stackLabel: string; cases: CaseItem[] }
  manifesto: { title: string; items: { n: string; title: string; body: string; stamp: string }[] }
  footer: { big1: string; big2: string; sub: string; tg: string; gh: string; copy: string; copied: string; rights: string }
}

const ru: Dict = {
  meta: {
    title: 'RISEFAME // LAB — Цифровой продакшн и креативная инженерия',
    description: 'RISEFAME // LAB — лаборатория цифрового продакшна и креативной инженерии. Разработка без посредников, MVP за 3 недели.',
  },
  header: { status: 'SYSTEM ACTIVE / WORLDWIDE', tg: 'Telegram', gh: 'GitHub' },
  hero: {
    line1: 'ИНЖЕНЕРИЯ',
    line2: 'ЦИФРОВОГО',
    line3: 'ДОМИНИРОВАНИЯ',
    sub: 'Продакшн-код без посредников. Вы говорите с теми, кто пишет систему, — и получаете работающий продукт, а не презентацию.',
    ctaPrimary: 'Запустить проект',
    ctaSecondary: 'Смотреть кейсы',
    tag: 'Лаборатория цифрового продакшна и креативной инженерии',
  },
  marquee: ['БЕЗ ПОСРЕДНИКОВ', 'MVP ЗА 3 НЕДЕЛИ', 'PRODUCTION GRADE', 'REALTIME', 'ЧИСТЫЙ КОД', 'TALK IS CHEAP'],
  work: {
    title: 'КЕЙСЫ',
    sub: 'Три системы, которые работают в бою.',
    specLabel: 'ТЕХ. ХАРАКТЕРИСТИКИ',
    stackLabel: 'СТЕК',
    cases: [
      {
        id: '01 // VN1MAN1E',
        name: 'VN1MAN1E',
        kind: 'Realtime Interaction Engine',
        desc: 'Движок интерактива в реальном времени: события долетают до всех клиентов мгновенно, состояние синхронизируется без перезагрузок.',
        specs: [['LATENCY', '0 ms'], ['SYNC', 'REALTIME'], ['LAYER', 'WEB APP']],
        tags: ['React', 'Supabase', 'Realtime'],
        badge: 'CRASH-TEST: PASSED',
      },
      {
        id: '02 // COFFEE OS',
        name: 'COFFEE OS',
        kind: 'Full-Cycle Pre-Order & Kitchen Display System',
        desc: 'Полный цикл предзаказа: от меню гостя до экрана кухни. B2B-платформа с онлайн-очередью, соответствием 54-ФЗ и живым статусом каждого заказа.',
        specs: [['MODEL', 'B2B'], ['COMPLIANCE', '54-ФЗ'], ['QUEUE', 'REALTIME']],
        tags: ['B2B', '54-ФЗ', 'Realtime Queue', 'KDS'],
        badge: 'CRASH-TEST: PASSED',
      },
      {
        id: '03 // GEO ENGINE',
        name: 'GEO ENGINE',
        kind: 'High-Throughput Async Retail Scraper',
        desc: 'Асинхронный сборщик данных розницы с высокой пропускной способностью. Результаты доставляются через Telegram-движок.',
        specs: [['MODE', 'ASYNC'], ['THROUGHPUT', 'HIGH'], ['OUTPUT', 'TELEGRAM']],
        tags: ['Python', 'Telegram Engine', 'Async'],
        badge: 'CRASH-TEST: PASSED',
      },
    ],
  },
  manifesto: {
    title: 'МАНИФЕСТ',
    items: [
      { n: 'A', title: 'NO MIDDLEMEN', body: 'Только прямая разработка. Ни менеджеров-прокладок, ни глухого телефона. Вы общаетесь с инженером, который пишет ваш код.', stamp: 'DIRECT ONLY' },
      { n: 'B', title: 'BRUTAL SPEED', body: 'Запуск MVP за 3 недели. Не «примерно», а по графику: к третьей неделе у вас живой продукт в руках.', stamp: '3 WEEKS' },
      { n: 'C', title: 'PRODUCTION GRADE CODE', body: 'Никаких устаревших CMS. Типизированный код, современный стек, архитектура, которая выдерживает нагрузку и рост.', stamp: 'NO LEGACY' },
    ],
  },
  footer: {
    big1: 'TALK IS CHEAP.',
    big2: "LET'S BUILD.",
    sub: 'Напишите нам. Ответим по делу и быстро.',
    tg: 'Написать в Telegram',
    gh: 'GitHub',
    copy: 'Скопировать email',
    copied: 'Скопировано',
    rights: 'Все права защищены.',
  },
}

const en: Dict = {
  meta: {
    title: 'RISEFAME // LAB — Digital Production & Creative Engineering',
    description: 'RISEFAME // LAB — Digital Production & Creative Engineering Lab. Direct development, no middlemen, MVP in 3 weeks.',
  },
  header: { status: 'SYSTEM ACTIVE / WORLDWIDE', tg: 'Telegram', gh: 'GitHub' },
  hero: {
    line1: 'ENGINEERING',
    line2: 'UNFAIR DIGITAL',
    line3: 'ADVANTAGE',
    sub: 'Production code, zero middlemen. You talk to the people who write the system — and get a working product, not a slide deck.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'View cases',
    tag: 'Digital Production & Creative Engineering Lab',
  },
  marquee: ['NO MIDDLEMEN', 'MVP IN 3 WEEKS', 'PRODUCTION GRADE', 'REALTIME', 'CLEAN CODE', 'TALK IS CHEAP'],
  work: {
    title: 'WORK',
    sub: 'Three systems running in the field.',
    specLabel: 'TECH SPECS',
    stackLabel: 'STACK',
    cases: [
      {
        id: '01 // VN1MAN1E',
        name: 'VN1MAN1E',
        kind: 'Realtime Interaction Engine',
        desc: 'A realtime interaction engine: events reach every client instantly and state stays in sync with no reloads.',
        specs: [['LATENCY', '0 ms'], ['SYNC', 'REALTIME'], ['LAYER', 'WEB APP']],
        tags: ['React', 'Supabase', 'Realtime'],
        badge: 'CRASH-TEST: PASSED',
      },
      {
        id: '02 // COFFEE OS',
        name: 'COFFEE OS',
        kind: 'Full-Cycle Pre-Order & Kitchen Display System',
        desc: 'Full-cycle pre-ordering, from the guest menu to the kitchen screen. A B2B platform with a live queue, 54-FZ fiscal compliance and real-time status for every order.',
        specs: [['MODEL', 'B2B'], ['COMPLIANCE', '54-FZ'], ['QUEUE', 'REALTIME']],
        tags: ['B2B', '54-FZ', 'Realtime Queue', 'KDS'],
        badge: 'CRASH-TEST: PASSED',
      },
      {
        id: '03 // GEO ENGINE',
        name: 'GEO ENGINE',
        kind: 'High-Throughput Async Retail Scraper',
        desc: 'An async retail data scraper built for high throughput. Results are delivered through a Telegram engine.',
        specs: [['MODE', 'ASYNC'], ['THROUGHPUT', 'HIGH'], ['OUTPUT', 'TELEGRAM']],
        tags: ['Python', 'Telegram Engine', 'Async'],
        badge: 'CRASH-TEST: PASSED',
      },
    ],
  },
  manifesto: {
    title: 'MANIFESTO',
    items: [
      { n: 'A', title: 'NO MIDDLEMEN', body: 'Direct development only. No account managers, no telephone game. You talk to the engineer who writes your code.', stamp: 'DIRECT ONLY' },
      { n: 'B', title: 'BRUTAL SPEED', body: 'MVP live in 3 weeks. Not "roughly" — on schedule. By week three you hold a working product.', stamp: '3 WEEKS' },
      { n: 'C', title: 'PRODUCTION GRADE CODE', body: 'No legacy CMS. Typed code, a modern stack, and architecture that holds up under load and growth.', stamp: 'NO LEGACY' },
    ],
  },
  footer: {
    big1: 'TALK IS CHEAP.',
    big2: "LET'S BUILD.",
    sub: 'Message us. We reply fast and to the point.',
    tg: 'Message on Telegram',
    gh: 'GitHub',
    copy: 'Copy email',
    copied: 'Copied',
    rights: 'All rights reserved.',
  },
}

export const DICTS: Record<Lang, Dict> = { ru, en }

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: Dict }
const LangContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('rf-lang')
    if (saved === 'ru' || saved === 'en') return saved
  } catch { /* storage unavailable */ }
  return navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)
  const t = DICTS[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.meta.description)
    try { localStorage.setItem('rf-lang', lang) } catch { /* ignore */ }
  }, [lang, t])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
