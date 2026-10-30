import type { ReactNode } from 'react'

/** deterministic pseudo-barcode */
export function Barcode({ seed = 7, className = '' }: { seed?: number; className?: string }) {
  const bars: number[] = []
  let s = seed * 9301 + 49297
  for (let i = 0; i < 38; i++) {
    s = (s * 9301 + 49297) % 233280
    bars.push(1 + Math.floor((s / 233280) * 4))
  }
  let x = 0
  return (
    <svg className={className} viewBox="0 0 160 40" preserveAspectRatio="none" aria-hidden="true">
      {bars.map((w, i) => {
        const rect = i % 2 === 0 ? <rect key={i} x={x} y={0} width={w} height={40} fill="currentColor" /> : null
        x += w
        return rect
      })}
    </svg>
  )
}

export function Spec({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`tape ${className}`}>{children}</span>
}

/** crash-test tag: dashed corners + target mark */
export function CrashBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border-2 border-dashed border-volt px-2 py-1 text-volt tape">
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0 0h7v7H0zM7 7h7v7H7z" fill="currentColor" />
      </svg>
      {children}
    </span>
  )
}

export function Grain() {
  return (
    <>
      <div className="grain animate-grain" aria-hidden="true" />
      <div className="scan" aria-hidden="true" />
    </>
  )
}
