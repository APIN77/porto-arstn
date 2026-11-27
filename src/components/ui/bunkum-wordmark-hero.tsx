'use client'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { useLanguage } from "@/hooks/useLanguage"

// #region story
// Pure geometry and easing for stretching wordmark stems

export const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
export const approach = (cur: number, target: number, dt: number, tau: number) =>
  target + (cur - target) * Math.exp(-Math.max(0, dt) / tau)

// ---- Wordmark configurations
export const DEFAULT_WORD = ["A", "R", "S", "T", "N"] as const
export const T = 30 // stem thickness, viewBox units
export const DEFAULT_CELLS = [96, 96,  96, 92, 96] as const
export const GAP = 3
export const PAD = 0
export const STRETCH = 1.89
export const NEAR = 0.139
export const FAR = 0.462
export const TAU_LETTER = 105
export const baseFor = (H: number, scale: number) =>
  scale > 0 ? Math.max(Math.round((0.43 * H) / scale), 120) : 260
export const vbH = (base: number) => Math.ceil(base * STRETCH + 4)
export const pullAt = (d: number, W: number) =>
  W > 0 ? clamp01((FAR * W - Math.abs(d)) / ((FAR - NEAR) * W)) : 0

export const f = (n: number) => (Math.round(n * 10) / 10).toString()

/**
 * Letter glyph generator: Stems stretch with pointer proximity,
 * while bowls, crossbars and junctions remain pinned to base height.
 */
export function glyph(ch: string, ox: number, w: number, h: number, base: number) {
  h = Math.max(h, base)
  const a = ox + T / 2
  const b = ox + w - T / 2
  const top = T / 2
  const bot = h - T / 2
  const bb = base - T / 2
  const r = (b - a) / 2
  const mid = (a + b) / 2

  switch (ch) {
    case "A": {
      const cross = top + (bb - top) * 0.58
      return (
        "M" + f(a) + " " + f(h) + "V" + f(top) + "H" + f(b) + "V" + f(h) +
        "M" + f(a) + " " + f(cross) + "H" + f(b)
      )
    }
    case "R": {
      const m = top + (bb - top) * 0.48
      const ru = Math.min(r * 0.9, (m - top) / 2)
      return (
        "M" + f(a) + " 0V" + f(h) +
        "M" + f(a) + " " + f(top) + "H" + f(b - ru) + "A" + f(ru) + " " + f(ru) + " 0 0 1 " + f(b) + " " + f(top + ru) + "V" + f(m - ru) + "A" + f(ru) + " " + f(ru) + " 0 0 1 " + f(b - ru) + " " + f(m) + "H" + f(a) +
        "M" + f(a + 10) + " " + f(m) + "L" + f(b) + " " + f(h)
      )
    }
    case "I":
      return "M" + f(mid) + " 0V" + f(h)
    case "S": {
      const m = top + (bb - top) * 0.5
      const r1 = Math.min(r * 0.85, (m - top) / 2)
      const r2 = Math.min(r * 0.85, (bot - m) / 2)
      return (
        "M" + f(b) + " " + f(top) +
        "H" + f(a + r1) + "A" + f(r1) + " " + f(r1) + " 0 0 0 " + f(a) + " " + f(top + r1) +
        "V" + f(m - r1) + "A" + f(r1) + " " + f(r1) + " 0 0 0 " + f(a + r1) + " " + f(m) +
        "H" + f(b - r2) + "A" + f(r2) + " " + f(r2) + " 0 0 1 " + f(b) + " " + f(m + r2) +
        "V" + f(bot - r2) + "A" + f(r2) + " " + f(r2) + " 0 0 1 " + f(b - r2) + " " + f(bot) +
        "H" + f(a)
      )
    }
    case "T":
      return "M" + f(a) + " " + f(top) + "H" + f(b) + "M" + f(mid) + " 0V" + f(h)
    case "O":
      return (
        "M" + f(a) + " " + f(top + r) +
        "V" + f(bot - r) +
        "A" + f(r) + " " + f(r) + " 0 0 0 " + f(b) + " " + f(bot - r) +
        "V" + f(top + r) +
        "A" + f(r) + " " + f(r) + " 0 0 0 " + f(a) + " " + f(top + r)
      )
    case "B": {
      const m = top + (bb - top) * 0.44
      const bu = b - 7
      const ru = Math.min(r * 0.9, (m - top) / 2)
      const rl = Math.min(r, (bot - m) / 2)
      return (
        "M" + f(a) + " 0V" + f(h) +
        "M" + f(a) + " " + f(top) + "H" + f(bu - ru) + "A" + f(ru) + " " + f(ru) + " 0 0 1 " + f(bu) + " " + f(top + ru) + "V" + f(m - ru) + "A" + f(ru) + " " + f(ru) + " 0 0 1 " + f(bu - ru) + " " + f(m) + "H" + f(a) +
        "M" + f(a) + " " + f(m) + "H" + f(b - rl) + "A" + f(rl) + " " + f(rl) + " 0 0 1 " + f(b) + " " + f(m + rl) + "V" + f(bot - rl) + "A" + f(rl) + " " + f(rl) + " 0 0 1 " + f(b - rl) + " " + f(bot) + "H" + f(a)
      )
    }
    case "U":
      return "M" + f(a) + " 0V" + f(bot - r) + "A" + f(r) + " " + f(r) + " 0 0 0 " + f(b) + " " + f(bot - r) + "V0"
    case "N":
      return "M" + f(a) + " " + f(h) + "V" + f(top) + "L" + f(b) + " " + f(bot) + "M" + f(b) + " " + f(h) + "V0M" + f(a) + " " + f(top) + "V0"
    case "K": {
      const j = top + (bb - top) * 0.5
      const over = b + 2 + ((b - 2 - a) * T) / j
      return "M" + f(a) + " 0V" + f(h) + "M" + f(over) + " " + f(-T) + "L" + f(a + 4) + " " + f(j) + "L" + f(b + 2) + " " + f(h)
    }
    case "M": {
      const v = top + (bb - top) * 0.56
      return (
        "M" + f(a) + " " + f(h) + "V" + f(top) + "L" + f((a + b) / 2) + " " + f(v) + "L" + f(b) + " " + f(top) + "V" + f(h) +
        "M" + f(a) + " " + f(top) + "V0M" + f(b) + " " + f(top) + "V0"
      )
    }
  }
  return ""
}

export function stretchTargets(
  px: number | null,
  centres: number[],
  W: number,
  base: number,
  wordLength: number,
  out: number[]
) {
  for (let i = 0; i < wordLength; i++) {
    out[i] = px === null ? base : base * (1 + (STRETCH - 1) * pullAt((centres[i] ?? 0) - px, W))
  }
  return out
}

export const LOOK = 175
export const TAU_LOOK = 300
export const SPIN = 5
export const lookAt = (nx: number, ny: number) => ({
  rx: -LOOK * Math.max(-1, Math.min(1, ny)),
  ry: LOOK * Math.max(-1, Math.min(1, nx)),
})

export function pendulum(a: number, w: number, dtMs: number): [number, number] {
  let t = Math.min(64, Math.max(0, dtMs)) / 1000
  while (t > 0) {
    const h = Math.min(t, 1 / 120)
    w += (-11 * Math.sin(a) - 1.4 * w) * h
    a += w * h
    t -= h
  }
  return [a, w]
}
export const LET_GO = 5
export const letsGo = (pokes: number) => pokes > 0 && pokes % LET_GO === 0

// ---- Signature White & Blue Themes
export const THEMES = [
  {
    name: "Alpine Frost White",
    bg: "#F8FAFC",     // Clean Cool Ice White
    fg: "#0052FF",     // Royal Blue wordmark & pills
    deep: "#FFFFFF",   // White text inside blue pills
    isDarkBg: false,
  },
  {
    name: "Classic Bunkum",
    bg: "#1D4ED8",     // Iconic Royal Cobalt Blue
    fg: "#F8FAFC",     // Butter Yellow wordmark & pills
    deep: "#1E3A8A",   // Deep Navy text inside pills
    isDarkBg: true,
  },
  {
    name: "Midnight Navy",
    bg: "#01081fff",     // Deep Midnight Navy Blue
    fg: "#FFFFFF",     // Pure White wordmark & pills
    deep: "#0A1738",   // Dark navy text inside pills
    isDarkBg: true,
  },
  {
    name: "Electric Azure",
    bg: "#1D4ED8",     // Cobalt Azure Blue
    fg: "#FFFFFF",     // Pure White wordmark & pills
    deep: "#1E3A8A",   // Navy text inside pills
    isDarkBg: true,
  },
] as const

export const nextTheme = (i: number) => (i + 1) % THEMES.length
// #endregion

/* ------------------------------------------------------------- content */

export type BunkumWordmarkHeroLink = { label: string; href: string }
export type BunkumWordmarkHeroProps = {
  height?: string
  word?: readonly string[]
  cells?: readonly number[]
  brand?: string
  year?: string | number
  brandHref?: string
  links?: BunkumWordmarkHeroLink[]
  copy?: string
  className?: string
  style?: CSSProperties
}

const DEFAULT_LINKS: BunkumWordmarkHeroLink[] = [
  { label: "Tentang", href: "#about" },
  { label: "Keahlian", href: "#expertise" },
  { label: "Karya", href: "#projects" },
  { label: "Kontak", href: "#contact" },
]

const BOX = ["a1", "b3", "a4", "b8", "a2", "b1"]

/* ------------------------------------------------------------- styles */

const CSS = `
.bkm-root{width:100%;--blue:#0052FF;--deep:#0040D0;--butter:#FFFFFF;--ink:#070E22;position:relative;overflow:clip;color:var(--butter);font-family:var(--font-heading),BkmSans,ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;isolation:isolate}
.bkm-root *{box-sizing:border-box}
.bkm-root svg,.bkm-root img{max-width:none}
.bkm-mono{font-family:var(--font-body),ui-monospace,monospace;font-size:12px;line-height:1.35;letter-spacing:.06em;text-transform:uppercase}
.bkm-speck{background-color:var(--blue);background-image:radial-gradient(circle at 30% 40%,rgba(255,255,255,.2) 0 1.2px,transparent 1.8px),radial-gradient(circle at 70% 60%,rgba(255,255,255,.14) 0 1.6px,transparent 2.3px),radial-gradient(circle at 50% 50%,rgba(255,255,255,.09) 0 2.4px,transparent 3px);background-size:180px 180px,240px 240px,120px 120px}
.bkm-chrome{position:absolute;left:0;right:0;top:0;z-index:30;pointer-events:none;width:100%}
.bkm-nav{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:20px 24px 0;pointer-events:auto;width:100%;box-sizing:border-box}
.bkm-pill{display:inline-flex;align-items:center;justify-content:center;height:46px;border-radius:999px;background:var(--butter);color:var(--deep);text-decoration:none;font-weight:700;font-size:14px;border:none;cursor:pointer;transition:transform .18s cubic-bezier(.2,1.3,.4,1),background-color .2s,box-shadow .2s;white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,0.12)}
.bkm-pill:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.18)}
.bkm-brand{padding:0 20px;gap:8px;text-transform:uppercase;letter-spacing:-0.01em;font-size:15px;font-weight:800}
.bkm-brand small{font-size:11px;opacity:.75;font-weight:600}
.bkm-links{display:flex;align-items:center;gap:8px;flex-shrink:0}
.bkm-link{padding:0 18px;overflow:hidden;position:relative}
.bkm-lang{padding:4px;gap:2px;cursor:default}
.bkm-lang:hover{transform:none;box-shadow:0 4px 14px rgba(0,0,0,0.12)}
.bkm-lang-btn{height:38px;padding:0 12px;border-radius:999px;border:none;background:transparent;color:var(--deep);font-weight:700;font-size:12px;letter-spacing:.04em;cursor:pointer;opacity:.7;transition:background-color .2s,color .2s,opacity .2s}
.bkm-lang-btn:hover{opacity:1}
.bkm-lang-btn[data-active]{background:var(--deep);color:var(--butter);opacity:1}
.bkm-badge{width:46px;height:46px;padding:0;border-radius:50%;color:var(--deep);flex-shrink:0}
.bkm-badge svg{width:26px;height:26px;transition:transform .4s ease}
.bkm-badge:hover svg{transform:rotate(30deg)}
.bkm-roll{display:inline-flex}
.bkm-roll span{display:inline-block;transition:transform .25s cubic-bezier(.2,1.5,.4,1);transition-delay:calc(var(--i)*18ms)}
.bkm-link:hover .bkm-roll span{transform:translateY(-2px)}
.bkm-word{position:absolute;left:24px;right:24px;top:84px;bottom:100px;display:flex;align-items:center;justify-content:center;z-index:10;pointer-events:none}
.bkm-word svg{width:100%;height:100%;overflow:visible;stroke:var(--butter);fill:none;stroke-linecap:square;stroke-linejoin:miter;pointer-events:auto;filter:drop-shadow(0 6px 16px rgba(0,0,0,0.15))}
.bkm-hit{cursor:pointer;pointer-events:auto}
@keyframes bkm-boing{0%,100%{transform:scale(1)}50%{transform:scale(1.25) rotate(10deg)}}
.bkm-perch[data-boing]{animation:bkm-boing .4s cubic-bezier(.2,1.5,.4,1)}
.bkm-box{
  position:absolute;
  right:6%;
  bottom:12%;
  width:130px;
  height:130px;
  perspective:1000px;
  z-index:20;
  pointer-events:none;
}

.bkm-pose,.bkm-look,.bkm-spin,.bkm-body{
  width:100%;
  height:100%;
  transform-style:preserve-3d;
}

.bkm-body{
  position:relative;
}

.bkm-face{
  position:absolute;
  inset:0;
  width:130px;
  height:130px;
  background-size:cover;
  background-position:center;
  border-radius:8px;
  box-shadow:
    inset 0 0 0 2px rgba(255,255,255,0.4),
    0 8px 24px rgba(0,0,0,0.3);
  background-color:rgba(255,255,255,0.9);
}

.bkm-f0{
  transform:translateZ(65px);
}

.bkm-f1{
  transform:rotateY(180deg) translateZ(65px);
}

.bkm-f2{
  transform:rotateY(90deg) translateZ(65px);
}

.bkm-f3{
  transform:rotateY(-90deg) translateZ(65px);
}

.bkm-f4{
  transform:rotateX(90deg) translateZ(65px);
}

.bkm-f5{
  transform:rotateX(-90deg) translateZ(65px);
}
.bkm-sigfix{
  position:absolute;
  left:28px;
  bottom:26px;
  z-index:15;
  color:var(--butter);
  font-family:cursive;
  font-size:38px;
  font-weight:500;
  pointer-events:none;
  opacity:.9;
  transform:rotate(-8deg);
}
.bkm-copy{position:absolute;right:28px;bottom:26px;max-width:390px;z-index:15;font-size:13px;line-height:1.5;font-weight:500;color:var(--butter);text-align:right;pointer-events:auto;opacity:.95}
.bkm-toast{position:fixed;left:50%;bottom:28px;z-index:80;transform:translate(-50%,calc(100% + 48px));padding:12px 22px;border-radius:999px;background:var(--butter);color:var(--deep);font-weight:700;font-size:13px;transition:transform .4s cubic-bezier(.2,1.5,.4,1);pointer-events:none;white-space:nowrap;box-shadow:0 10px 32px rgba(0,0,0,0.3)}
.bkm-toast[data-on]{transform:translate(-50%,0)}
.bkm-cursor{display:none;position:fixed;left:0;top:0;z-index:90;pointer-events:none}
.bkm-clab{position:absolute;left:16px;top:16px;padding:6px 14px;border-radius:999px;background:var(--butter);color:var(--deep);white-space:nowrap;opacity:0;transform:scale(.5);transform-origin:0 0;transition:transform .3s cubic-bezier(.2,1.5,.4,1),opacity .15s;font-weight:700;box-shadow:0 4px 16px rgba(0,0,0,0.2)}
.bkm-cursor[data-label] .bkm-clab{opacity:1;transform:none}
@media (hover:hover) and (pointer:fine){.bkm-cursor{display:block}}
.bkm-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media (max-width:768px){.bkm-box{display:none}.bkm-copy{display:none}}
@media (max-width:640px){.bkm-nav{gap:6px;padding:14px 16px 0;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}.bkm-nav::-webkit-scrollbar{display:none}.bkm-pill{height:38px;padding:0 12px;font-size:13px}.bkm-brand{padding:0 14px;flex-shrink:0}.bkm-brand small{display:none}.bkm-links{gap:6px}.bkm-lang{padding:3px}.bkm-lang-btn{height:32px;padding:0 9px;font-size:11px}.bkm-badge{width:38px;height:38px}.bkm-badge svg{width:22px;height:22px}.bkm-word{left:10px;right:10px;top:70px}}
@media (prefers-reduced-motion:reduce){.bkm-root *{animation:none!important;transition-duration:.01ms!important;transition-delay:0s!important}}
`

/* ------------------------------------------------------------- helpers */

const roll = (text: string) => (
  <span className="bkm-roll" aria-hidden="true" style={{ "--n": text.length } as CSSProperties}>
    {text.split("").map((ch, i) => (
      <span key={i} style={{ "--i": i } as CSSProperties}>
        {ch === " " ? "\u00A0" : ch}
      </span>
    ))}
  </span>
)

const SIG =
  "M14 62c6-22 10-44 8-50-3 10-4 40 0 52 8-14 24-20 26-8 2 13-18 16-22 6M58 40c-2 10 0 22 8 20 7-2 8-14 8-20 0 8 2 18 8 18M92 58c0-8 0-16 2-18 4 10 10 18 14 16 2-6 0-14 0-18M124 20c-2 16-2 30 0 42M140 36c-8 4-14 10-14 12 8 0 14 6 18 14M156 40c-2 10 0 22 8 20 7-2 8-14 8-20 0 8 2 18 8 18M190 58c0-6 0-14 2-18 3 6 4 12 6 12 2-6 4-12 7-12 3 4 3 12 3 18M20 78c50-6 120-10 190-6"

const bg = (k: string) => ({ backgroundImage: "var(--bk-" + k + ")" }) as CSSProperties

type El = HTMLElement | SVGElement

export default function BunkumWordmarkHero({
  height = "100svh",
  word = DEFAULT_WORD,
  cells = DEFAULT_CELLS,
  brand = "ARSTN",
  year = "2026",
  brandHref = "#home",
  links = DEFAULT_LINKS,
  copy = "Informatics Engineering graduate from Universitas Stikubank Semarang. Exploring Artificial Intelligence, Web Architecture, and purposeful digital solutions.",
  className,
  style,
}: BunkumWordmarkHeroProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const labelRef = useRef<HTMLSpanElement | null>(null)
  const els = useRef<Record<string, El | null>>({})
  const reg = (k: string) => (el: El | null) => {
    els.current[k] = el
  }
  const clipId = "bkm-clip-" + useId().replace(/[^a-zA-Z0-9]/g, "")
  const [base, setBase] = useState(260)
  const [theme, setTheme] = useState(0)
  const [toast, setToast] = useState({ text: "", on: false })
  const toastTimer = useRef<number>(0)
  const { lang, setLang } = useLanguage()

  const activeWord = word
  const activeCells = cells
  const vbW = PAD * 2 + activeCells.reduce((a, b) => a + b, 0) + GAP * (activeCells.length - 1)
  const getCellX = (i: number) => PAD + activeCells.slice(0, i).reduce((a, b) => a + b, 0) + GAP * i
  const getCellMid = (i: number) => getCellX(i) + (activeCells[i] ?? 96) / 2

  const s = useRef({
    W: 0,
    H: 0,
    base: 260,
    wordX: 0,
    wordW: 1,
    centres: activeWord.map(() => 0),
    hs: activeWord.map(() => 260),
    tg: activeWord.map(() => 260),
    fine: false,
    still: false,
    top: 0,
    left: 0,
    last: 0,
    px: -1,
    py: -1,
    over: false,
    touching: false,
    label: "",
    rx: 0,
    ry: 0,
    spin: 0,
    ga: 0.12,
    gw: 0,
    pokes: 0,
    fall: 0,
    fy: 0,
    fvy: 0,
    fr: 0,
    hy: 0,
    magnet: null as HTMLElement | null,
    magnetBox: null as DOMRect | null,
    visible: true,
    raf: 0,
    cache: new WeakMap() as WeakMap<object, Record<string, string>>,
  })

  const put = (el: El | null | undefined, prop: string, val: string) => {
    if (!el) return
    const c = s.current.cache
    let m = c.get(el)
    if (!m) c.set(el, (m = {}))
    if (m[prop] === val) return
    m[prop] = val
    if (prop === "d" || prop === "transform@" || prop === "stroke-width") {
      el.setAttribute(prop === "transform@" ? "transform" : prop, val)
    } else if (prop.charCodeAt(0) === 45) {
      el.style.setProperty(prop, val)
    } else {
      ;(el.style as unknown as Record<string, string>)[prop] = val
    }
  }

  const flag = (el: El | null | undefined, name: string, on: boolean) => {
    if (!el) return
    if (on !== el.hasAttribute(name)) {
      on ? el.setAttribute(name, "") : el.removeAttribute(name)
    }
  }

  const say = (text: string) => {
    setToast({ text, on: true })
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast((t) => ({ ...t, on: false })), 2800)
  }

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)")
    const fp = window.matchMedia("(hover: hover) and (pointer: fine)")
    const sync = () => {
      s.current.still = rm.matches
      s.current.fine = fp.matches
      schedule()
    }
    sync()
    rm.addEventListener("change", sync)
    fp.addEventListener("change", sync)
    return () => {
      rm.removeEventListener("change", sync)
      fp.removeEventListener("change", sync)
      window.clearTimeout(toastTimer.current)
    }
  }, [schedule])

  const frame = (now: number) => {
    const st = s.current
    st.raf = 0
    const root = rootRef.current
    if (!root || !st.H) return
    const dt = st.last ? Math.min(64, now - st.last) : 16
    st.last = now
    const rect = root.getBoundingClientRect()
    st.left = rect.left
    st.top = rect.top
    const H = st.H
    const W = st.W
    const e = els.current
    let busy = false

    const heroUp = st.top > -H * 0.98
    const pointing = (st.over && st.fine) || st.touching
    const px = !st.still && heroUp && pointing ? st.px - st.left : null
    stretchTargets(px, st.centres, W, st.base, activeWord.length, st.tg)

    for (let i = 0; i < activeWord.length; i++) {
      st.hs[i] = st.still ? st.tg[i] : approach(st.hs[i], st.tg[i], dt, TAU_LETTER)
      if (Math.abs(st.hs[i] - st.tg[i]) > 0.3) busy = true
      put(e["l" + i], "d", glyph(activeWord[i], getCellX(i), activeCells[i] ?? 96, st.hs[i], st.base))
    }

    const geraldIndex = Math.min(2, activeWord.length - 1)
    const kb = st.hs[geraldIndex] - 2
    if (st.fall > 0) {
      st.fall += dt
      st.fvy += 0.0026 * dt
      st.fy += st.fvy * dt
      st.fr += dt * 0.35
      if (st.fall > 2300) {
        st.fall = 0
        st.fy = 0
        st.fvy = 0
        st.fr = 0
        st.hy = -(st.base * 2.4)
        st.ga = 0.4
        st.gw = 0
      }
      busy = true
    } else if (!st.still) {
      st.hy = approach(st.hy, 0, dt, 140)
      const q = pendulum(st.ga, st.gw, dt)
      st.ga = q[0]
      st.gw = q[1]
      if (Math.abs(st.gw) > 0.01 || Math.abs(st.hy) > 0.5) busy = true
    }
    put(
      e.gerald,
      "transform@",
      "translate(" + f(getCellMid(geraldIndex)) + " " + f(kb + st.hy + st.fy) + ") rotate(" + f((st.ga * 180) / Math.PI + st.fr) + ")"
    )

    if (!st.still) {
      const look = pointing && heroUp ? lookAt((st.px - st.left - W / 2) / (W / 2), (st.py - st.top - H / 2) / (H / 2)) : { rx: 0, ry: 0 }
      st.rx = approach(st.rx, look.rx, dt, TAU_LOOK)
      st.ry = approach(st.ry, look.ry, dt, TAU_LOOK)
      st.spin = (st.spin + (SPIN * dt) / 1000) % 360
    }
    put(e.look, "transform", "rotateX(" + f(st.rx) + "deg) rotateY(" + f(st.ry) + "deg)")
    put(e.spin, "transform", "rotateY(" + f(st.spin) + "deg)")
    busy = busy || !st.still

    if (st.fine && st.over) {
      put(cursorRef.current, "transform", "translate3d(" + f(st.px) + "px," + f(st.py) + "px,0)")
    }

    if (busy && st.visible) schedule()
  }

  const schedule = useCallback(() => {
    const st = s.current
    if (!st.raf && typeof window !== "undefined") {
      st.raf = window.requestAnimationFrame(frame)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const measure = () => {
      const st = s.current
      st.W = root.offsetWidth
      st.H = root.offsetHeight
      const w = els.current.word as HTMLElement | null
      if (w) {
        st.wordX = w.offsetLeft
        st.wordW = w.offsetWidth
      }
      const scale = st.wordW / vbW
      st.centres = activeWord.map((_, i) => st.wordX + getCellMid(i) * scale)
      const b = baseFor(st.H, scale)
      if (b !== st.base) {
        st.base = b
        st.hs = activeWord.map(() => b)
        st.tg = activeWord.map(() => b)
        setBase(b)
      }
      schedule()
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    const onScroll = () => schedule()
    window.addEventListener("scroll", onScroll, { passive: true })
    const io = new IntersectionObserver((list) => {
      s.current.visible = list.some((x) => x.isIntersecting)
      if (s.current.visible) schedule()
    })
    io.observe(root)
    return () => {
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
      const raf = s.current.raf
      if (raf) window.cancelAnimationFrame(raf)
      s.current.raf = 0
    }
  }, [activeWord, activeCells, vbW, getCellMid, schedule])

  const releaseMagnet = () => {
    const st = s.current
    const m = st.magnet
    if (m) {
      m.style.transform = ""
      m.removeAttribute("data-near")
    }
    st.magnet = null
    st.magnetBox = null
  }

  const onMove = (ev: ReactPointerEvent<HTMLDivElement>) => {
    const st = s.current
    if (ev.pointerType !== "mouse") {
      if (st.touching) {
        st.px = ev.clientX
        st.py = ev.clientY
        schedule()
      }
      return
    }
    st.px = ev.clientX
    st.py = ev.clientY
    st.over = true
    const t = ev.target as Element
    const hit = t.closest ? (t.closest("[data-cursor]") as HTMLElement | null) : null
    const label = hit ? hit.getAttribute("data-cursor") || "" : ""
    if (label !== st.label) {
      st.label = label
      if (labelRef.current) labelRef.current.textContent = label
      flag(cursorRef.current, "data-label", !!label)
    }
    const mag = st.fine && !st.still && t.closest ? (t.closest("[data-magnet]") as HTMLElement | null) : null
    if (mag !== st.magnet) {
      releaseMagnet()
      if (mag) {
        st.magnet = mag
        st.magnetBox = mag.getBoundingClientRect()
        mag.setAttribute("data-near", "")
      }
    }
    if (st.magnet && st.magnetBox) {
      const bx = st.magnetBox
      const dx = ev.clientX - (bx.left + bx.width / 2)
      const dy = ev.clientY - (bx.top + bx.height / 2)
      st.magnet.style.transform = "translate(" + (dx * 0.22).toFixed(1) + "px," + (dy * 0.32).toFixed(1) + "px)"
    }
    schedule()
  }

  const onLeave = (ev: ReactPointerEvent<HTMLDivElement>) => {
    const st = s.current
    if (ev.pointerType === "mouse") st.over = false
    flag(cursorRef.current, "data-label", false)
    st.label = ""
    releaseMagnet()
    schedule()
  }

  const onDown = (ev: ReactPointerEvent<HTMLDivElement>) => {
    const st = s.current
    if (ev.pointerType !== "mouse") {
      st.touching = true
      st.px = ev.clientX
      st.py = ev.clientY
      schedule()
    }
  }

  const onUp = (ev: ReactPointerEvent<HTMLDivElement>) => {
    if (ev.pointerType !== "mouse") {
      s.current.touching = false
      schedule()
    }
  }

  const poke = () => {
    const st = s.current
    if (st.fall > 0) return
    st.pokes += 1
    if (letsGo(st.pokes) && !st.still) {
      st.fall = 1
      st.fvy = -0.55
      say("Gerald lepas pegangan! Tapi tenang, dia membal.")
    } else {
      st.gw += (st.pokes % 2 ? 1 : -1) * (2.2 + Math.random())
      if (st.pokes === 3) say("Hati-hati, Gerald mudah pusing!")
    }
    schedule()
  }

  const pokeKey = (ev: ReactKeyboardEvent) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault()
      poke()
    }
  }

  const boing = (ev: { currentTarget: Element }) => {
    const el = ev.currentTarget
    el.removeAttribute("data-boing")
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => el.setAttribute("data-boing", ""))
    )
  }

  const rotate = () => {
    const n = nextTheme(theme)
    setTheme(n)
    say("Tema: " + THEMES[n].name)
  }

  const vbh = vbH(base)
  const th = THEMES[theme]
  const vars = { "--blue": th.bg, "--butter": th.fg, "--deep": th.deep } as Record<string, string>
  for (const k of Object.keys(IMG)) vars["--bk-" + k] = "url(" + IMG[k] + ")"
  const rootStyle = { ...vars, ...style, height } as CSSProperties

  return (
    <div
      ref={rootRef}
      className={"bkm-root bkm-speck" + (className ? " " + className : "")}
      style={rootStyle}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <style>{CSS}</style>

      <div className="bkm-chrome">
        <nav className="bkm-nav" aria-label="Main">
          <a
            href={brandHref}
            className="bkm-pill bkm-brand"
            data-magnet=""
            data-cursor="Alfian Ariston Noor"
          >
            <span>{brand}</span>
            <small>©{year}</small>
          </a>
          <div className="bkm-links">
            {links.map((l) => (
              <a key={l.label + l.href} href={l.href} className="bkm-pill bkm-link" data-magnet="">
                {roll(l.label)}
                <span className="bkm-sr">{l.label}</span>
              </a>
            ))}
            <div
              className="bkm-pill bkm-lang"
              role="group"
              aria-label={lang === "id" ? "Pilih Bahasa" : "Select Language"}
              data-cursor={lang === "id" ? "Bahasa: Indonesia" : "Language: English"}
            >
              <button
                type="button"
                className="bkm-lang-btn"
                data-active={lang === "en" ? "" : undefined}
                onClick={() => setLang("en")}
                aria-label="English"
                aria-pressed={lang === "en"}
              >
                EN
              </button>
              <button
                type="button"
                className="bkm-lang-btn"
                data-active={lang === "id" ? "" : undefined}
                onClick={() => setLang("id")}
                aria-label="Bahasa Indonesia"
                aria-pressed={lang === "id"}
              >
                ID
              </button>
            </div>
            <button
              type="button"
              className="bkm-pill bkm-badge"
              data-cursor={"Tema: " + th.name}
              aria-label={"Ubah warna tema (sekarang: " + th.name + ")"}
              onClick={rotate}
            >
              <svg viewBox="0 0 30 30" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5].map((k) => (
                  <ellipse
                    key={k}
                    cx="15"
                    cy="8.6"
                    rx="3.6"
                    ry="6"
                    fill="currentColor"
                    transform={"rotate(" + k * 60 + " 15 15)"}
                    opacity={k % 2 ? 0.55 : 1}
                  />
                ))}
                <circle cx="15" cy="15" r="3.4" fill="var(--butter)" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <section aria-label={brand + " — Portofolio Alfian Ariston Noor"}>
        <div ref={reg("word")} className="bkm-word">
          <h1 className="bkm-sr">{brand}</h1>
          <svg viewBox={"0 0 " + vbW + " " + vbh} aria-hidden="true">
            <clipPath id={clipId}>
              <rect x={-20} y={0} width={vbW + 40} height={vbh + 400} />
            </clipPath>
            <g clipPath={"url(#" + clipId + ")"}>
              {activeWord.map((ch, i) => (
                <path
                  key={i}
                  ref={reg("l" + i)}
                  d={glyph(ch, getCellX(i), activeCells[i] ?? 96, base, base)}
                  strokeWidth={T}
                />
              ))}
            </g>

            {/* Sticker: Boopable Mascot on Letter O */}
            {activeWord.length > 4 && (
              <g transform={"translate(" + (getCellMid(4) - 25) + " " + 14 + ")"}>
                <g className="bkm-perch bkm-hit" data-cursor="Boop!" onClick={boing}>
                  <image href={IMG.s0} width={50} height={54} preserveAspectRatio="xMidYMid meet" />
                </g>
              </g>
            )}

            {/* Sticker: Mascot on Letter R */}
            {activeWord.length > 1 && (
              <image
                href={IMG.s2}
                x={getCellMid(1) - 22}
                y={base * 0.55 - 24}
                width={44}
                height={67}
                preserveAspectRatio="xMidYMid meet"
                transform={"rotate(-8 " + getCellMid(1) + " " + base * 0.6 + ")"}
              />
            )}

            {/* Sticker: Gerald swinging on stem */}
            <g
              ref={reg("gerald")}
              transform={"translate(" + getCellMid(Math.min(2, activeWord.length - 1)) + " " + (base - 2) + ")"}
            >
              <g
                className="bkm-hit"
                role="button"
                tabIndex={0}
                aria-label="Poke Gerald"
                data-cursor="Colek Gerald"
                onClick={poke}
                onKeyDown={pokeKey}
              >
                <image href={IMG.s1} x={-40} y={-9} width={80} height={100} preserveAspectRatio="xMidYMid meet" />
              </g>
            </g>
          </svg>
        </div>

        {/* 3D Illustrated Carton Box that turns to look at cursor */}
        <div className="bkm-box" aria-hidden="true">
          <div className="bkm-pose">
            <div ref={reg("look")} className="bkm-look">
              <div ref={reg("spin")} className="bkm-spin">
                <div className="bkm-body">
                  {BOX.map((k, i) => (
                    <div
                      key={k}
                      className={"bkm-face bkm-f" + i}
                      style={bg(k)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Signature & description */}
        <div className="bkm-sigfix">
          xxxx
        </div>
        <p className="bkm-copy">{copy}</p>
      </section>

      {/* Floating Toast Notification */}
      <div className="bkm-toast" data-on={toast.on ? "" : undefined} role="status" aria-live="polite">
        {toast.text}
      </div>

      {/* Dynamic Cursor Context Badge */}
      <div ref={cursorRef} className="bkm-cursor" aria-hidden="true">
        <span ref={labelRef} className="bkm-clab bkm-mono" />
      </div>
    </div>
  )
}

const IMG_BASE = "https://kedhar-components.pages.dev/bunkum/"
const IMG: Record<string, string> = {
  a1: IMG_BASE + "a1.webp",
  b3: IMG_BASE + "b3.webp",
  a4: IMG_BASE + "a4.webp",
  b8: IMG_BASE + "b8.webp",
  a2: IMG_BASE + "a2.webp",
  b1: IMG_BASE + "b1.webp",
  s0: IMG_BASE + "s0.webp",
  s1: IMG_BASE + "s1.webp",
  s2: IMG_BASE + "s2.webp",
}
