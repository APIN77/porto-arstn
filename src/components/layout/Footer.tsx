'use client'

import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { scrollToSection } from '@/lib/utils'

const footerNavIds = ['home', 'about', 'expertise', 'projects', 'contact'] as const

export function Footer() {
  const { t } = useLanguage()
  const footerLabels = [
    t.nav.home,
    t.nav.about,
    t.nav.expertise,
    t.nav.projects,
    t.nav.contact,
  ]

  return (
    <footer className="border-t border-border bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Top: Clean Typographic Sign-off */}
        <div className="border-b border-border pb-10 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-semibold tracking-wider text-accent uppercase block mb-2">
                Portofolio Digital
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
                ALFIAN ARISTON NOOR
              </h2>
            </div>
            <p className="text-text-secondary text-sm max-w-sm leading-relaxed font-normal">
              {t.footer.tagline}
            </p>
          </div>
        </div>

        {/* Middle Columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mb-12">
          <div className="col-span-2 md:col-span-6">
            <span className="text-xs font-semibold text-text-muted uppercase block mb-3">
              Tentang Alfian
            </span>
            <p className="text-xs text-text-secondary leading-relaxed max-w-sm font-normal">
              Lulusan S1 Teknik Informatika dari Universitas Stikubank Semarang. Menaruh minat pada implementasi Artificial Intelligence, Machine Learning, dan arsitektur web modern.
            </p>
            
          </div>

          <div className="col-span-1 md:col-span-3">
            <span className="text-xs font-semibold text-text-muted uppercase block mb-3">
              Navigasi
            </span>
            <ul className="space-y-2 text-xs">
              {footerNavIds.map((id, i) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className="text-text-secondary hover:text-accent transition-colors font-medium"
                  >
                    {footerLabels[i]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <span className="text-xs font-semibold text-text-muted uppercase block mb-3">
              Sosial Media
            </span>
            <div className="space-y-2 text-xs font-medium">
              <div>
                <a
                  href="https://github.com/apin77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-text-secondary hover:text-accent transition-colors"
                >
                  GitHub <ArrowUpRight size={12} />
                </a>
              </div>
              <div>
                <a
                  href="https://instagram.com/aarstn_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-text-secondary hover:text-accent transition-colors"
                >
                  Instagram <ArrowUpRight size={12} />
                </a>
              </div>
              <div>
                <a
                  href="mailto:aariston027@gmail.com"
                  className="inline-flex items-center gap-1 text-text-secondary hover:text-accent transition-colors"
                >
                  Email <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p className="font-normal">
            {t.footer.copyright}
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary text-text-secondary hover:text-accent hover:border-accent transition-all text-xs font-medium"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  )
}
