import { useEffect, useRef } from 'react'

const skills = [
  { category: 'Backend', items: ['Node.js', 'Python', 'PHP', 'Java', 'NestJS', 'Express'] },
  { category: 'Bases de datos', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma ORM'] },
  { category: 'QA & Testing', items: ['NestJS Supertest', 'Postman', 'Jest', 'Pruebas E2E'] },
  { category: 'DevOps & Herramientas', items: ['Docker', 'Jira', 'Trello', 'Git', 'GitHub'] },
]


export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden bg-dark-800/20">
      {/* Orbs */}
      <div className="orb w-64 h-64 bg-neon-purple/8 bottom-0 left-0" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs font-medium mb-4 reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
            Sobre mí
          </div>
          <h2 className="section-title reveal">
            Quién soy y{' '}
            <span className="gradient-text">qué hago</span>
          </h2>
        </div>

        {/* Bio + photo */}
        <div className="flex flex-col sm:flex-row gap-8 items-start mb-14 reveal">
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-neon-cyan/30">
              <img src="/assets/juan.png" alt="Juan José Anavitate Gómez" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <p className="text-white/70 leading-relaxed">
              Soy <span className="text-neon-cyan font-semibold">Juan José Anavitate Gómez</span>, Ingeniero de Sistemas
              con enfoque en desarrollo backend. Me desenvuelvo bien en la lógica y estructuración
              de sistemas, construyendo APIs robustas y arquitecturas limpias.
            </p>
            <p className="text-white/50 leading-relaxed text-sm">
              Trabajo con Node.js, Python, PHP y Java conectando aplicaciones a bases de datos
              relacionales y no relacionales. Aplico prácticas de QA para garantizar que lo que
              construyo funcione correctamente.
            </p>
            <p className="text-white/50 leading-relaxed text-sm">
              Fuera del código soy creador de contenido, analista de datos, autor publicado y
              compositor musical.
            </p>
          </div>
        </div>

        {/* Interests + meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-14 reveal">
          {['📚 Escritor', '🎵 Compositor', '🎬 Creador de contenido', '📊 Analista de datos'].map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/60">
              {tag}
            </span>
          ))}
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/60">
            📍 Villavicencio, Colombia
          </span>
        </div>

        {/* Single experience card */}
        <div className="mb-16 reveal">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Experiencia</h3>
          <div className="card-glass p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-white font-semibold">Desarrollador Backend</span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/50 text-sm">Baco Adventure SAS</span>
                <span className="ml-auto text-xs text-neon-cyan font-medium">2025</span>
              </div>
              <p className="text-white/40 text-sm">Transformación digital de la contratación pública en Villavicencio, Meta.</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-8 text-center reveal">
            Stack tecnológico
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((group, gi) => (
              <div
                key={group.category}
                className="reveal card-glass p-6"
                style={{ transitionDelay: `${gi * 100}ms` }}
              >
                <h4 className="text-xs font-semibold text-neon-cyan/80 uppercase tracking-widest mb-4">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/8 text-white/60
                                 hover:text-neon-cyan hover:border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
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
