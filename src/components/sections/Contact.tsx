'use client'

import { useState } from 'react'
import { Github, Instagram, Copy, Check, Send, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { profile } from '@/data/profile'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/animations/Reveal'
import { Button } from '@/components/ui/Button'
import { copyToClipboard } from '@/lib/utils'

export function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleCopy = async () => {
    const ok = await copyToClipboard(profile.email)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}
    if (!formState.name.trim()) newErrors.name = true
    if (!validateEmail(formState.email)) newErrors.email = true
    if (!formState.subject.trim()) newErrors.subject = true
    if (!formState.message.trim()) newErrors.message = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setFormStatus('error')
      return
    }

    setErrors({})
    console.log('Contact inquiry:', formState)
    setFormStatus('success')
    setFormState({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setFormStatus('idle'), 5000)
  }

  const updateField = (field: string, value: string) => {
    setFormState((s) => ({ ...s, [field]: value }))
    setErrors((e) => ({ ...e, [field]: false }))
    if (formStatus !== 'idle') setFormStatus('idle')
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          indicator={t.contact.indicator}
          heading={t.contact.heading}
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed font-normal">
                {t.contact.description}
              </p>
            </Reveal>

            {/* Direct Email Card with One-Click Copy */}
            <Reveal delay={0.1}>
              <div className="p-6 md:p-8 rounded-3xl border border-border bg-card hover:border-accent transition-all duration-300 shadow-lg">
                <span className="text-xs font-semibold tracking-wider text-accent uppercase block mb-2">
                  Alamat Email Langsung
                </span>
                <p className="font-heading text-lg sm:text-xl font-bold text-text-primary mb-4 break-all">
                  {profile.email}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors shadow-sm"
                  >
                    <span>Kirim Email</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-secondary border border-border text-xs font-medium text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-accent" />
                        <span className="text-accent font-semibold">{t.contact.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>{t.contact.copyEmail}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Social Channels */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Reveal delay={0.15}>
                <a
                  href="https://github.com/apin77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-5 rounded-2xl border border-border bg-card hover:border-accent hover:bg-card-hover transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Github size={20} className="text-text-secondary group-hover:text-accent transition-colors" />
                    <div>
                      <span className="text-xs font-semibold text-text-muted uppercase block">
                        GitHub
                      </span>
                      <span className="text-sm font-semibold text-text-primary group-hover:text-accent">
                        apin77
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-text-secondary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Reveal>

              <Reveal delay={0.2}>
                <a
                  href="https://instagram.com/aarstn_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-5 rounded-2xl border border-border bg-card hover:border-accent hover:bg-card-hover transition-all duration-200 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <Instagram size={20} className="text-text-secondary group-hover:text-accent transition-colors" />
                    <div>
                      <span className="text-xs font-semibold text-text-muted uppercase block">
                        Instagram
                      </span>
                      <span className="text-sm font-semibold text-text-primary group-hover:text-accent">
                        @aarstn_
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-text-secondary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <form
                onSubmit={handleSubmit}
                className="p-8 sm:p-10 rounded-3xl border border-border bg-card shadow-xl space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-text-secondary uppercase block mb-2">
                      {t.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Nama Anda"
                      className={`w-full rounded-2xl bg-secondary border ${
                        errors.name ? 'border-red-500' : 'border-border'
                      } px-4 py-3 text-text-primary text-sm focus:border-accent focus:outline-none transition-all placeholder:text-text-muted`}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-text-secondary uppercase block mb-2">
                      {t.contact.form.email} *
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="email@example.com"
                      className={`w-full rounded-2xl bg-secondary border ${
                        errors.email ? 'border-red-500' : 'border-border'
                      } px-4 py-3 text-text-primary text-sm focus:border-accent focus:outline-none transition-all placeholder:text-text-muted`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase block mb-2">
                    {t.contact.form.subject} *
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                    placeholder="Peluang kerja, kolaborasi, atau pertanyaan"
                    className={`w-full rounded-2xl bg-secondary border ${
                      errors.subject ? 'border-red-500' : 'border-border'
                    } px-4 py-3 text-text-primary text-sm focus:border-accent focus:outline-none transition-all placeholder:text-text-muted`}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-text-secondary uppercase block mb-2">
                    {t.contact.form.message} *
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Ceritakan tentang proyek, ide, atau tawaran Anda..."
                    className={`w-full rounded-2xl bg-secondary border ${
                      errors.message ? 'border-red-500' : 'border-border'
                    } px-4 py-3 text-text-primary text-sm focus:border-accent focus:outline-none transition-all resize-none placeholder:text-text-muted`}
                  />
                </div>

                {formStatus === 'success' && (
                  <p className="text-xs font-semibold text-accent bg-accent-soft border border-accent/25 p-3.5 rounded-xl">
                    ✓ {t.contact.form.success}
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl">
                    ⚠ {t.contact.form.error}
                  </p>
                )}

                <Button type="submit" className="w-full gap-2">
                  <Send size={14} />
                  <span>{t.contact.form.send}</span>
                </Button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
