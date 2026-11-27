'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, ExternalLink, Trophy, Filter } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import { projects, type Project } from '@/data/projects'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SkillTag } from '@/components/ui/SkillTag'
import { Reveal } from '@/components/animations/Reveal'
import { cn } from '@/lib/utils'

const statusBadges: Record<
  string,
  { en: string; id: string; className: string }
> = {
  completed: {
    en: 'Research Completed',
    id: 'Penelitian Selesai',
    className: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/40 dark:border-blue-700/50 dark:text-blue-200 font-semibold',
  },
  'in-development': {
    en: 'In Development',
    id: 'Dalam Pengembangan',
    className: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/40 dark:border-amber-700/50 dark:text-amber-200 font-semibold',
  },
  experimental: {
    en: 'Learning & Experiments',
    id: 'Eksperimen & Pembelajaran',
    className: 'bg-sky-50 border-sky-200 text-sky-950 dark:bg-sky-950/40 dark:border-sky-700/50 dark:text-sky-200 font-semibold',
  },
}

export function Projects() {
  const { lang, t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeFilter, setActiveFilter] = useState<'all' | 'ml' | 'web' | 'data'>('all')

  const filterTabs = [
    {
      id: 'all',
      label: lang === 'id' ? 'Semua Karya' : 'All Works',
      count: projects.length,
    },
    {
      id: 'ml',
      label: 'Machine Learning',
      count: projects.filter((p) => p.category.includes('MACHINE LEARNING')).length,
    },
    {
      id: 'web',
      label: 'Web Development',
      count: projects.filter((p) => p.category.includes('WEB DEVELOPMENT')).length,
    },
    {
      id: 'data',
      label: 'Data & AI',
      count: projects.filter(
        (p) => p.category.includes('DATA') || p.category.includes('ARTIFICIAL INTELLIGENCE')
      ).length,
    },
  ] as const

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'ml') return p.category.includes('MACHINE LEARNING')
    if (activeFilter === 'web') return p.category.includes('WEB DEVELOPMENT')
    if (activeFilter === 'data') return p.category.includes('DATA') || p.category.includes('ARTIFICIAL INTELLIGENCE')
    return true
  })

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <SectionHeading
            indicator={t.projects.indicator}
            heading={t.projects.heading}
          />

          {/* Interactive Filter Navigation */}
          <div className="mb-8 md:mb-10 self-start lg:self-end max-w-full">
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-secondary/80 border border-border shadow-sm backdrop-blur-md max-w-full overflow-x-auto scrollbar-none">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={cn(
                      'relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 select-none cursor-pointer',
                      isActive
                        ? 'text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-secondary/60'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="project-filter-pill"
                        className="absolute inset-0 bg-accent rounded-full shadow-sm z-0"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                    <span
                      className={cn(
                        'relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors',
                        isActive
                          ? 'bg-white/25 text-white font-bold'
                          : 'bg-primary/60 text-text-muted font-medium'
                      )}
                    >
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Project Cards with AnimatePresence */}
        <motion.div layout className="space-y-8">
          <AnimatePresence>
            {filteredProjects.map((project, i) => {
              const status = statusBadges[project.status]
              const isFeatured = project.id === 'satusehat-sentiment'

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                >
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="group relative rounded-3xl border border-border bg-card hover:border-accent hover:bg-card-hover transition-all duration-300 cursor-pointer overflow-hidden shadow-lg p-6 sm:p-8 md:p-10"
                  >
                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                      {/* Thumbnail Mockup */}
                      <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden bg-secondary border border-border">
                        <Image
                          src={project.thumbnailUrl}
                          alt={project.title}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-102 transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 42vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Clean Index Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-xs font-medium text-white">
                          {i + 1} {/* Project */}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="lg:col-span-7 flex flex-col justify-between">
                        <div>
                          {/* Top Meta Tags */}
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="px-3 py-1 rounded-full text-xs font-medium border border-border bg-secondary text-text-secondary">
                              {project.category}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs border ${status.className}`}
                            >
                              {lang === 'id' ? status.id : status.en}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-200 text-balance">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-5 max-w-2xl font-normal text-balance">
                            {lang === 'id' ? project.description.id : project.description.en}
                          </p>

                          {/* Accuracy Benchmarks for Featured SATUSEHAT (Clean Editorial Metric Layout - No Nested Card) */}
                          {isFeatured && project.results && (
                            <div className="mb-5 py-3.5 border-y border-border/80">
                              <div className="flex items-center justify-between mb-2.5">
                                <span className="text-xs font-semibold text-accent uppercase flex items-center gap-1.5 tracking-wide">
                                  <Trophy size={14} /> Evaluasi Akurasi Model
                                </span>
                                <span className="text-xs font-semibold text-text-muted">
                                  SVM Unggul (90.74%)
                                </span>
                              </div>
                              <div className="space-y-2">
                                {project.results.map((r) => {
                                  const numVal = parseFloat(r.value)
                                  const isTop = r.label === 'SVM'
                                  return (
                                    <div key={r.label}>
                                      <div className="flex justify-between text-xs mb-1">
                                        <span className={isTop ? 'text-accent font-semibold' : 'text-text-secondary'}>
                                          {r.label}
                                        </span>
                                        <span className={isTop ? 'text-accent font-bold' : 'text-text-muted'}>
                                          {r.value}
                                        </span>
                                      </div>
                                      <div className="h-1.5 rounded-full bg-border overflow-hidden">
                                        <div
                                          className={`h-full rounded-full transition-all duration-700 ${
                                            isTop ? 'bg-accent' : 'bg-text-muted/40'
                                          }`}
                                          style={{ width: `${numVal}%` }}
                                        />
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}

                          {/* Tech tags */}
                          <div className="flex flex-wrap gap-2 mb-5">
                            {project.tech.map((techItem) => (
                              <span
                                key={techItem}
                                className="px-3 py-1 rounded-full text-xs font-medium text-text-secondary border border-border bg-secondary"
                              >
                                {techItem}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action trigger */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-text-secondary group-hover:text-accent transition-colors pt-3 border-t border-border">
                          <span>{t.projects.viewProject}</span>
                          <ArrowUpRight
                            size={15}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            lang={lang}
            t={t}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectModal({
  project,
  lang,
  t,
  onClose,
}: {
  project: Project
  lang: 'en' | 'id'
  t: any
  onClose: () => void
}) {
  const status = statusBadges[project.status]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border p-6 sm:p-8 md:p-10 shadow-2xl text-text-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-secondary border border-border text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Tutup jendela"
        >
          <X size={18} />
        </button>

        {/* Status + Category */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium border border-border bg-secondary text-text-secondary">
            {project.category}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs border ${status.className}`}
          >
            {lang === 'id' ? status.id : status.en}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-4">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-base leading-relaxed mb-6 font-normal">
          {lang === 'id' ? project.description.id : project.description.en}
        </p>

        {/* Results / Benchmarks if any */}
        {project.results && (
          <div className="mb-6 p-5 rounded-2xl bg-secondary border border-border">
            <h4 className="text-xs font-semibold text-accent uppercase mb-3 flex items-center gap-2">
              <Trophy size={15} /> {t.projects.results} &amp; Metrik Akurasi
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.results.map((r) => (
                <div
                  key={r.label}
                  className="p-3.5 rounded-xl border border-border bg-card text-center shadow-sm"
                >
                  <span className="block font-heading text-2xl font-bold text-accent mb-0.5">
                    {r.value}
                  </span>
                  <span className="text-xs text-text-secondary font-medium">
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlight Quote */}
        {project.highlight && (
          <div className="mb-6 p-4 rounded-2xl border-l-4 border-accent bg-accent-soft">
            <span className="text-xs font-semibold text-accent uppercase block mb-1">
              {t.projects.highlight}
            </span>
            <p className="text-sm text-text-primary italic">
              &ldquo;{lang === 'id' ? project.highlight.id : project.highlight.en}&rdquo;
            </p>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-text-secondary uppercase mb-3">
            {t.projects.techStack}
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <SkillTag key={tech} label={tech} />
            ))}
          </div>
        </div>

        {/* GitHub link */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors"
          >
            <span>Lihat Repositori di GitHub</span>
            <ExternalLink size={14} />
          </a>
        )}
      </motion.div>
    </motion.div>
  )
}
