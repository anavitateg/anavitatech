import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            if (!options.repeat) observer.unobserve(entry.target)
          } else if (options.repeat) {
            entry.target.classList.remove('visible')
          }
        })
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    )

    const elements = options.children
      ? el.querySelectorAll('.reveal')
      : [el]

    elements.forEach((child) => observer.observe(child))
    return () => observer.disconnect()
  }, [])

  return ref
}

export function useRevealAll(selector = '.reveal', options = {}) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options }
    )

    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [selector])
}
