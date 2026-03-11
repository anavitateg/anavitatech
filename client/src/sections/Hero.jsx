const roles = ['Desarrollador Backend', 'Ingeniero de Sistemas', 'QA Engineer', 'Analista de Datos']

const stats = [
  { value: '1+',  label: 'Año de experiencia', color: 'text-brand-cyan',   bg: 'bg-brand-cyan/10 border-brand-cyan/20' },
  { value: '1',   label: 'Proyecto activo',    color: 'text-brand-yellow', bg: 'bg-brand-yellow/10 border-brand-yellow/20' },
  { value: '10+', label: 'Tecnologías',        color: 'text-brand-green',  bg: 'bg-brand-green/10 border-brand-green/20' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-grid-pattern overflow-hidden py-16 px-4 sm:px-6">

      {/* Decorative background blobs */}
      <div className="absolute top-16 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 right-1/4 w-80 h-80 bg-brand-yellow/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-56 h-56 bg-brand-green/8 rounded-full blur-3xl pointer-events-none" />

      {/* ── Main profile card ── */}
      <div className="relative w-full max-w-5xl bg-white/85 backdrop-blur-md border border-slate-200/70 rounded-3xl shadow-2xl shadow-slate-300/40 overflow-hidden">

        <div className="flex flex-col lg:flex-row">

          {/* ── Left: photo panel ── */}
          <div className="lg:w-[38%] flex-shrink-0 relative flex flex-col items-center justify-end
                          bg-gradient-to-b from-slate-100 to-slate-50
                          pt-12 pb-0 overflow-hidden min-h-[300px] lg:min-h-0">

            {/* Soft rings behind photo */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-52 h-52 rounded-full border-2 border-brand-cyan/25" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full border border-brand-cyan/15" />

            {/* Floating badge — top-right corner */}
            <div className="absolute top-5 right-5 z-10">
              <span className="ai-badge text-xs shadow-sm">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a1 1 0 011 1v1.07A8.001 8.001 0 0119.93 11H21a1 1 0 010 2h-1.07A8.001 8.001 0 0113 19.93V21a1 1 0 01-2 0v-1.07A8.001 8.001 0 014.07 13H3a1 1 0 010-2h1.07A8.001 8.001 0 0111 4.07V3a1 1 0 011-1zm0 4a6 6 0 100 12A6 6 0 0012 6zm0 2a4 4 0 110 8 4 4 0 010-8z"/>
                </svg>
                IA &amp; Sistemas
              </span>
            </div>

            {/* Portrait photo — sits flush at the bottom of the panel */}
            <img
              src="/assets/juan.jpg"
              alt="Juan José Anavitate Gómez"
              className="relative z-0 w-52 rounded-t-2xl object-cover object-top"
              style={{ maxHeight: '300px' }}
            />

            {/* Availability pill — overlaid at the bottom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
              <div className="inline-flex items-center gap-2 pill-green text-xs shadow-md">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                Disponible para proyectos
              </div>
            </div>
          </div>

          {/* ── Right: content panel ── */}
          <div className="flex-1 px-8 sm:px-10 lg:px-12 py-10 flex flex-col justify-center gap-5">

            {/* Greeting + name */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-cyan mb-1">
                Hola 👋, soy
              </p>
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight text-ink-primary leading-tight">
                Juan Anavitate
              </h1>
              <div className="flex items-center gap-1.5 mt-2 text-ink-tertiary text-sm">
                <svg className="w-3.5 h-3.5 text-brand-red flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Villavicencio, Colombia
              </div>
            </div>

            {/* Bio */}
            <p className="text-ink-secondary text-base leading-relaxed">
              Ingeniero de Sistemas especializado en backend y arquitecturas limpias.
              Construyo sistemas confiables, escalables y orientados a datos.
            </p>

            {/* Role pills */}
            <div className="flex flex-wrap gap-2">
              {roles.map((r) => (
                <span key={r} className="pill-gray">{r}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary"
              >
                Ver proyectos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <a href="/assets/HDVJuanAnavitate_2026.pdf" download className="btn btn-secondary">
                Descargar CV
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </a>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map(({ value, label, color, bg }) => (
                <div key={label} className={`rounded-2xl border px-3 py-3 text-center ${bg}`}>
                  <div className={`text-2xl font-bold leading-none ${color}`}>{value}</div>
                  <div className="text-ink-tertiary text-xs mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
