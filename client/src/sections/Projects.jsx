import { Link } from 'react-router-dom'

const project = {
  slug: 'uniMeta',
  title: 'UnimetaDocs',
  description:
    'Plataforma de digitalización de documentos universitarios para la Universidad de los Llanos. Automatiza la gestión de actas, certificados y constancias con firma digital y trazabilidad completa.',
  tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma ORM', 'TypeScript'],
  status: 'En desarrollo',
  year: '2025',
  image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
}

export default function Projects() {
  return (
    <section id="projects" className="section-gap bg-section-projects">
      <div className="page-container">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="section-eyebrow">Proyectos</span>
            <h2 className="section-heading">
              Lo que he <span className="text-brand-cyan">construido</span>
            </h2>
          </div>
          <a
            href="https://github.com/JuanAnavitate"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost text-sm self-start sm:self-auto"
          >
            Ver todo en GitHub 
          </a>
        </div>

        {/* Featured project card */}
        <div className="card card-accent-cyan overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="h-56 lg:h-auto overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="pill-yellow">{project.status}</span>
                  <span className="pill-gray">{project.year}</span>
                </div>
                <h3 className="text-2xl font-bold text-ink-primary mb-3">{project.title}</h3>
                <p className="text-ink-secondary leading-relaxed">{project.description}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="pill-cyan">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to={`/projects/${project.slug}`} className="btn btn-primary">
                    Ver proyecto completo 
                  </Link>
                  <a
                    href="https://github.com/JuanAnavitate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More coming soon */}
        <div className="mt-6 card p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-yellow-light flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
          <div>
            <div className="font-semibold text-ink-primary text-sm">Más proyectos en camino</div>
            <div className="text-ink-tertiary text-xs">Constantemente construyendo cosas nuevas.</div>
          </div>
        </div>

      </div>
    </section>
  )
}
