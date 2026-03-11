import { useState } from 'react'
import { Link } from 'react-router-dom'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

const links = [
  { icon: 'email', label: 'Email', value: 'juan@anavita.dev', href: 'mailto:juan@anavita.dev' },
  { icon: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/juananavitate', href: 'https://linkedin.com/in/juananavitate' },
  { icon: 'github', label: 'GitHub', value: 'github.com/JuanAnavitate', href: 'https://github.com/JuanAnavitate' },
]

function IconEmail() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  )
}
function IconLinkedin() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
function IconGithub() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

const iconMap = { email: <IconEmail />, linkedin: <IconLinkedin />, github: <IconGithub /> }

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'El nombre es requerido'
    if (!form.email.trim()) e.email = 'El email es requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (!form.subject.trim()) e.subject = 'El asunto es requerido'
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'El mensaje debe tener al menos 10 caracteres'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      const res = await fetch(`${BACKEND}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('server error')
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((errs) => ({ ...errs, [name]: undefined }))
  }

  return (
    <main className="min-h-screen bg-surface-base pt-24 pb-24">
      <div className="page-container">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-brand-cyan transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Volver al portafolio
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span className="section-eyebrow">Contacto</span>
          <h1 className="section-heading">
            Hablemos <span className="text-brand-cyan">directamente</span>
          </h1>
          <p className="section-sub mt-3">Respondo en menos de 24 horas.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="pill-green">Disponible</span>
              <span className="text-sm text-ink-tertiary">para nuevas oportunidades</span>
            </div>
            {links.map(({ icon, label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-link group">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-ink-secondary group-hover:text-brand-cyan transition-colors flex-shrink-0">
                  {iconMap[icon]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-ink-tertiary uppercase tracking-widest">{label}</div>
                  <div className="text-sm font-medium text-ink-primary truncate">{value}</div>
                </div>
                <svg className="w-4 h-4 text-ink-tertiary group-hover:text-brand-cyan transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3 card card-accent-cyan p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-green-light flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-ink-primary">¡Mensaje enviado!</h2>
                <p className="text-ink-secondary">Te responderé pronto. Gracias por escribir.</p>
                <button onClick={() => setStatus('idle')} className="btn btn-outline">Enviar otro mensaje</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="form-label">Nombre *</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange}
                      placeholder="Tu nombre" className={`form-input ${errors.name ? 'form-input-error' : ''}`} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="tu@email.com" className={`form-input ${errors.email ? 'form-input-error' : ''}`} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="form-label">Asunto *</label>
                  <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange}
                    placeholder="¿De qué se trata?" className={`form-input ${errors.subject ? 'form-input-error' : ''}`} />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="form-label">Mensaje *</label>
                  <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange}
                    placeholder="Cuéntame sobre tu proyecto o propuesta..."
                    className={`form-input resize-none ${errors.message ? 'form-input-error' : ''}`} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                {status === 'error' && (
                  <p className="text-red-500 text-sm bg-brand-red-light px-4 py-3 rounded-xl">
                    Ocurrió un error al enviar. Inténtalo de nuevo o escríbeme directamente.
                  </p>
                )}
                <button type="submit" disabled={status === 'loading'} className="btn btn-primary self-start">
                  {status === 'loading' ? 'Enviando' : 'Enviar mensaje '}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
