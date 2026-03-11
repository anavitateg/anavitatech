import { Link } from 'react-router-dom'

const experience = [
  {
    company: 'Baco Adventure SAS',
    role: 'Desarrollador Backend',
    period: '2025',
    description:
      'Transformación digital de la contratación pública de la Gobernación del Meta. Desarrollo de APIs y servicios backend para modernizar y digitalizar los procesos de contratación institucional.',
    tags: ['Node.js', 'Express', 'MongoDB'],
    nodeColor: '#4ADE80',
    badgeBg: 'rgba(74,222,128,0.12)',
    badgeText: '#86EFAC',
    badgeBorder: 'rgba(74,222,128,0.25)',
    type: 'Trabajo',
  },
  {
    company: 'UnimetaDocs',
    role: 'Desarrollador Full-Stack',
    period: '2025',
    description:
      'Plataforma de gestión administrativa universitaria que centraliza información académica e institucional, con herramientas de análisis de datos y generación automática de informes y reportes.',
    tags: ['NestJS', 'Next.js', 'PostgreSQL', 'TypeScript'],
    nodeColor: '#F59E0B',
    badgeBg: 'rgba(245,158,11,0.12)',
    badgeText: '#FCD34D',
    badgeBorder: 'rgba(245,158,11,0.25)',
    type: 'Proyecto',
    slug: 'unimetadocs',
  },
  {
    company: 'Quapi',
    role: 'Creador y Desarrollador Full-Stack',
    period: '2025',
    description:
      'Plataforma QA para que equipos y empresas gestionen, automaticen y mejoren el aseguramiento de calidad de sus aplicaciones web y software, con reportes en tiempo real.',
    tags: ['Node.js', 'React', 'MongoDB', 'Jest'],
    nodeColor: '#38BDF8',
    badgeBg: 'rgba(56,189,248,0.12)',
    badgeText: '#7DD3FC',
    badgeBorder: 'rgba(56,189,248,0.25)',
    type: 'Proyecto',
    slug: 'quapi',
  },
]

const skills = [
  { category: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'Python', 'PHP', 'Java'], color: '#0EA5E9' },
  { category: 'Bases de datos', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma ORM'], color: '#F59E0B' },
  { category: 'QA & Testing', items: ['Jest', 'Supertest', 'Postman', 'Pruebas E2E'], color: '#EF4444' },
  { category: 'DevOps & Tools', items: ['Docker', 'Git', 'GitHub', 'Jira', 'Trello'], color: '#4ADE80' },
]

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/JuanAnavitate',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    label: '@JuanAnavitate',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/juananavitate',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'Juan Anavitate',
  },
]

function NeuralBg() {
  const nodes = [
    { x: 5,  y: 8  }, { x: 22, y: 3  }, { x: 42, y: 12 }, { x: 65, y: 5  }, { x: 88, y: 15 },
    { x: 10, y: 32 }, { x: 32, y: 26 }, { x: 55, y: 38 }, { x: 80, y: 30 },
    { x: 7,  y: 58 }, { x: 28, y: 52 }, { x: 50, y: 65 }, { x: 75, y: 55 }, { x: 95, y: 68 },
    { x: 15, y: 82 }, { x: 40, y: 76 }, { x: 63, y: 88 }, { x: 87, y: 82 },
  ]
  const edges = [
    [0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,6],[2,7],[3,7],[3,8],[4,8],
    [5,6],[6,7],[7,8],[5,9],[6,10],[7,11],[8,12],[9,10],[10,11],[11,12],[12,13],
    [9,14],[10,15],[11,15],[11,16],[12,16],[12,17],[14,15],[15,16],[16,17],
  ]
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="fixed inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="#0EA5E9" strokeOpacity="0.06" strokeWidth="0.25"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="0.7" fill="#0EA5E9" fillOpacity="0.12" />
      ))}
    </svg>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
      <NeuralBg />

      <div className="relative z-10 page-container py-14 pb-20">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/35 hover:text-white/75 transition-colors mb-12"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </Link>

        {/* ── Profile header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-7 mb-14">
          <div className="relative flex-shrink-0">
            <img
              src="/assets/juan.png"
              alt="Juan José Anavitate Gómez"
              className="w-24 h-24 rounded-full object-cover ring-2 ring-brand-cyan/30 shadow-xl"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-green rounded-full border-2 border-slate-950" />
          </div>
          <div>
            <p className="text-brand-cyan text-[10px] font-bold tracking-widest uppercase mb-1">Perfil profesional</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-1">
              Juan José Anavitate Gómez
            </h1>
            <p className="text-white/50 text-base font-medium mb-3">
              Ingeniero de Sistemas · Backend Developer · QA Engineer
            </p>
            <div className="flex items-center flex-wrap gap-3">
              <div className="flex items-center gap-1.5 text-white/35 text-xs">
                <svg className="w-3.5 h-3.5 text-brand-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Villavicencio, Colombia
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                <span className="text-brand-green text-xs font-semibold">Disponible para proyectos</span>
              </div>
              <a
                href="/assets/HDVJuanAnavitate_2026.pdf"
                download
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-white/15 text-white/55 hover:bg-white/10 hover:text-white transition-all"
              >
                Descargar CV
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Bio ── */}
        <div className="mb-14 max-w-2xl">
          <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-3">Sobre mí</p>
          <p className="text-white/60 leading-relaxed text-sm">
            Ingeniero de Sistemas especializado en backend y arquitecturas limpias. Construyo sistemas
            confiables, escalables y orientados a datos, aplicando prácticas de QA para garantizar la
            calidad en producción. Fuera del código soy creador de contenido, analista de datos,
            autor publicado y compositor musical.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left column: Experience ── */}
          <div className="lg:col-span-2">
            <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-6">
              Experiencia & Proyectos
            </p>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.08]" />

              <div className="flex flex-col gap-8">
                {experience.map((exp, i) => (
                  <div key={i} className="pl-7 relative">
                    {/* Timeline dot */}
                    <span
                      className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full -translate-x-[4.5px] border-2 border-slate-950"
                      style={{ background: exp.nodeColor }}
                    />

                    <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-white text-sm">{exp.company}</h3>
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                            style={{ background: exp.badgeBg, color: exp.badgeText, borderColor: exp.badgeBorder }}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <p className="text-white/40 text-xs mt-0.5">{exp.role}</p>
                      </div>
                      <span className="text-white/25 text-xs font-mono">{exp.period}</span>
                    </div>

                    <p className="text-white/50 text-xs leading-relaxed mb-3">{exp.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {exp.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.06] text-white/45 border border-white/[0.08]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {exp.slug && (
                      <Link
                        to={`/projects/${exp.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold transition-colors"
                        style={{ color: exp.badgeText }}
                      >
                        Ver proyecto
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column: Skills + Socials ── */}
          <div className="flex flex-col gap-8">

            {/* Skills */}
            <div>
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-5">
                Stack tecnológico
              </p>
              <div className="flex flex-col gap-5">
                {skills.map((s) => (
                  <div key={s.category}>
                    <p className="text-xs font-semibold mb-2" style={{ color: s.color }}>
                      {s.category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.06] text-white/50 border border-white/[0.08]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social / Contact */}
            <div>
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-4">
                Redes profesionales
              </p>
              <div className="flex flex-col gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/50 hover:bg-white/[0.08] hover:text-white/85 transition-all group"
                  >
                    <span className="text-white/40 group-hover:text-white/75 transition-colors">
                      {s.icon}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white/70">{s.name}</p>
                      <p className="text-[11px] text-white/30">{s.label}</p>
                    </div>
                    <svg className="w-4 h-4 ml-auto text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-white/[0.04] rounded-2xl border border-white/[0.08] p-5">
              <p className="text-white/55 text-sm font-semibold mb-1">¿Trabajamos juntos?</p>
              <p className="text-white/25 text-xs mb-4 leading-relaxed">
                Estoy disponible para proyectos, colaboraciones y posiciones.
              </p>
              <Link to="/" className="btn btn-primary w-full justify-center text-sm">
                Contáctame
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
