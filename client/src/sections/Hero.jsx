import { useEffect, useRef, useState } from 'react'

const roles = ['Desarrollador Backend', 'Ingeniero de Sistemas', 'QA Engineer', 'Analista de Datos']

export default function Hero() {
  // Detect touch / mobile once at mount — no re-render needed
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  )
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const canvasRef = useRef(null)

  // Typewriter — desktop only
  useEffect(() => {
    if (isMobile) return
    const current = roles[roleIndex]
    let timeout
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex, isMobile])

  // Particle canvas — desktop only
  useEffect(() => {
    if (isMobile || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 32; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        color: ['#00f5ff', '#a855f7', '#3b82f6'][Math.floor(Math.random() * 3)],
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      })
      ctx.globalAlpha = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 90) {
            ctx.beginPath()
            ctx.strokeStyle = '#00f5ff'
            ctx.globalAlpha = (1 - dist / 90) * 0.06
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [isMobile])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Canvas + orbs — desktop only */}
      {!isMobile && (
        <>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="orb w-72 h-72 bg-neon-purple/15 top-1/4 -left-24" />
          <div className="orb w-64 h-64 bg-neon-cyan/10 bottom-1/4 -right-16" />
        </>
      )}

      {/* ───────────── MOBILE LAYOUT ───────────── */}
      {isMobile ? (
        <div className="relative z-10 w-full px-5 py-14 flex flex-col items-center text-center">

          {/* Availability pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-medium mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Disponible para proyectos
          </div>

          {/* Photo */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-neon-cyan/40 mb-4">
            <img src="/assets/juan.png" alt="Juan José Anavitate Gómez" className="w-full h-full object-cover" />
          </div>

          {/* Name */}
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            Juan <span className="gradient-text">Anavitate</span>
          </h1>
          <p className="text-xs font-semibold text-neon-cyan/70 tracking-widest uppercase mb-5">
            Ingeniero de Sistemas · Backend
          </p>

          {/* Role chips — all 4 visible, no carousel */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {roles.map((role) => (
              <span
                key={role}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-neon-cyan/20 text-neon-cyan/80"
              >
                {role}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <p className="text-sm text-white/45 max-w-[280px] leading-relaxed mb-8">
            Especializado en backend, QA y análisis de datos. Construyo sistemas confiables y soluciones que escalan.
          </p>

          {/* CTAs */}
          <div className="flex flex-col w-full max-w-[260px] gap-3 mb-10">
            <button onClick={scrollToProjects} className="btn-primary justify-center py-3 text-sm">
              Ver proyectos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <a href="/assets/HDVJuanAnavitate_2026.pdf" download className="btn-secondary justify-center py-3 text-sm">
              Descargar CV
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          </div>

          {/* Stats — horizontal divider strip */}
          <div className="w-full max-w-[300px] grid grid-cols-3 divide-x divide-white/8 border border-white/8 rounded-2xl overflow-hidden">
            {[
              { value: '1+', label: 'Año exp.' },
              { value: '1', label: 'Proyecto' },
              { value: '10+', label: 'Tecnologías' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center py-3 bg-white/3">
                <span className="text-lg font-bold gradient-text leading-none">{value}</span>
                <span className="text-[10px] text-white/35 mt-1 leading-none">{label}</span>
              </div>
            ))}
          </div>
        </div>

      ) : (
        /* ───────────── DESKTOP LAYOUT ───────────── */
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Disponible para proyectos
          </div>

          {/* Photo + Name */}
          <div className="flex flex-col items-center gap-4 mb-4 animate-slide-up">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-neon-cyan/50 shadow-neon-cyan">
              <img src="/assets/juan.png" alt="Juan José Anavitate Gómez" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-4 tracking-tight animate-slide-up">
            Hola, soy{' '}
            <span className="gradient-text text-glow-cyan">Juan Anavitate</span>
          </h1>

          {/* Typewriter role */}
          <div className="h-12 flex items-center justify-center mb-6">
            <p className="text-2xl sm:text-3xl font-medium text-white/70">
              <span className="text-neon-cyan">{displayed}</span>
              <span className="cursor-blink text-neon-cyan">|</span>
            </p>
          </div>

          {/* Tagline */}
          <p className="text-base sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed animate-fade-in">
            Ingeniero de Sistemas especializado en backend, QA y análisis de datos.
            <br />
            Construyo lógica sólida, sistemas confiables y soluciones que escalan.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <button onClick={scrollToProjects} className="btn-primary px-8 py-4 text-base shadow-neon-cyan">
              Ver proyectos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <a href="/assets/HDVJuanAnavitate_2026.pdf" download className="btn-secondary px-8 py-4 text-base">
              Descargar CV
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-20 grid grid-cols-3 gap-3 sm:gap-4 max-w-md sm:max-w-lg mx-auto">
            {[
              { value: '1+', label: 'Año de exp.' },
              { value: '1', label: 'Proyecto activo' },
              { value: '10+', label: 'Tecnologías' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/3 border border-white/8 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold gradient-text">{value}</div>
                <div className="text-xs text-white/40 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-neon-cyan/60" />
          </div>
        </div>
      )}
    </section>
  )
}
