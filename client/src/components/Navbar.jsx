import { useState, useEffect } from 'react'

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      const sections = ['hero', 'projects', 'about', 'contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActive(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-900/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#hero')}
          className="text-lg font-bold tracking-tight gradient-text"
        >
          <span className="text-lg font-bold tracking-tight"><span className="gradient-text">Anavita</span><span className="text-white">TECH</span></span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  active === href.replace('#', '')
                    ? 'text-neon-cyan'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-300 ${
                    active === href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex">
          <button onClick={() => scrollTo('#contact')} className="btn-primary text-sm">
            Hablemos
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="bg-dark-800/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex flex-col gap-4">
          {links.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="text-white/70 hover:text-neon-cyan transition-colors text-left font-medium"
            >
              {label}
            </button>
          ))}
          <button onClick={() => scrollTo('#contact')} className="btn-primary mt-2 w-full justify-center">
            Hablemos
          </button>
        </div>
      </div>
    </header>
  )
}
