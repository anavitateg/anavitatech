import { useEffect, useRef } from 'react'

const skills = [
  { category: 'Backend', items: ['Node.js', 'Python', 'PHP', 'Java', 'NestJS', 'Express'] },
  { category: 'Bases de datos', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma ORM'] },
  { category: 'QA & Testing', items: ['NestJS Supertest', 'Postman', 'Jest', 'Pruebas E2E'] },
  { category: 'DevOps & Herramientas', items: ['Docker', 'Jira', 'Trello', 'Git', 'GitHub'] },
]

const timeline = [
  { year: '2025', role: 'Desarrollador Backend', company: 'Baco Adventure SAS', desc: 'Transformación digital de la contratación pública en Villavicencio, Meta.' },
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
      <div className="orb w-80 h-80 bg-neon-purple/10 bottom-0 left-0" />
      <div className="orb w-64 h-64 bg-neon-cyan/8 top-0 right-1/4" />

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

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left: Bio */}
          <div className="space-y-6">
            <div className="relative reveal">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-neon-cyan/30 shadow-neon-cyan mb-8">
                <img
                  src="/assets/juan.png"
                  alt="Juan José Anavitate Gómez"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <p className="text-white/70 leading-relaxed text-lg reveal">
              Soy <span className="text-neon-cyan font-semibold">Juan José Anavitate Gómez</span>, Ingeniero de Sistemas
              con enfoque en el desarrollo backend. Me desenvuelvo bien en la lógica y
              estructuración de sistemas, construyendo APIs robustas y arquitecturas limpias.
            </p>
            <p className="text-white/50 leading-relaxed reveal">
              Trabajo con comodidad en Node.js, Python, PHP y Java, conectando aplicaciones a
              bases de datos relacionales y no relacionales. Aplico prácticas de QA para
              garantizar que lo que construyo realmente funcione.
            </p>
            <p className="text-white/50 leading-relaxed reveal">
              Fuera del código soy creador de contenido, analista de datos,
              autor publicado y compositor musical. Creo que la creatividad y la tecnología van de la mano.
            </p>

            {/* Interests */}
            <div className="flex flex-wrap gap-2 reveal">
              {['\uD83D\uDCDA Escritor', '\uD83C\uDFB5 Compositor', '\uD83C\uDFAC Creador de contenido', '\uD83D\uDCCA Analista de datos'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/60">
                  {tag}
                </span>
              ))}
            </div>

            {/* Contact brief */}
            <div className="flex gap-4 reveal">
              <a href="mailto:anavitateg@gmail.com" className="btn-primary text-sm">
                Escribeme
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-6 reveal">Experiencia</h3>
            {timeline.map((item, i) => (
              <div
                key={i}
                className="reveal relative pl-6 border-l border-white/10 hover:border-neon-cyan/40 transition-colors duration-300 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full border-2 border-neon-purple bg-dark-900 group-hover:border-neon-cyan group-hover:shadow-neon-cyan transition-all" />
                <div className="text-xs text-neon-cyan font-medium mb-1">{item.year}</div>
                <div className="text-white font-semibold">{item.role}</div>
                <div className="text-white/40 text-sm">{item.company}</div>
                <div className="text-white/50 text-sm mt-1">{item.desc}</div>
              </div>
            ))}

            {/* Location */}
            <div className="reveal mt-8 p-4 rounded-2xl border border-white/8 bg-white/3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple flex-shrink-0">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-white/40 mb-0.5">Ubicación</div>
                <div className="text-white/80 text-sm font-medium">Villavicencio, Meta — Colombia 🇨🇴</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-8 text-center reveal">
            Stack tecnológico
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
