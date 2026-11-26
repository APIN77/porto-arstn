'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, MapPin, Sparkles, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import { scrollToSection } from '@/lib/utils'
import { profile } from '@/data/profile'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const { t } = useLanguage()
  const prefersReduced = useReducedMotion()

  const anim = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 md:pt-36">
      {/* Soft, calm ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.05] blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full my-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Main Editorial Text */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Top Badge Pill */}
            <motion.div {...anim(0.05)} className="mb-6 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-text-secondary">
                <Sparkles size={13} className="text-accent" />
                <span>{t.hero.greeting}</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-soft border border-accent/25 text-xs font-semibold text-accent">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>{t.hero.status}</span>
              </span>
            </motion.div>

            {/* Giant Typographic Headline */}
            <div className="mb-6 space-y-0 select-none">
              {t.hero.name.map((line, i) => (
                <motion.h1
                  key={i}
                  {...anim(0.12 + i * 0.08)}
                  className="font-heading text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-extrabold tracking-tight text-text-primary leading-[0.94]"
                >
                  {line}
                </motion.h1>
              ))}
            </div>

            {/* Sub-headline with text-balance to avoid stragglers */}
            <motion.p
              {...anim(0.35)}
              className="text-xs sm:text-sm tracking-wider text-accent font-semibold uppercase mb-6 max-w-xl text-balance"
            >
              {t.hero.headline}
            </motion.p>

            {/* Bio statement */}
            <motion.p
              {...anim(0.45)}
              className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-normal"
            >
              {t.hero.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...anim(0.55)} className="flex flex-wrap items-center gap-4 mb-10">
              <Button onClick={() => scrollToSection('projects')} className="gap-2">
                <span>{t.hero.cta.explore}</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
              <Button variant="secondary" onClick={() => scrollToSection('contact')}>
                {t.hero.cta.connect}
              </Button>
            </motion.div>

            {/* Metadata row with high contrast */}
            <motion.div
              {...anim(0.65)}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-border text-xs text-text-secondary font-medium"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-accent" />
                {t.hero.location}
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap size={15} className="text-accent" />
                Universitas Stikubank Semarang
              </span>
              <span className="text-text-muted">
                Informatics Engineering
              </span>
            </motion.div>
          </div>

          {/* Right Portrait Card (Clean, Authentic Editorial) */}
          <motion.div
            {...anim(0.25)}
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative group w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
              {/* Main Card Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-xl p-3">
                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
                  <Image
                    src={profile.profileImage}
                    alt={profile.fullName}
                    fill
                    unoptimized
                    className="object-cover object-top group-hover:scale-102 transition-transform duration-500"
                    priority
                    sizes="(max-width: 768px) 340px, (max-width: 1024px) 380px, 420px"
                  />

                  {/* Gentle gradient overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Bottom portrait pill */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/15">
                    <p className="font-heading text-sm font-bold text-white tracking-wide">
                      ALFIAN ARISTON NOOR
                    </p>
                    <p className="text-xs text-white/90 font-normal mt-0.5">
                      Informatics Graduate · Aspiring AI Specialist & Data Analyst
                    </p>
                  </div>
                </div>

                {/* Card footer detail */}
                <div className="flex items-center justify-between px-3 pt-3 pb-1 text-xs text-text-secondary font-medium">
                  <span>Semarang, Jawa Tengah</span>
                  <span className="text-accent font-semibold">Portofolio 2026</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...anim(0.75)}
        className="w-full flex justify-center py-6 cursor-pointer"
        onClick={() => scrollToSection('about')}
      >
        <div className="flex flex-col items-center gap-2 group">
          <span className="text-xs font-medium tracking-widest text-text-secondary uppercase group-hover:text-accent transition-colors">
            Scroll To Explore
          </span>
          <motion.div
            animate={prefersReduced ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-text-secondary group-hover:text-accent transition-colors" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
