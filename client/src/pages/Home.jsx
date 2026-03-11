import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ThemeToggle from '../components/ThemeToggle'

// ─── Project data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    slug: 'unimetadocs',
    name: 'UnimetaDocs',
    tagline: 'Gestión administrativa universitaria centralizada',
    descriptionShort: 'Plataforma que centraliza la información administrativa de instituciones universitarias con análisis de datos y reportes automáticos.',
    descriptionFull: [
      'UnimetaDocs es una plataforma web que centraliza y digitaliza la gestión de información administrativa de instituciones universitarias. Permite organizar, analizar y consultar datos académicos e institucionales desde un único panel de control.',
      'El sistema incorpora herramientas de análisis de datos con visualizaciones, generación automática de informes y reportes en PDF, y un control de acceso granular por roles y dependencias institucionales.',
    ],
    features: [
      'Centralización de información académica y administrativa',
      'Herramientas de análisis y visualización de datos institucionales',
      'Generación automática de informes y reportes en PDF',
      'Control de acceso por roles y dependencias',
      'Panel de administración unificado',
      'Historial de actividad y trazabilidad de cambios',
    ],
    tech: ['NestJS', 'Next.js', 'PostgreSQL', 'TypeScript', 'Prisma ORM'],
    nodeColor: '#F59E0B',
    overlay: 'linear-gradient(150deg,rgba(120,53,15,0.88) 0%,rgba(127,29,29,0.78) 55%,rgba(2,6,23,0.97) 100%)',
    badgeBg: 'rgba(245,158,11,0.18)',
    badgeText: '#FCD34D',
    badgeBorder: 'rgba(245,158,11,0.35)',
    btnBg: '#D97706',
    status: 'En desarrollo',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=70',
  },
  {
    slug: 'quapi',
    name: 'Quapi',
    tagline: 'Aseguramiento de calidad para software y aplicaciones web',
    descriptionShort: 'Plataforma QA para gestionar, automatizar y mejorar el aseguramiento de calidad de aplicaciones con reportes en tiempo real.',
    descriptionFull: [
      'Quapi es una plataforma QA diseñada para que usuarios, equipos y empresas gestionen y automaticen el aseguramiento de calidad de sus aplicaciones y software web desde un solo lugar.',
      'Ofrece gestión de casos de prueba, reportes de cobertura en tiempo real, dashboards de analytics para equipos QA, e integración con los flujos de desarrollo existentes.',
    ],
    features: [
      'Gestión centralizada de casos de prueba',
      'Reportes de cobertura y calidad en tiempo real',
      'Dashboards de analytics para equipos QA',
      'Integración con flujos de desarrollo existentes',
      'Seguimiento de bugs y regresiones',
      'Notificaciones automatizadas por etapa de prueba',
    ],
    tech: ['Node.js', 'React', 'MongoDB', 'Jest', 'Docker'],
    nodeColor: '#38BDF8',
    overlay: 'linear-gradient(150deg,rgba(12,74,110,0.88) 0%,rgba(6,78,59,0.78) 55%,rgba(2,6,23,0.97) 100%)',
    badgeBg: 'rgba(56,189,248,0.18)',
    badgeText: '#7DD3FC',
    badgeBorder: 'rgba(56,189,248,0.35)',
    btnBg: '#0284C7',
    status: 'En desarrollo',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&auto=format&fit=crop&q=70',
  },
]

// ─── Circular nav arrow button ────────────────────────────────────────────────
function NavBtn({ direction, onClick, label, colorClass }) {
  const cls = colorClass || 'bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500 text-white'
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 rounded-full ${cls} flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95`}
      aria-label={label}
    >
      {direction === 'down'
        ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
        : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7"/></svg>
      }
    </button>
  )
}

// ─── Mini slider for hero card ────────────────────────────────────────────────
function MiniSlider({ goToSection }) {
  const [current, setCurrent] = useState(0)
  const proj = PROJECTS[current]

  const goTo = (idx) => setCurrent((idx + PROJECTS.length) % PROJECTS.length)

  return (
    <div className="relative h-full rounded-3xl overflow-hidden bg-slate-950 shadow-lg flex flex-col">
      <div
        className="absolute inset-0 flex"
        style={{
          width: `${PROJECTS.length * 100}%`,
          transform: `translateX(-${current * (100 / PROJECTS.length)}%)`,
          transition: 'transform 520ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {PROJECTS.map((p) => (
          <div
            key={p.slug}
            className="relative h-full flex-shrink-0 flex flex-col"
            style={{ width: `${100 / PROJECTS.length}%` }}
          >
            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: p.overlay }} />
            <div className="absolute inset-0 flex flex-col justify-end p-7 pb-16">
              <div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border mb-3"
                  style={{ background: p.badgeBg, color: p.badgeText, borderColor: p.badgeBorder }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.nodeColor }} />
                  {p.status}
                </span>
                <h3 className="text-2xl font-bold text-white mb-1">{p.name}</h3>
                <p className="text-white/55 text-xs leading-relaxed mb-4 max-w-xs">{p.descriptionShort}</p>
                <Link
                  to={`/projects/${p.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg transition-all active:scale-95"
                  style={{ background: p.btnBg }}
                >
                  Conocer más
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Prev / Next arrows */}
      <div className="absolute bottom-5 right-5 z-20 flex gap-2">
        <button
          onClick={() => goTo(current - 1)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow"
          style={{ background: proj.nodeColor }}
          aria-label="Anterior"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button
          onClick={() => goTo(current + 1)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow"
          style={{ background: proj.nodeColor }}
          aria-label="Siguiente"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
      {/* Ver proyectos bottom-left */}
      <div className="absolute bottom-5 left-7 z-20">
        <button
          onClick={() => goToSection(2)}
          className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-semibold transition-colors"
        >
          Ver proyectos
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  )
}

// ─── Seeded RNG ─────────────────────────────────────────────────────────────
function seededRng(seed) {
  let s = seed | 0
  return () => {
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b) | 0
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b) | 0
    s ^= s >>> 16
    return ((s >>> 0) & 0x7fffffff) / 0x7fffffff
  }
}

// ─── Neural network SVG background ──────────────────────────────────────────
function NeuralBackground({ seed = 0 }) {
  const { nodes, edges } = useMemo(() => {
    const rng = seededRng(seed * 99991 + 12347)
    const nodes = Array.from({ length: 34 }, () => ({ x: rng() * 100, y: rng() * 100 }))
    const edges = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 28) edges.push({ x1: nodes[i].x, y1: nodes[i].y, x2: nodes[j].x, y2: nodes[j].y, a: (1 - d / 28) * 0.38 })
      }
    }
    return { nodes, edges }
  }, [seed])

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      {edges.map((e, i) => (
        <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke="#94a3b8" strokeWidth="0.2" strokeOpacity={e.a} className="dark:[stroke:#334155]" />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="0.45" fill="#94a3b8" fillOpacity="0.38" className="dark:[fill:#334155]" />
      ))}
    </svg>
  )
}

// ─── Full slider for projects section ────────────────────────────────────────
const TABS = [
  { id: 'desc',     label: 'Descripción' },
  { id: 'features', label: 'Características' },
  { id: 'tech',     label: 'Tecnologías usadas' },
]

function FullSlider() {
  const [current, setCurrent] = useState(0)
  const [tab, setTab]         = useState('desc')
  const proj = PROJECTS[current]

  const goTo = (idx) => {
    setCurrent((idx + PROJECTS.length) % PROJECTS.length)
    setTab('desc')
  }

  return (
    <div className="relative rounded-3xl overflow-hidden bg-slate-950 shadow-lg h-[560px] sm:h-[620px] lg:h-full">
      {/* Slide track — background images */}
      <div
        className="absolute inset-0 flex"
        style={{
          width: `${PROJECTS.length * 100}%`,
          transform: `translateX(-${current * (100 / PROJECTS.length)}%)`,
          transition: 'transform 520ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {PROJECTS.map((p) => (
          <div
            key={p.slug}
            className="relative flex-shrink-0"
            style={{ width: `${100 / PROJECTS.length}%`, height: '100%' }}
          >
            <img src={p.image} alt={p.name} className="w-full h-full object-cover absolute inset-0" />
            <div className="absolute inset-0" style={{ background: p.overlay }} />
          </div>
        ))}
      </div>

      {/* Foreground content (always on top of current slide) */}
      <div className="relative z-10 h-full flex flex-col p-5 sm:p-6">
        {/* Header */}
        <div className="mb-4">
          <span className="text-xs font-bold tracking-widest uppercase text-white/50 mb-2 block">Proyectos</span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border mb-3"
            style={{ background: proj.badgeBg, color: proj.badgeText, borderColor: proj.badgeBorder }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: proj.nodeColor }} />
            {proj.status}
          </span>
          <h3 className="text-3xl font-bold text-white mb-1">{proj.name}</h3>
          <p className="text-white/50 text-sm">{proj.tagline}</p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 mb-4 bg-white/10 rounded-xl p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200
                ${tab === t.id
                  ? 'bg-white text-slate-900 shadow'
                  : 'text-white/55 hover:text-white'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-1">
          {tab === 'desc' && (
            <div>
              {proj.descriptionFull.map((d, i) => (
                <p key={i} className="text-white/70 text-sm leading-relaxed mb-3">{d}</p>
              ))}
            </div>
          )}
          {tab === 'features' && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {proj.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-white/65 text-sm">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: proj.nodeColor }} />
                  {f}
                </li>
              ))}
            </ul>
          )}
          {tab === 'tech' && (
            <div className="flex flex-wrap gap-2">
              {proj.tech.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white/70 border border-white/10">{t}</span>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons + arrows in same row */}
        <div className="flex items-center justify-between gap-3 mt-4 flex-shrink-0">
          <div className="flex gap-2 min-w-0">
            <Link
              to={`/projects/${proj.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-white shadow-lg transition-all active:scale-95 whitespace-nowrap"
              style={{ background: proj.btnBg }}
            >
              Conocer más
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </Link>
            <button
              disabled
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium bg-white/[0.07] text-white/30 border border-white/10 cursor-not-allowed whitespace-nowrap"
            >
              Ver demo
              <span className="text-[9px] text-white/20 hidden sm:inline">Próximamente</span>
            </button>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => goTo(current - 1)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg"
              style={{ background: proj.nodeColor }}
              aria-label="Anterior"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={() => goTo(current + 1)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg"
              style={{ background: proj.nodeColor }}
              aria-label="Siguiente"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const TOTAL = 4

export default function Home() {
  const [section, setSection] = useState(0)
  const [coverOpen, setCoverOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 1023px)').matches)
  const busy = useRef(false)
  const containerRef = useRef(null)
  const sectionRefs = useRef([null, null, null, null])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const goToSection = useCallback((idx) => {
    const target = Math.max(0, Math.min(TOTAL - 1, idx))
    if (target === section || busy.current) return
    busy.current = true
    if (sectionRefs.current[target]) sectionRefs.current[target].scrollTop = 0
    setSection(target)
    setTimeout(() => { busy.current = false }, 800)
  }, [section])

  // Mousewheel interception — desktop only
  useEffect(() => {
    if (isMobile) return
    const onWheel = (e) => {
      e.preventDefault()
      if (e.deltaY > 0) goToSection(section + 1)
      else goToSection(section - 1)
    }
    const el = containerRef.current
    if (el) el.addEventListener('wheel', onWheel, { passive: false })
    return () => { if (el) el.removeEventListener('wheel', onWheel) }
  }, [section, goToSection, isMobile])

  // Keyboard — desktop only
  useEffect(() => {
    if (isMobile) return
    const onKey = (e) => {
      if (e.key === 'ArrowDown') goToSection(section + 1)
      if (e.key === 'ArrowUp') goToSection(section - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [section, goToSection, isMobile])

  // Touch swipe — desktop only (mobile uses native scroll)
  useEffect(() => {
    if (isMobile) return
    let startY = 0
    let scrollEl = null
    const onTouchStart = (e) => {
      startY = e.touches[0].clientY
      let el = e.target
      while (el && el !== containerRef.current) {
        if (el.scrollHeight > el.clientHeight + 4) { scrollEl = el; break }
        el = el.parentElement
      }
      if (!el || el === containerRef.current) scrollEl = null
    }
    const onTouchEnd = (e) => {
      const delta = startY - e.changedTouches[0].clientY
      if (Math.abs(delta) < 55) { scrollEl = null; return }
      if (scrollEl) {
        const { scrollTop, scrollHeight, clientHeight } = scrollEl
        if (delta > 0 && scrollTop < scrollHeight - clientHeight - 4) { scrollEl = null; return }
        if (delta < 0 && scrollTop > 4) { scrollEl = null; return }
      }
      if (delta > 0) goToSection(section + 1)
      else goToSection(section - 1)
      scrollEl = null
    }
    const el = containerRef.current
    if (el) {
      el.addEventListener('touchstart', onTouchStart, { passive: true })
      el.addEventListener('touchend', onTouchEnd, { passive: true })
    }
    return () => {
      if (el) {
        el.removeEventListener('touchstart', onTouchStart)
        el.removeEventListener('touchend', onTouchEnd)
      }
    }
  }, [section, goToSection, isMobile])

  return (
    <div ref={containerRef} className="h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      <Navbar currentSection={section} goToSection={goToSection} />
      <ThemeToggle />

      {/* Vertical slide strip */}
      <div
        style={{
          height: `${TOTAL * 100}vh`,
          transform: `translateY(-${section * 100}vh)`,
          transition: 'transform 700ms cubic-bezier(0.77,0,0.18,1)',
          willChange: 'transform',
        }}
      >

        {/* ═══════════════════════════════════
            SECTION 0 — Hero
        ═══════════════════════════════════ */}
        <section ref={el => { sectionRefs.current[0] = el }} className="relative isolate h-screen overflow-y-auto flex flex-col">
          <NeuralBackground seed={0} />
          <div className="relative z-10 flex flex-col flex-1 pt-16 px-6 pb-6 max-w-6xl mx-auto w-full">
          <p className="text-center font-handwriting text-2xl text-slate-900 dark:text-slate-100 mt-4 mb-2">
            Este es un resumen de mi portafolio
          </p>

          <div className="lg:flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left — personal intro */}
            <div className="flex flex-col lg:h-full">
              <div className="self-center relative z-10 -mb-px bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 border-b-0 rounded-t-xl px-6 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm whitespace-nowrap">
                Mi perfil profesional
              </div>
              <div className="lg:flex-1 bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col p-4 sm:p-8">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <img
                  src="/assets/juan.png"
                  alt="Juan Anavitate"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-sky-200 dark:ring-sky-700"
                />
                <div>
                  <h2 className="font-bold text-slate-800 dark:text-slate-100 text-lg leading-tight">Juan Anavitate</h2>
                  <p className="text-slate-400 dark:text-slate-400 text-sm">Backend Dev · QA Engineer</p>
                </div>
                <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Disponible
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Ingeniero de Sistemas especializado en backend y arquitecturas limpias. Construyo
                sistemas confiables, escalables y orientados a datos, aplicando prácticas de QA
                para garantizar calidad en producción.
              </p>
              <div className="mb-5">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Habilidades</p>
                <div className="flex flex-wrap gap-2">
                  {['Backend', 'Node.js', 'NestJS', 'PostgreSQL', 'MongoDB', 'QA & Testing', 'Docker', 'TypeScript'].map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full text-xs font-medium bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-800">{s}</span>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Lenguajes</p>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'TypeScript', 'Python', 'PHP', 'Java', 'SQL'].map((l) => (
                    <span key={l} className="px-3 py-1 rounded-full text-xs font-medium bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800">{l}</span>
                  ))}
                </div>
              </div>
              <div className="mt-auto flex gap-3 flex-wrap">
                <button
                  onClick={() => goToSection(1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold transition-all shadow-sm"
                >
                  Conocer más
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </button>
                <a
                  href="https://github.com/JuanAnavitate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-semibold transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </a>
              </div>
              </div>
            </div>

            {/* Right — mini project slider */}
            <div className="flex flex-col min-h-[300px] sm:min-h-[400px] lg:h-full">
              <div className="self-center relative z-10 -mb-px bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 border-b-0 rounded-t-xl px-6 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm whitespace-nowrap">
                Mis proyectos
              </div>
              <div className="flex-1 rounded-3xl overflow-hidden shadow-lg min-h-[260px] sm:min-h-[350px] lg:min-h-0">
                <MiniSlider goToSection={goToSection} />
              </div>
            </div>
          </div>

          {/* Down CTA */}
          <div className="flex flex-col items-center gap-3 pt-3 sm:pt-5">
            <p className="font-handwriting text-xl sm:text-2xl text-slate-900 dark:text-slate-100">¿Interesado? Te invito a conocerme</p>
            <NavBtn direction="down" onClick={() => goToSection(1)} label="Ir a Sobre mí" />
          </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            SECTION 1 — Sobre mí
        ═══════════════════════════════════ */}
        <section ref={el => { sectionRefs.current[1] = el }} className="relative isolate h-screen flex-shrink-0 overflow-y-auto flex flex-col">
          <NeuralBackground seed={1} />
          <div className="relative z-10 flex flex-col pt-14 px-4 sm:px-10 lg:px-28 pb-3 lg:flex-1 lg:min-h-0">
          {/* Up nav — centered */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1 mb-3">
            <NavBtn direction="up" onClick={() => goToSection(0)} label="Volver al resumen" />
            <h2 className="text-base sm:text-xl font-handwriting text-slate-800 dark:text-slate-100">Este es mi perfil personal y profesional</h2>
          </div>

          {/* Main 2-column layout — left: big experience card, right: 2 stacked cards */}
          <div className="flex gap-4 justify-center flex-col lg:flex-row lg:flex-1">

            {/* LEFT — He trabajado en (tall card) */}
            <div className="w-full lg:w-[45%] bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-lg p-6 flex flex-col">
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-1">He trabajado en</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">Este es mi perfil personal y profesional</p>
              <div className="flex flex-col gap-4 lg:flex-1 lg:min-h-0 lg:overflow-hidden">
                {[
                  {
                    company: 'Baco Adventure SAS',
                    role: 'Desarrollador Backend',
                    period: '2025',
                    desc: 'Transformación digital de la contratación pública de la Gobernación del Meta. APIs y servicios backend para modernizar procesos de contratación institucional.',
                    tags: ['Node.js', 'Express', 'MongoDB'],
                    color: '#22C55E',
                  },
                  {
                    company: 'UnimetaDocs',
                    role: 'Desarrollador Full-Stack',
                    period: '2025',
                    desc: 'Plataforma de gestión administrativa universitaria con análisis de datos y generación de reportes.',
                    tags: ['NestJS', 'Next.js', 'PostgreSQL', 'TypeScript'],
                    color: '#F59E0B',
                  },
                  {
                    company: 'Quapi',
                    role: 'Creador y Desarrollador Full-Stack',
                    period: '2025',
                    desc: 'Plataforma QA para gestionar y automatizar el aseguramiento de calidad de aplicaciones web.',
                    tags: ['Node.js', 'React', 'MongoDB', 'Jest'],
                    color: '#38BDF8',
                  },
                ].map((exp) => (
                  <div key={exp.company} className="flex gap-3 items-start border-b border-slate-50 dark:border-slate-700 last:border-0 pb-4 last:pb-0">
                    <span className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: exp.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{exp.company}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono flex-shrink-0">{exp.period}</span>
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-1.5">{exp.role}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2">{exp.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-600">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Habilidades + Lenguajes stacked */}
            <div className="w-full lg:w-[38%] flex flex-col gap-4 lg:min-h-0">

              {/* Habilidades */}
              <div className="flex-1 min-h-0 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-lg p-5 flex flex-col">
                <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 mb-3">Tengo habilidades en</h3>
                <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
                  {[
                    {
                      cat: 'Backend',
                      icon: '⚙️',
                      items: ['Node.js', 'NestJS', 'Express', 'Python', 'PHP', 'Java'],
                      accent: '#0EA5E9',
                      bg: '#F0F9FF',
                      border: '#BAE6FD',
                    },
                    {
                      cat: 'Bases de datos',
                      icon: '🗄️',
                      items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma ORM'],
                      accent: '#F59E0B',
                      bg: '#FFFBEB',
                      border: '#FDE68A',
                    },
                    {
                      cat: 'QA & Testing',
                      icon: '🧪',
                      items: ['Jest', 'Supertest', 'Postman', 'E2E'],
                      accent: '#EF4444',
                      bg: '#FFF5F5',
                      border: '#FECACA',
                    },
                    {
                      cat: 'DevOps & Tools',
                      icon: '🚀',
                      items: ['Docker', 'Git', 'GitHub', 'Jira'],
                      accent: '#22C55E',
                      bg: '#F0FDF4',
                      border: '#BBF7D0',
                    },
                  ].map((s) => (
                    <div
                      key={s.cat}
                      className="rounded-2xl p-3 flex flex-col gap-2 dark:bg-slate-700/60"
                      style={{ background: s.bg, border: `1.5px solid ${s.border}` }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{s.icon}</span>
                        <span className="text-sm font-bold" style={{ color: s.accent }}>{s.cat}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.items.map((i) => (
                          <span
                            key={i}
                            className="flex-auto text-center px-2.5 py-1 rounded-full text-xs font-semibold dark:bg-slate-800"
                            style={{ color: s.accent, border: `1px solid ${s.border}` }}
                          >
                            {i}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lenguajes */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-lg p-5 flex flex-col gap-3">
                <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">Usando lenguajes como:</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { lang: 'JavaScript', bg: '#F7DF1E', fg: '#1a1a1a' },
                    { lang: 'TypeScript', bg: '#3178C6', fg: '#fff' },
                    { lang: 'Python', bg: '#3572A5', fg: '#fff' },
                    { lang: 'PHP', bg: '#777BB4', fg: '#fff' },
                    { lang: 'Java', bg: '#ED8B00', fg: '#fff' },
                    { lang: 'SQL', bg: '#336791', fg: '#fff' },
                    { lang: 'HTML/CSS', bg: '#E34F26', fg: '#fff' },
                  ].map((l) => (
                    <span key={l.lang} className="px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm" style={{ background: l.bg, color: l.fg }}>
                      {l.lang}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 dark:text-slate-500 text-xs italic border-t border-slate-50 dark:border-slate-700 pt-2">
                  💡 Dato curioso: ¡PHP es mi favorito!
                </p>
              </div>

            </div>
          </div>

          {/* Down nav — centered */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2 mt-3">
            <p className="font-handwriting text-xl sm:text-2xl text-slate-900 dark:text-slate-100">Ahora conoce mis proyectos</p>
            <NavBtn direction="down" onClick={() => goToSection(2)} label="Ir a Proyectos" />
          </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            SECTION 2 — Proyectos
        ═══════════════════════════════════ */}
        <section ref={el => { sectionRefs.current[2] = el }} className="relative isolate h-screen flex-shrink-0 overflow-y-auto flex flex-col pt-16 px-6 pb-6">
          <NeuralBackground seed={2} />
          <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-6 flex-1">
            <div className="flex flex-col items-center gap-1">
              <NavBtn direction="up" onClick={() => goToSection(1)} label="Volver a Sobre mí" />
              <span className="font-handwriting text-2xl text-slate-900 dark:text-slate-100">Volver a Sobre mí</span>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
              {/* Big heading */}
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight mb-4 sm:mb-6">
                  He trabajado en los siguientes proyectos:
                </h2>
                <p className="text-slate-400 dark:text-slate-500 text-base leading-relaxed">
                  Proyectos reales donde apliqué arquitecturas limpias, buenas prácticas de
                  desarrollo y aseguramiento de calidad desde el primer día.
                </p>
              </div>
              {/* Full slider */}
              <div className="h-[560px] sm:h-[620px] lg:h-auto lg:min-h-0 lg:flex-1 shadow-lg rounded-3xl overflow-hidden">
                <FullSlider />
              </div>
            </div>

            {/* Down CTA */}
            <div className="flex flex-col items-center gap-3 pt-2 pb-2">
              <p className="font-handwriting text-xl sm:text-2xl text-slate-900 dark:text-slate-100 text-center">
                ¿Te llamó algo la atención?<br />
                ¡Te digo cómo contactarme!
              </p>
              <NavBtn direction="down" onClick={() => goToSection(3)} label="Ir a Contacto" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            SECTION 3 — Contacto
        ═══════════════════════════════════ */}
        <section ref={el => { sectionRefs.current[3] = el }} className="relative isolate h-screen flex-shrink-0 overflow-y-auto flex flex-col pt-16 px-6 pb-6">
          <NeuralBackground seed={3} />
          <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col gap-4 lg:flex-1 lg:min-h-0">
            <div className="flex flex-col items-center gap-1">
              <NavBtn direction="up" onClick={() => goToSection(2)} label="Volver a mis proyectos" />
              <span className="font-handwriting text-2xl text-slate-900 dark:text-slate-100">Volver a mis proyectos</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:flex-1 lg:min-h-0">
              {/* Contact form */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-lg p-4 sm:p-8 flex flex-col lg:overflow-y-auto lg:min-h-0">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">Hablemos</h3>
                <p className="text-slate-400 dark:text-slate-400 text-sm mb-6">Cuéntame sobre tu proyecto o idea.</p>
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1.5">Nombre</label>
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        className="w-full border border-slate-200 dark:border-slate-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 placeholder-slate-300 dark:placeholder-slate-500 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1.5">Email</label>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        className="w-full border border-slate-200 dark:border-slate-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 placeholder-slate-300 dark:placeholder-slate-500 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1.5">Asunto</label>
                    <input
                      type="text"
                      placeholder="¿En qué puedo ayudarte?"
                      className="w-full border border-slate-200 dark:border-slate-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 placeholder-slate-300 dark:placeholder-slate-500 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900 transition-all"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1.5">Mensaje</label>
                    <textarea
                      placeholder="Cuéntame sobre tu proyecto..."
                      className="min-h-[140px] w-full border border-slate-200 dark:border-slate-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 placeholder-slate-300 dark:placeholder-slate-500 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    Enviar mensaje
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                  </button>
                </form>
              </div>

              {/* Quote + socials */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-lg overflow-hidden flex flex-col lg:min-h-0">
                <div className="relative flex-shrink-0">
                  <img src="/assets/portada.jpg" alt="portada" className="w-full h-32 sm:h-44 object-cover" />
                  <button
                    onClick={() => setCoverOpen(true)}
                    className="absolute bottom-2 right-2 bg-black/40 hover:bg-black/65 text-white rounded-full p-1.5 backdrop-blur-sm transition-all"
                    aria-label="Ver imagen completa"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                    </svg>
                  </button>
                </div>
                <div className="p-7 flex flex-col flex-1 justify-between">
                  <p className="font-serif text-slate-700 dark:text-slate-200 text-xl sm:text-2xl lg:text-4xl leading-snug border-b border-slate-100 dark:border-slate-700 pb-5">
                    &#8220;La IA es el lienzo; la lógica humana, el pincel.&#8221;
                    <span className="block text-sm font-sans font-medium text-slate-400 dark:text-slate-500 mt-1 not-italic">— Juan Anavitate</span>
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-0">¿Quieres saber más de mí?</p>

                  <div>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Mis redes personales</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { label: 'YouTube', href: 'https://youtube.com/@juananavitate', icon: 'M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z', color: '#FF0000' },
                      { label: 'X', href: 'https://x.com/JuanAnavitate', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z', color: '#000' },
                      { label: 'Facebook', href: 'https://facebook.com/juananavitate', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', color: '#1877F2' },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold transition-all"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: s.color }}>
                          <path d={s.icon} />
                        </svg>
                        {s.label}
                      </a>
                    ))}
                  </div>

                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Mis redes de trabajo</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        label: 'LinkedIn',
                        href: 'https://linkedin.com/in/juananavitate',
                        icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
                        color: '#0A66C2',
                      },
                      {
                        label: 'GitHub',
                        href: 'https://github.com/JuanAnavitate',
                        icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
                        color: '#24292e',
                      },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-100 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold transition-all"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" style={{ color: s.color }}>
                          <path d={s.icon} />
                        </svg>
                        {s.label}
                      </a>
                    ))}
                  </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to top */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => goToSection(0)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-semibold transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7"/></svg>
                Volver al resumen de la página
              </button>
            </div>

            {/* Footer */}
            <footer className="text-center text-xs text-slate-300 dark:text-slate-600 pb-4 font-medium">
              AnavitaTECH · Portafolio Personal de Juan Anavitate · 2026 ©
            </footer>
          </div>
        </section>

      </div>

      {/* Cover lightbox */}
      {coverOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setCoverOpen(false)}
        >
          <div
            className="relative max-w-3xl w-[90vw] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCoverOpen(false)}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/75 text-white rounded-full p-1.5 backdrop-blur-sm transition-all z-10"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src="/assets/portada.jpg" alt="portada" className="w-full h-auto max-h-[80vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  )
}
