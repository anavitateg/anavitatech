import { Link, useParams, Navigate } from 'react-router-dom'

const PROJECTS = {
  unimetadocs: {
    name: 'UnimetaDocs',
    tagline: 'Sistema institucional de gestión docente, análisis de datos y generación de documentos',
    description: [
      'UnimetaDocs es una plataforma web institucional desarrollada para la Corporación Universitaria del Meta (Unimeta). Centraliza y digitaliza la gestión del cuerpo docente, facilitando el análisis de datos académicos y la generación de documentos formales con exportación directa a PDF, DOCX y XLSX.',
      'Cuenta con un motor de análisis visual interactivo (Analyzer) con pipelines configurables por pasos — desde selección de datos hasta operaciones estadísticas y visualizaciones. El Generador de Documentos tipo informe resuelve tokens de métricas del Analyzer en tiempo de exportación, produciendo reportes institucionales con formato profesional.',
    ],
    tech: ['NestJS 10', 'Next.js 14', 'PostgreSQL 16', 'TypeScript 5', 'Prisma ORM 5', 'Zustand 4', 'Recharts', 'Docker Compose'],
    status: 'En desarrollo — V1.1.0',
    year: '2026',
    role: 'Desarrollador Full-Stack',
    nodeColor: '#F59E0B',
    overlay: 'linear-gradient(150deg,rgba(120,53,15,0.85) 0%,rgba(127,29,29,0.72) 55%,rgba(2,6,23,0.97) 100%)',
    badgeBg: 'rgba(245,158,11,0.15)',
    badgeText: '#FCD34D',
    badgeBorder: 'rgba(245,158,11,0.3)',
    accentClass: 'border-t-amber-500',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=70',
    features: [
      'Gestión completa de docentes con importación masiva via JSON',
      'Motor de análisis visual (Analyzer) con pipelines de 6 pasos',
      'Generador de informes exportables a PDF, DOCX y XLSX',
      'Plantillas automáticas que consultan datos en tiempo real',
      'Control de acceso por roles: WEBMASTER y ADMINISTRATIVO',
      'Sistema completo de auditoría con logs cronológicos',
      'Dark mode completo en toda la interfaz',
      'Despliegue con Docker Compose',
    ],
    github: null,
    demo: 'https://unimetadocs.onrender.com',
  },
  quapi: {
    name: 'Quapi',
    tagline: 'Aseguramiento de calidad para software y aplicaciones web',
    description: [
      'Quapi es una plataforma QA diseñada para que usuarios, equipos y empresas gestionen y automaticen el aseguramiento de calidad de sus aplicaciones y software web desde un solo lugar.',
      'Ofrece gestión de casos de prueba, reportes de cobertura en tiempo real, dashboards de analytics para equipos QA, e integración con los flujos de desarrollo existentes.',
    ],
    tech: ['Node.js', 'React', 'MongoDB', 'Jest', 'Docker'],
    status: 'En desarrollo',
    year: '2025',
    role: 'Creador y Desarrollador Full-Stack',
    nodeColor: '#38BDF8',
    overlay: 'linear-gradient(150deg,rgba(12,74,110,0.85) 0%,rgba(6,78,59,0.72) 55%,rgba(2,6,23,0.97) 100%)',
    badgeBg: 'rgba(56,189,248,0.15)',
    badgeText: '#7DD3FC',
    badgeBorder: 'rgba(56,189,248,0.3)',
    accentClass: 'border-t-sky-500',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&auto=format&fit=crop&q=70',
    features: [
      'Gestión centralizada de casos de prueba',
      'Reportes de cobertura y calidad en tiempo real',
      'Dashboards de analytics para equipos QA',
      'Integración con flujos de desarrollo existentes',
      'Seguimiento de bugs y regresiones',
      'Notificaciones automatizadas por etapa de prueba',
    ],
    github: null,
    demo: null,
  },
}

function NeuralBg({ color = '#38BDF8' }) {
  const nodes = [
    { x: 5,  y: 10 }, { x: 22, y: 4  }, { x: 45, y: 14 }, { x: 68, y: 6  }, { x: 90, y: 16 },
    { x: 12, y: 35 }, { x: 35, y: 28 }, { x: 58, y: 40 }, { x: 82, y: 32 },
    { x: 8,  y: 62 }, { x: 30, y: 55 }, { x: 52, y: 68 }, { x: 76, y: 58 }, { x: 95, y: 70 },
    { x: 18, y: 85 }, { x: 42, y: 78 }, { x: 65, y: 90 }, { x: 88, y: 84 },
  ]
  const edges = [
    [0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,6],[2,7],[3,7],[3,8],[4,8],
    [5,6],[6,7],[7,8],[5,9],[6,10],[7,11],[8,12],[9,10],[10,11],[11,12],[12,13],
    [9,14],[10,15],[11,15],[11,16],[12,16],[12,17],[14,15],[15,16],[16,17],
  ]
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke={color} strokeOpacity="0.15" strokeWidth="0.25" />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="0.7" fill={color} fillOpacity="0.25" />
      ))}
    </svg>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = PROJECTS[slug]

  if (!project) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-x-hidden">
      <NeuralBg color={project.nodeColor} />

      {/* Hero banner */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: project.overlay }} />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 page-container">
          <span
            className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-xs font-semibold border mb-3"
            style={{ background: project.badgeBg, color: project.badgeText, borderColor: project.badgeBorder }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: project.nodeColor }} />
            {project.status}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-none tracking-tight mb-2">
            {project.name}
          </h1>
          <p className="text-white/55 text-sm font-medium">{project.tagline}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 page-container py-12 pb-20">

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white/80 transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: main content */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2">
              <span className="pill-gray">{project.year}</span>
              <span
                className="pill text-xs font-semibold border"
                style={{ background: project.badgeBg, color: project.badgeText, borderColor: project.badgeBorder }}
              >
                {project.role}
              </span>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-4">
              {project.description.map((p, i) => (
                <p key={i} className="text-white/60 leading-relaxed text-sm">{p}</p>
              ))}
            </div>

            {/* Features */}
            <div className={`bg-white/[0.04] rounded-2xl border border-t-4 border-white/[0.08] ${project.accentClass} p-7`}>
              <h2 className="font-bold text-white text-base mb-5">Funcionalidades principales</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/55">
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.nodeColor }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 flex-wrap">
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ background: project.nodeColor }}
                >
                  Ver demo
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <button disabled className="btn bg-white/[0.07] text-white/30 border border-white/10 cursor-not-allowed">
                  Demo no disponible
                </button>
              )}
              {project.github ? (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="btn border border-white/20 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                >
                  Ver en GitHub
                </a>
              ) : (
                <span className="text-white/25 text-xs">Repositorio privado</span>
              )}
            </div>
          </div>

          {/* Right: sidebar */}
          <div className="flex flex-col gap-5">

            {/* Tech stack */}
            <div className={`bg-white/[0.04] rounded-2xl border border-t-4 border-white/[0.08] ${project.accentClass} p-6`}>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Stack tecnológico</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 text-white/65 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Status card */}
            <div className="bg-white/[0.04] rounded-2xl border border-white/[0.08] p-6">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Estado del proyecto</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: project.nodeColor }} />
                <span className="text-sm font-semibold text-white/75">{project.status}</span>
              </div>
              <p className="text-white/30 text-xs mt-2">Repositorio privado bajo desarrollo activo.</p>
            </div>

            {/* Contact CTA */}
            <div className="bg-white/[0.04] rounded-2xl border border-white/[0.08] p-6">
              <p className="text-white/55 text-sm font-semibold mb-1">
                ¿Te interesa este proyecto?
              </p>
              <p className="text-white/25 text-xs mb-4">Contáctame para colaborar o saber más.</p>
              <Link to="/" className="btn btn-primary w-full justify-center text-sm">
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
