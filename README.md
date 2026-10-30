# RISEFAME // LAB

Digital Production & Creative Engineering Lab. React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide React.

## Запуск

```bash
npm install
npm run dev      # разработка
npm run build    # tsc -b && vite build -> dist/
npm run preview
```

## Структура

- `src/i18n.tsx` — словари RU / EN, провайдер языка (мгновенное переключение, обновляет title / description / html lang)
- `src/config.ts` — ссылки (Telegram, GitHub) и email для копирования. **Замени `email` на реальный адрес.**
- `src/components/` — Header, Hero, Marquee, Work, Manifesto, Footer, ui (штрихкод, crash-test бейдж, грейн)
- `src/index.css` — зерно (SVG feTurbulence), hazard-полосы, chrome-градиенты, кнопки с инверсией

Язык запоминается в localStorage (по умолчанию определяется по языку браузера).
