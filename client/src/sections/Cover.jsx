import { useState } from 'react'
import { Link } from 'react-router-dom'

const PROJECTS = [
  {
    slug: 'unimetadocs',
    name: 'UnimetaDocs',
    tagline: 'Gestión administrativa universitaria centralizada',
    description:
      'Plataforma que centraliza la información administrativa de instituciones universitarias, con herramientas de análisis de datos y generación automática de informes y reportes institucionales.',
    features: [
      'Centralización de información académica y administrativa',
      'Herramientas de análisis y visualización de datos institucionales',
      'Generación automática de informes y reportes',
      'Control de acceso por roles y dependencias',
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
    description:
      'Plataforma QA para que usuarios y equipos gestionen, automaticen y mejoren el aseguramiento de calidad de sus aplicaciones, con reportes en tiempo real y flujos de trabajo integrados.',
    features: [
      'Gestión centralizada de casos de prueba',
      'Reportes de cobertura y calidad en tiempo real',
      'Integración con flujos de desarrollo existentes',
      'Dashboards de analytics para equipos QA',
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

// ─── Neural network SVG background ─────────────────────────────────────────
function NeuralBg({ color = '#38BDF8', opacity = 0.12 }) {
  const nodes = [
    { x: 8,  y: 10 }, { x: 28, y: 5  }, { x: 52, y: 16 }, { x: 75, y: 7  }, { x: 94, y: 18 },
    { x: 15, y: 33 }, { x: 40, y: 28 }, { x: 63, y: 40 }, { x: 88, y: 32 },
    { x: 5,  y: 56 }, { x: 30, y: 50 }, { x: 55, y: 62 }, { x: 80, y: 53 }, { x: 97, y: 65 },
    { x: 20, y: 78 }, { x: 45, y: 73 }, { x: 68, y: 85 }, { x: 90, y: 82 },
  ]
  const edges = [
    [0,1],[1,2],[2,3],[3,4],
    [0,5],[1,5],[1,6],[2,6],[2,7],[3,7],[3,8],[4,8],
    [5,6],[6,7],[7,8],
    [5,9],[6,10],[7,11],[8,12],
    [9,10],[10,11],[11,12],[12,13],
    [9,14],[10,14],[10,15],[11,15],[11,16],[12,16],[12,17],[13,17],
    [14,15],[15,16],[16,17],
  ]
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={`e${i}`}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={color} strokeOpacity={opacity} strokeWidth="0.3"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={`n${i}`} cx={n.x} cy={n.y} r="0.8" fill={color} fillOpacity={opacity * 2} />
      ))}
    </svg>
  )
}

// ─── Cover ──────────────────────────────────────────────────────────────────
export default function Cover() {
  const [current, setCurrent] = useState(0)
  const proj = PROJECTS[current]

  function goTo(idx) {
    setCurrent((idx + PROJECTS.length) % PROJECTS.length)
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden">

      {/* ════ LEFT — Project showcase slider ════ */}
      <div className="flex-1 lg:w-1/2 relative overflow-hidden bg-slate-950">

        {/* Neural network lines ─ color follows current slide */}
        <NeuralBg color={proj.nodeColor} />

        {/* Single track — slides sit side by side, track translates as one unit */}
        <div
          className="absolute top-0 bottom-0 left-0 flex"
          style={{
            width: `${PROJECTS.length * 100}%`,
            transform: `translateX(-${current * (100 / PROJECTS.length)}%)`,
            transition: 'transform 520ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {PROJECTS.map((p) => (
            <div
              key={p.slug}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / PROJECTS.length}%` }}
            >
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: p.overlay }} />

              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 lg:p-10 pb-28">
                {/* Proyectos label — top-left */}
                <div className="absolute top-6 left-8 lg:left-10">
                  <span className="text-sm font-bold tracking-widest uppercase text-white">Proyectos</span>
                </div>

                <span
                  className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-xs font-semibold border mb-4"
                  style={{ background: p.badgeBg, color: p.badgeText, borderColor: p.badgeBorder }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.nodeColor }} />
                  {p.status}
                </span>
                <h2 className="text-4xl xl:text-5xl font-bold text-white leading-none tracking-tight mb-2">
                  {p.name}
                </h2>
                <p className="text-white/55 text-sm font-medium mb-5">{p.tagline}</p>
                <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-lg">{p.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-white/60 text-xs">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: p.nodeColor }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mb-6">
                  <p className="text-white/25 text-[10px] font-bold tracking-widest uppercase mb-2">Desarrollado con</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/10 text-white/65 border border-white/10">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 active:scale-95 shadow-lg"
                    style={{ background: p.btnBg }}
                  >
                    Conocer más
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <button disabled className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-white/[0.07] text-white/30 border border-white/10 cursor-not-allowed">
                    Ver demo
                    <span className="text-[10px] text-white/20">Próximamente</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation — arrows in bottom-right corner */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-3">
          <button
            onClick={() => goTo(current - 1)}
            className="w-11 h-11 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform duration-150 shadow-lg"
            style={{ background: proj.nodeColor }}
            aria-label="Proyecto anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="w-11 h-11 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform duration-150 shadow-lg"
            style={{ background: proj.nodeColor }}
            aria-label="Proyecto siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Counter */}
        <div className="absolute top-5 right-5 z-20 text-white/20 text-xs font-mono tracking-wider">
          {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(PROJECTS.length).padStart(2, '0')}
        </div>
      </div>

      {/* ════ RIGHT — Contact form + about CTA ════ */}
      <div className="lg:w-1/2 relative bg-slate-900 flex flex-col justify-center overflow-y-auto">

        {/* Neural bg, softer */}
        <NeuralBg color="#64748B" opacity={0.07} />

        <div className="relative z-10 px-8 sm:px-12 lg:px-10 xl:px-14 py-10">

          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="w-12 h-12 rounded-2xl bg-brand-cyan flex items-center justify-center text-white text-base font-black flex-shrink-0 shadow-lg">JJ</span>
            <span className="text-3xl font-bold tracking-tight text-white">Anavita<span className="text-brand-cyan">TECH</span></span>
          </div>

          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-brand-cyan text-[10px] font-bold tracking-widest uppercase mb-1.5">
                Contáctame
              </p>
              <h2 className="text-2xl xl:text-3xl font-bold text-white leading-tight">Hablemos</h2>
              <p className="text-white/40 text-sm mt-1.5 max-w-xs leading-relaxed">
                Cuéntame sobre tu proyecto o idea, estoy disponible para colaborar.
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-brand-green text-xs font-semibold">Disponible</span>
            </div>
          </div>

          {/* Contact form */}
          <form className="space-y-3.5 mb-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/[0.2] outline-none focus:border-brand-cyan/40 focus:bg-white/[0.08] transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/[0.2] outline-none focus:border-brand-cyan/40 focus:bg-white/[0.08] transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5">
                Asunto
              </label>
              <input
                type="text"
                placeholder="¿En qué puedo ayudarte?"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/[0.2] outline-none focus:border-brand-cyan/40 focus:bg-white/[0.08] transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5">
                Mensaje
              </label>
              <textarea
                rows={4}
                placeholder="Cuéntame sobre tu proyecto..."
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-white text-sm placeholder-white/[0.2] outline-none focus:border-brand-cyan/40 focus:bg-white/[0.08] transition-all resize-none"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full justify-center">
              Enviar mensaje
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-white/20 text-xs">o</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Conóceme CTA */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-white/60 text-sm font-semibold">Conóceme más</p>
              <p className="text-white/25 text-xs mt-0.5">Experiencia, habilidades y redes</p>
            </div>
            <Link
              to="/about"
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border border-white/15 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/25 transition-all"
            >
              Ver perfil
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5 pt-5 border-t border-white/[0.07]">
            <span className="text-white/20 text-xs">Redes</span>
            <a
              href="https://github.com/JuanAnavitate"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/35 hover:text-white/75 transition-colors text-xs font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/juananavitate"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/35 hover:text-white/75 transition-colors text-xs font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
