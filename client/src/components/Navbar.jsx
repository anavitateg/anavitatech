import { useState } from 'react'

export default function Navbar({ currentSection, goToSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggleDark = () => {
    const next = !dark
    if (next) { document.documentElement.classList.add('dark'); localStorage.setItem('theme', 'dark') }
    else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light') }
    setDark(next)
  }

  const navigate = (idx) => { goToSection(idx); setMenuOpen(false) }

  return (
    <>
      {/* ── MOBILE HEADER ───────────────────────────────── */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 h-14 bg-slate-950 dark:bg-slate-900 shadow-xl transition-colors duration-300">
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menú"
          className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] flex-shrink-0"
        >
          <span className={`block w-5 h-0.5 bg-white origin-center transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white origin-center transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>

        {/* Logo center */}
        <button onClick={() => navigate(0)} className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center text-white text-xs font-black">JJ</span>
          <span className="text-sm font-bold tracking-tight text-white">Anavita<span className="text-sky-400">TECH</span></span>
        </button>

        {/* Theme toggle right */}
        <button
          onClick={toggleDark}
          aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
            dark ? 'bg-white text-yellow-400' : 'bg-slate-800 text-yellow-300 border border-slate-700'
          }`}
        >
          {dark ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm10-7a1 1 0 110 2h-1a1 1 0 110-2h1zM3 11a1 1 0 110 2H2a1 1 0 110-2h1zm15.07-6.07a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM7.05 16.95a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zm11.314 0a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM5.636 5.636a1 1 0 011.414 1.414l-.707.707A1 1 0 014.93 6.343l.707-.707zM12 6a6 6 0 110 12A6 6 0 0112 6z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </header>

      {/* ── MOBILE DROPDOWN ─────────────────────────────── */}
      {menuOpen && (
        <div className="lg:hidden fixed top-14 inset-x-0 z-40 bg-slate-950 dark:bg-slate-900 border-t border-slate-800 dark:border-slate-700 shadow-2xl transition-colors duration-300">
          {/* Brand row */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-800 dark:border-slate-700">
            <span className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white text-sm font-black">JJ</span>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Anavita<span className="text-sky-400">TECH</span></p>
              <p className="text-white/40 text-xs">Portafolio de Juan Anavitate</p>
            </div>
          </div>
          {/* Links */}
          <div className="flex flex-col py-2">
            {[
              { label: 'Inicio', idx: 0 },
              { label: 'Sobre mí', idx: 1 },
              { label: 'Proyectos', idx: 2 },
              { label: 'Contacto', idx: 3 },
            ].map(({ label, idx }) => (
              <button
                key={label}
                onClick={() => navigate(idx)}
                className={`px-6 py-3.5 text-left text-sm font-semibold transition-colors ${
                  currentSection === idx
                    ? 'text-sky-400 bg-sky-500/10'
                    : 'text-white/70 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Backdrop */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
      )}

      {/* ── DESKTOP HEADER ──────────────────────────────── */}
      <header className="hidden lg:flex fixed top-0 inset-x-0 z-50 justify-center pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-6 bg-slate-950 dark:bg-slate-800 rounded-b-2xl px-6 h-12 shadow-xl w-fit transition-colors duration-300">
          <button
            onClick={() => goToSection(2)}
            className={`text-sm font-semibold transition-colors duration-200 ${
              currentSection === 2 ? 'text-sky-400' : 'text-white/60 hover:text-white'
            }`}
          >
            Proyectos
          </button>
          <button onClick={() => goToSection(0)} className="flex items-center gap-2 group">
            <span className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center text-white text-xs font-black group-hover:bg-sky-400 transition-colors">JJ</span>
            <span className="text-sm font-bold tracking-tight text-white">Anavita<span className="text-sky-400">TECH</span></span>
          </button>
          <button
            onClick={() => goToSection(1)}
            className={`text-sm font-semibold transition-colors duration-200 ${
              currentSection === 1 ? 'text-sky-400' : 'text-white/60 hover:text-white'
            }`}
          >
            Sobre mí
          </button>
        </nav>
      </header>
    </>
  )
}
