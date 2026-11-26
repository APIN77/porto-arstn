'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import BunkumWordmarkHero from '@/components/ui/bunkum-wordmark-hero'
import { Marquee } from '@/components/ui/Marquee'
import { About } from '@/components/sections/About'
import { Expertise } from '@/components/sections/Expertise'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  const { lang, t } = useLanguage()

  const heroLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.expertise, href: '#expertise' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.contact, href: '#contact' },
  ]

  const heroCopy =
    lang === 'id'
      ? 'Alfian Ariston Noor — Sarjana Teknik Informatika Universitas Stikubank Semarang. Menjelajahi Artificial Intelligence, Machine Learning, dan rekayasa web modern.'
      : 'Alfian Ariston Noor — Informatics Engineering Graduate from Universitas Stikubank Semarang. Exploring Artificial Intelligence, Machine Learning, and modern web engineering.'

  return (
    <div className="bg-primary text-text-primary min-h-screen selection:bg-accent selection:text-white transition-colors duration-250">
      <Navbar />
      <main>
        <section id="home">
          <BunkumWordmarkHero
            brand="ARSTN"
            year="2026"
            brandHref="#home"
            links={heroLinks}
            copy={heroCopy}
          />
        </section>
        <Marquee />
        <About />
        <Expertise />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
