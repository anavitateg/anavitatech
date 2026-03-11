const skills = [
  { category: 'Backend',            color: 'card-accent-cyan',   items: ['Node.js', 'Python', 'PHP', 'Java', 'NestJS', 'Express'] },
  { category: 'Bases de datos',     color: 'card-accent-yellow', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma ORM'] },
  { category: 'QA & Testing',       color: 'card-accent-red',    items: ['Supertest', 'Postman', 'Jest', 'Pruebas E2E'] },
  { category: 'DevOps & Herramientas', color: 'card-accent-blue', items: ['Docker', 'Jira', 'Trello', 'Git', 'GitHub'] },
]

const interests = [' Escritor', ' Compositor', ' Creador de contenido', ' Analista de datos']

export default function About() {
  return (
    <section id="about" className="section-gap bg-section-about">
      <div className="page-container">

        {/* Header */}
        <div className="mb-14">
          <span className="section-eyebrow">Sobre mí</span>
          <h2 className="section-heading">
            Quién soy, qué hago y <span className="text-brand-cyan">qué hice</span>
          </h2>
        </div>

        {/* Bio row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Bio card */}
          <div className="lg:col-span-2 card card-accent-cyan p-8 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-surface-border flex-shrink-0">
                <img src="/assets/juan.png" alt="Juan" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-bold text-ink-primary">Juan José Anavitate Gómez</div>
                <div className="text-sm text-brand-cyan font-medium">Ingeniero de Sistemas  Backend</div>
              </div>
            </div>
            <p className="text-ink-secondary leading-relaxed">
              Trabajo con Node.js, Python, PHP y Java, conectando aplicaciones a bases de datos
              relacionales y no relacionales. Aplico prácticas de QA para garantizar que lo
              que construyo funcione correctamente en producción.
            </p>
            <p className="text-ink-secondary leading-relaxed">
              Fuera del código soy creador de contenido, analista de datos, autor publicado y
              compositor musical.
            </p>
            <div className="flex flex-wrap gap-2">
              {interests.map((t) => (
                <span key={t} className="pill-gray">{t}</span>
              ))}
            </div>
            <div className="pt-1">
              <a
                href="/assets/HDVJuanAnavitate_2026.pdf"
                download
                className="btn btn-secondary text-sm"
              >
                Descargar CV
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Experience + location side cards */}
          <div className="flex flex-col gap-4">
            {/* Experience */}
            <div className="card card-accent-green p-6 flex-1">
              <div className="text-xs font-semibold text-ink-tertiary uppercase tracking-widest mb-4">Experiencia</div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-green-light flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-ink-primary text-sm">Desarrollador Backend</div>
                  <div className="text-ink-tertiary text-xs">Baco Adventure SAS  2025</div>
                  <p className="text-ink-secondary text-xs mt-1 leading-relaxed">
                    Transformación digital de la contratación pública en Villavicencio, Meta.
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="card p-5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-red-light flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-ink-tertiary uppercase tracking-widest">Ubicación</div>
                <div className="text-sm font-medium text-ink-primary">Villavicencio, Meta </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="text-xs font-semibold text-ink-tertiary uppercase tracking-widest mb-5">Stack tecnológico</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map(({ category, color, items }) => (
              <div key={category} className={`card ${color} p-5`}>
                <div className="text-xs font-bold text-ink-secondary uppercase tracking-widest mb-4">
                  {category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
