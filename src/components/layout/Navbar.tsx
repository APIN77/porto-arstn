'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { scrollToSection, cn } from '@/lib/utils'

const navIds = ['home', 'about', 'expertise', 'projects', 'contact'] as const

export function Navbar() {
  const { t } = useLanguage()
  const [showNavbar, setShowNavbar] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const onScroll = () => {
      const aboutEl = document.getElementById('about')
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect()
        // Only show when user has scrolled down into or past the About section
        setShowNavbar(rect.top <= 220)
      } else {
        setShowNavbar(window.scrollY > window.innerHeight * 0.75)
      }

      const sections = navIds.map((id) => {
        const el = document.getElementById(id)
        if (!el) return { id, top: Infinity }
        const rect = el.getBoundingClientRect()
        return { id, top: Math.abs(rect.top) }
      })
      sections.sort((a, b) => a.top - b.top)
      if (sections[0]) setActiveSection(sections[0].id)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLabels = [
    t.nav.home,
    t.nav.about,
    t.nav.expertise,
    t.nav.projects,
    t.nav.contact,
  ]

  const handleNav = (id: string) => {
    scrollToSection(id)
    setMobileOpen(false)
  }

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.header
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          <nav
            className={cn(
              'pointer-events-auto flex items-center justify-between w-full max-w-5xl px-4 md:px-6 py-2.5 rounded-full border transition-all duration-300',
              'bg-card/90 border-border backdrop-blur-xl shadow-xl'
            )}
          >
            {/* Brand Logo */}
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-1.5 font-heading text-sm md:text-base font-extrabold text-text-primary tracking-tight hover:text-accent transition-colors pl-1"
            >
              <span>ARSTN</span>
              <span className="text-accent text-xs">®</span>
            </button>

            {/* Desktop Links with Active Spring Pill */}
            <div className="hidden md:flex items-center gap-1 bg-secondary/80 p-1 rounded-full border border-border">
              {navIds.map((id, i) => {
                const isActive = activeSection === id
                return (
                  <button
                    key={id}
                    onClick={() => handleNav(id)}
                    className={cn(
                      'relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200',
                      isActive
                        ? 'bg-accent text-white shadow-sm'
                        : 'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="unified-nav-pill"
                        className="absolute inset-0 bg-accent rounded-full z-0 shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{navLabels[i]}</span>
                  </button>
                )
              })}
            </div>

            {/* Right Controls: Availability Badge */}
            <div className="flex items-center gap-2">
              {/* Availability Pill */}
              <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-medium text-text-secondary">
                  {t.nav.availability}
                </span>
              </div>

              {/* Mobile hamburger menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-text-secondary hover:text-text-primary md:hidden"
                aria-label="Buka menu navigasi"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="pointer-events-auto fixed inset-x-4 top-20 z-40 rounded-3xl bg-card border border-border backdrop-blur-2xl p-6 shadow-2xl md:hidden"
              >
                <div className="flex flex-col gap-2">
                  {navIds.map((id, i) => (
                    <button
                      key={id}
                      onClick={() => handleNav(id)}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-xl font-heading text-base font-semibold text-left transition-colors',
                        activeSection === id
                          ? 'bg-accent text-white'
                          : 'text-text-secondary hover:bg-secondary hover:text-text-primary'
                      )}
                    >
                      <span>{navLabels[i]}</span>
                      <span className="text-xs opacity-70 font-normal">0{i + 1}</span>
                    </button>
                  ))}

                  <div className="pt-4 mt-2 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-xs font-medium text-text-secondary">
                        {t.nav.availability}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
