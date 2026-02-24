import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  // Only run on devices with a precise pointer (mouse). Hides on touch / mobile.
  const [enabled] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  )

  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const dotPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return
    const cursor = cursorRef.current
    const dot = dotRef.current

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
    }

    let rafId
    const animate = () => {
      dotPosRef.current.x += (posRef.current.x - dotPosRef.current.x) * 0.12
      dotPosRef.current.y += (posRef.current.y - dotPosRef.current.y) * 0.12
      cursor.style.transform = `translate(${dotPosRef.current.x - 20}px, ${dotPosRef.current.y - 20}px)`
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    window.addEventListener('mousemove', onMove)

    const onEnter = () => cursor.classList.add('scale-150')
    const onLeave = () => cursor.classList.remove('scale-150')
    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-neon-cyan/60 pointer-events-none z-[9999] transition-transform duration-150 mix-blend-screen"
        style={{ willChange: 'transform' }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-neon-cyan pointer-events-none z-[9999]"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
