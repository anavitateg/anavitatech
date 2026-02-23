import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-dark-600">
      <div
        className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-blue transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
