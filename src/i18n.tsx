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
  details: { lead: string; points: string[]; url?: string }
}

export interface Dict {
  meta: { title: string; description: string }
  header: { status: string; tg: string; gh: string }
  hero: {
    line1: string
    line2: string
    line3: string
    serviceBadge: string
    sub: string
    ctaPrimary: string
    ctaSecondary: string
    tag: string
    coreEngine: {
      status: string
      fps: string
      badge: string
      chips: { id: string; title: string; tech: string }[]
      specLabel: string
    }
  }
  marquee: string[]
  work: {
    title: string
    sub: string
    specLabel: string
    stackLabel: string
    flip: string
    back: string
    detailsLabel: string
    featuresLabel: string
    openLabel: string
    cases: CaseItem[]
  }
  manifesto: { title: string; items: { n: string; title: string; body: string; stamp: string }[] }
  footer: {
    contactSpec: string
    big1: string
    big2: string
    sub: string
    tg: string
    gh: string
    copy: string
    copied: string
    rights: string
  }
}

const ru: Dict = {
  meta: {
    title: 'RISEFAME // LAB — Цифровой продакшн и креативная инженерия',
    description: 'RISEFAME // LAB — лаборатория цифрового продакшна и креативной инженерии. Разработка мобильных приложений, веб-сервисов и сложных сайтов без посредников.',
  },
  header: { status: 'SYSTEM ACTIVE / WORLDWIDE', tg: 'Telegram', gh: 'GitHub' },
  hero: {
    line1: 'ИНЖЕНЕРИЯ',
    line2: 'ЦИФРОВОГО',
    line3: 'ДОМИНИРОВАНИЯ',
    serviceBadge: 'РАЗРАБОТКА: МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ // ВЕБ-СЕРВИСЫ // СЛОЖНЫЕ САЙТЫ',
    sub: 'Ноль аккаунт-менеджеров. Ноль пустых слайдов. Прямой контакт с инженерами: вы получаете боевую систему на сервере, пока агентства продают вам созвоны в Zoom.',
    ctaPrimary: 'Запустить проект',
    ctaSecondary: 'Смотреть кейсы',
    tag: 'Лаборатория цифрового продакшна и креативной инженерии',
    coreEngine: {
      status: 'CORE: ACTIVE',
      fps: '60 FPS // 0ms',
      badge: 'RISEFAME // LAB',
      chips: [
        { id: '01', title: 'IOS & ANDROID APPS', tech: 'REACT NATIVE • SWIFT • NATIVE UI' },
        { id: '02', title: 'WEB PLATFORMS & SAAS', tech: 'HIGH-LOAD • REALTIME SYNC • B2B' },
        { id: '03', title: 'FULL-CYCLE WEBSITES', tech: 'BESPOKE DESIGN • FLUID MOTION' },
      ],
      specLabel: 'PRODUCTION READY // 2026',
    },
  },
  marquee: ['БЕЗ ПОСРЕДНИКОВ', 'MVP ЗА 3 НЕДЕЛИ', 'PRODUCTION GRADE', 'REALTIME', 'ЧИСТЫЙ КОД', 'ХВАТИТ СЛОВ'],
  work: {
    title: 'КЕЙСЫ',
    sub: 'Четыре системы, которые работают в бою.',
    specLabel: 'ТЕХ. ХАРАКТЕРИСТИКИ',
    stackLabel: 'СТЕК',
    flip: 'ПОДРОБНЕЕ',
    back: 'НАЗАД',
    detailsLabel: 'ПОДРОБНОСТИ',
    featuresLabel: 'ЧТО ВНУТРИ',
    openLabel: 'ОТКРЫТЬ ПРОЕКТ',
    cases: [
      {
        id: '01 // VN1MAN1E',
        name: 'VN1MAN1E',
        kind: 'Realtime Interaction Engine',
        desc: 'Движок интерактива в реальном времени: события долетают до всех клиентов мгновенно, состояние синхронизируется без перезагрузок.',
        specs: [['LATENCY', '0 ms'], ['SYNC', 'REALTIME'], ['LAYER', 'WEB APP']],
        tags: ['React', 'Supabase', 'Realtime'],
        badge: 'CRASH-TEST: PASSED',
        details: {
          lead: 'Ядро для интерактивных веб-продуктов, где всё происходит здесь и сейчас: действие одного участника мгновенно видят все остальные.',
          points: [
            'События доставляются всем клиентам в реальном времени',
            'Общее состояние синхронизируется без перезагрузки страницы',
            'Клиент на React, realtime-слой и данные на Supabase',
            'Прошёл краш-тест перед запуском',
          ],
          url: 'https://vn1man1e.pages.dev/',
        },
      },
      {
        id: '02 // COFFEE OS',
        name: 'COFFEE OS',
        kind: 'Full-Cycle Pre-Order & Kitchen Display System',
        desc: 'Полный цикл предзаказа: от меню гостя до экрана кухни. B2B-платформа с онлайн-очередью, соответствием 54-ФЗ и живым статусом каждого заказа.',
        specs: [['MODEL', 'B2B'], ['COMPLIANCE', '54-ФЗ'], ['QUEUE', 'REALTIME']],
        tags: ['B2B', '54-ФЗ', 'Realtime Queue', 'KDS'],
        badge: 'CRASH-TEST: PASSED',
        details: {
          lead: 'Платформа для кофеен и общепита: гость оформляет предзаказ, а кухня видит его на экране и ведёт заказ до выдачи.',
          points: [
            'Меню и предзаказ для гостя',
            'Экран кухни (KDS) с живой очередью заказов',
            'Статус каждого заказа обновляется в реальном времени',
            'Соответствие 54-ФЗ для B2B-клиентов',
          ],
        },
      },
      {
        id: '03 // GEO ENGINE',
        name: 'GEO ENGINE',
        kind: 'High-Throughput Async Retail Scraper',
        desc: 'Асинхронный сборщик данных розницы с высокой пропускной способностью. Результаты доставляются через Telegram-движок.',
        specs: [['MODE', 'ASYNC'], ['THROUGHPUT', 'HIGH'], ['OUTPUT', 'TELEGRAM']],
        tags: ['Python', 'Telegram Engine', 'Async'],
        badge: 'CRASH-TEST: PASSED',
        details: {
          lead: 'Сборщик данных розницы, рассчитанный на большой поток запросов: работает асинхронно и отдаёт результат прямо в Telegram.',
          points: [
            'Асинхронный сбор данных с высокой пропускной способностью',
            'Результаты доставляются через Telegram-движок',
            'Python и асинхронная архитектура',
            'Прошёл краш-тест перед запуском',
          ],
        },
      },
      {
        id: '04 // FINSYSTEM',
        name: 'FINSYSTEM',
        kind: 'Personal Finance Control System',
        desc: 'Личная финансовая система: сколько денег свободно, что с долгами и какой платёж ближайший. Каждый приход сам делится по конвертам, а приложение ставится на телефон.',
        specs: [['MODEL', 'PERSONAL'], ['SPLIT', '50/40/10'], ['LAYER', 'PWA']],
        tags: ['PWA', 'Cloudflare', 'JSON Backup', 'Dark / Light'],
        badge: 'CRASH-TEST: PASSED',
        details: {
          lead: 'Приложение, которое отвечает на главный вопрос про деньги: сколько можно потратить сегодня. Всё важное собрано на одном экране.',
          points: [
            'Главный экран: свободные деньги и лимит на день, ближайший платёж, прогресс по долгам, расходы за 7 дней',
            'Разделы: деньги, долги, платежи, аналитика; операция добавляется одной кнопкой',
            'Каждый новый приход делится по конвертам «Долги / Жизнь / Желания», по умолчанию 50/40/10, есть готовые пресеты',
            'Резервная копия: выгрузка и копирование данных в JSON',
            'Светлая, тёмная и системная тема; установка на телефон ярлыком на «Домой»',
          ],
          url: 'https://app-fin.risefame1.workers.dev/#dashboard',
        },
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
    contactSpec: '[RF-SPEC // 2026] — КОНТАКТЫ',
    big1: 'ХВАТИТ СЛОВ.',
    big2: 'ПОРА СТРОИТЬ.',
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
    description: 'RISEFAME // LAB — Digital Production & Creative Engineering Lab. Direct development of mobile apps, web platforms and high-end websites, no middlemen, MVP in 3 weeks.',
  },
  header: { status: 'SYSTEM ACTIVE / WORLDWIDE', tg: 'Telegram', gh: 'GitHub' },
  hero: {
    line1: 'ENGINEERING',
    line2: 'UNFAIR DIGITAL',
    line3: 'ADVANTAGE',
    serviceBadge: 'DEV: MOBILE APPS // WEB PLATFORMS // FULL-CYCLE WEBSITES',
    sub: 'Zero middlemen. Zero pitch decks. Direct engineering: you get production-grade software while agencies sell you Zoom meetings.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'View cases',
    tag: 'Digital Production & Creative Engineering Lab',
    coreEngine: {
      status: 'CORE: ACTIVE',
      fps: '60 FPS // 0ms',
      badge: 'RISEFAME // LAB',
      chips: [
        { id: '01', title: 'IOS & ANDROID APPS', tech: 'REACT NATIVE • SWIFT • NATIVE UI' },
        { id: '02', title: 'WEB PLATFORMS & SAAS', tech: 'HIGH-LOAD • REALTIME SYNC • B2B' },
        { id: '03', title: 'FULL-CYCLE WEBSITES', tech: 'BESPOKE DESIGN • FLUID MOTION' },
      ],
      specLabel: 'PRODUCTION READY // 2026',
    },
  },
  marquee: ['NO MIDDLEMEN', 'MVP IN 3 WEEKS', 'PRODUCTION GRADE', 'REALTIME', 'CLEAN CODE', 'TALK IS CHEAP'],
  work: {
    title: 'WORK',
    sub: 'Four systems running in the field.',
    specLabel: 'TECH SPECS',
    stackLabel: 'STACK',
    flip: 'DETAILS',
    back: 'BACK',
    detailsLabel: 'DETAILS',
    featuresLabel: "WHAT'S INSIDE",
    openLabel: 'OPEN PROJECT',
    cases: [
      {
        id: '01 // VN1MAN1E',
        name: 'VN1MAN1E',
        kind: 'Realtime Interaction Engine',
        desc: 'A realtime interaction engine: events reach every client instantly and state stays in sync with no reloads.',
        specs: [['LATENCY', '0 ms'], ['SYNC', 'REALTIME'], ['LAYER', 'WEB APP']],
        tags: ['React', 'Supabase', 'Realtime'],
        badge: 'CRASH-TEST: PASSED',
        details: {
          lead: 'The core for interactive web products where everything happens right now: one participant acts, everyone else sees it instantly.',
          points: [
            'Events reach every client in real time',
            'Shared state stays in sync with no page reloads',
            'React client, with the realtime layer and data on Supabase',
            'Passed a crash test before launch',
          ],
          url: 'https://vn1man1e.pages.dev/',
        },
      },
      {
        id: '02 // COFFEE OS',
        name: 'COFFEE OS',
        kind: 'Full-Cycle Pre-Order & Kitchen Display System',
        desc: 'Full-cycle pre-ordering, from the guest menu to the kitchen screen. A B2B platform with a live queue, 54-FZ fiscal compliance and real-time status for every order.',
        specs: [['MODEL', 'B2B'], ['COMPLIANCE', '54-FZ'], ['QUEUE', 'REALTIME']],
        tags: ['B2B', '54-FZ', 'Realtime Queue', 'KDS'],
        badge: 'CRASH-TEST: PASSED',
        details: {
          lead: 'A platform for coffee shops and food service: the guest pre-orders, the kitchen sees it on screen and tracks the order through to pickup.',
          points: [
            'Guest menu and pre-ordering',
            'Kitchen display (KDS) with a live order queue',
            'Real-time status for every order',
            '54-FZ fiscal compliance for B2B clients',
          ],
        },
      },
      {
        id: '03 // GEO ENGINE',
        name: 'GEO ENGINE',
        kind: 'High-Throughput Async Retail Scraper',
        desc: 'An async retail data scraper built for high throughput. Results are delivered through a Telegram engine.',
        specs: [['MODE', 'ASYNC'], ['THROUGHPUT', 'HIGH'], ['OUTPUT', 'TELEGRAM']],
        tags: ['Python', 'Telegram Engine', 'Async'],
        badge: 'CRASH-TEST: PASSED',
        details: {
          lead: 'A retail data scraper built for heavy request volume: it runs asynchronously and delivers results straight to Telegram.',
          points: [
            'Async data collection with high throughput',
            'Results delivered through a Telegram engine',
            'Python and an async architecture',
            'Passed a crash test before launch',
          ],
        },
      },
      {
        id: '04 // FINSYSTEM',
        name: 'FINSYSTEM',
        kind: 'Personal Finance Control System',
        desc: 'A personal finance system: how much money is free, where your debts stand and which payment is next. Every income splits into envelopes automatically, and the app installs on your phone.',
        specs: [['MODEL', 'PERSONAL'], ['SPLIT', '50/40/10'], ['LAYER', 'PWA']],
        tags: ['PWA', 'Cloudflare', 'JSON Backup', 'Dark / Light'],
        badge: 'CRASH-TEST: PASSED',
        details: {
          lead: 'An app that answers the one question about money: how much can I spend today. Everything important sits on a single screen.',
          points: [
            'Home screen: free money and a daily limit, next payment, debt repayment progress, 7-day spending',
            'Sections: money, debts, payments, analytics; add an operation with one button',
            'Every new income splits into Debts / Life / Wishes envelopes, 50/40/10 by default, with ready-made presets',
            'Backup: export and copy your data as JSON',
            'Light, dark and system themes; installs to the phone home screen',
          ],
          url: 'https://app-fin.risefame1.workers.dev/#dashboard',
        },
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
    contactSpec: '[RF-SPEC // 2026] — CONTACT',
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
