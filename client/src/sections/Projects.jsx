import { useEffect, useRef } from 'react'
import { projects } from '../data/projects'

function ProjectCard({ project, index }) {
  return (
    <div
      className="reveal card-glass group overflow-hidden"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-70`} />
        {/* Status badge */}
        {project.status && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 border border-yellow-400/40 text-yellow-300">
            {project.status}
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-neon-cyan/20 hover:border-neon-cyan transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-neon-cyan/20 hover:border-neon-cyan transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
          {project.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-white/5">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 rounded-xl text-xs font-medium border border-white/10 text-white/60
                         hover:border-neon-purple/50 hover:text-neon-purple transition-all duration-300"
            >
              GitHub →
            </a>
          ) : (
            <span className="flex-1 text-center py-2 rounded-xl text-xs font-medium border border-white/5 text-white/20 cursor-not-allowed">
              Privado
            </span>
          )}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 rounded-xl text-xs font-medium border border-white/10 text-white/60
                         hover:border-neon-cyan/50 hover:text-neon-cyan transition-all duration-300"
            >
              Demo →
            </a>
          ) : (
            <span className="flex-1 text-center py-2 rounded-xl text-xs font-medium border border-white/5 text-white/20 cursor-not-allowed">
              En desarrollo
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    reveals?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="orb w-96 h-96 bg-neon-blue/10 top-0 right-0" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-xs font-medium mb-4 reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
            Proyectos
          </div>
          <h2 className="section-title reveal">
            Lo que he{' '}
            <span className="gradient-text">construido</span>
          </h2>
          <p className="section-subtitle reveal max-w-2xl mx-auto">
            Proyectos en los que he trabajado, aplicando arquitecturas limpias y tecnologías modernas.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* More */}
        <div className="text-center mt-12 reveal">
          <a
            href="https://github.com/anavitateg"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Ver más en GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
