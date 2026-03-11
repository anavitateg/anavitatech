import { useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  const toggle = () => {
    const next = !dark
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    setDark(next)
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className={`
        hidden lg:flex
        fixed top-3 right-4 z-[60]
        w-10 h-10 rounded-full shadow-lg
        items-center justify-center
        transition-all duration-300 hover:scale-110 active:scale-95
        ${dark
          ? 'bg-white text-yellow-400 shadow-white/20'
          : 'bg-slate-950 text-yellow-300 shadow-slate-900/30'
        }
      `}
    >
      {dark ? (
        /* Sol — en dark mode para cambiar a light */
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm10-7a1 1 0 110 2h-1a1 1 0 110-2h1zM3 11a1 1 0 110 2H2a1 1 0 110-2h1zm15.07-6.07a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM7.05 16.95a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zm11.314 0a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM5.636 5.636a1 1 0 011.414 1.414l-.707.707A1 1 0 014.93 6.343l.707-.707zM12 6a6 6 0 110 12A6 6 0 0112 6z"/>
        </svg>
      ) : (
        /* Luna — en light mode para cambiar a dark */
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}
