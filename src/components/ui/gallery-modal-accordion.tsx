'use client'

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Expand,
  ShieldCheck,
  X,
} from 'lucide-react'
import { certificates } from '@/data/certificates'
import { cn } from '@/lib/utils'

export interface GalleryAccordionItem {
  id: string | number
  url: string
  title: string
  description: string
  tags: string[]
  issuer?: string
  date?: string
  credentialId?: string
}

export const itemsArr: GalleryAccordionItem[] = certificates.map((cert) => ({
  id: cert.id,
  url: cert.url,
  title: cert.title.en,
  description: cert.description.en,
  tags: cert.tags,
  issuer: cert.issuer,
  date: cert.date.en,
  credentialId: cert.credentialId,
}))

interface GalleryProps {
  items: GalleryAccordionItem[]
  setIndex: (index: number) => void
  setOpen: (open: boolean) => void
  index: number
  inspectLabel: string
}

function Gallery({ items, setIndex, setOpen, index, inspectLabel }: GalleryProps) {
  return (
    <div className="w-full flex flex-col md:flex-row gap-3 md:h-[380px] lg:h-[410px]">
      {items.map((item, i) => {
        const isActive = index === i

        return (
          <motion.button
            type="button"
            key={item.id}
            onMouseEnter={() => setIndex(i)}
            onFocus={() => setIndex(i)}
            onClick={() => {
              setIndex(i)
              setOpen(true)
            }}
            whileTap={{ scale: 0.99 }}
            aria-label={item.title}
            className={cn(
              'group relative overflow-hidden rounded-2xl border text-left transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              isActive
                ? 'h-[260px] md:h-full md:flex-[3.4] border-accent/60 bg-secondary shadow-xl shadow-accent/10'
                : 'h-[72px] md:h-full md:flex-1 border-border bg-secondary/70 hover:border-accent/40'
            )}
          >
            {/* Certificate Preview Image */}
            <div className="absolute inset-0 w-full h-full bg-secondary">
              <Image
                src={item.url}
                alt={item.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className={cn(
                  'object-cover object-top transition-all duration-500',
                  isActive
                    ? 'scale-100 opacity-100'
                    : 'scale-105 opacity-45 grayscale-[30%] group-hover:opacity-70 group-hover:grayscale-0'
                )}
              />
            </div>

            {/* Subtle Surface Gradient for Readability */}
            <div
              className={cn(
                'absolute inset-0 transition-opacity duration-300',
                isActive
                  ? 'bg-gradient-to-t from-black/85 via-black/25 to-black/10'
                  : 'bg-gradient-to-t from-black/80 via-black/45 to-black/30'
              )}
            />

            {/* Top Index & Expand Hint */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
              <span
                className={cn(
                  'inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold backdrop-blur-md border transition-colors',
                  isActive
                    ? 'bg-accent text-white border-accent/40'
                    : 'bg-black/60 text-white/85 border-white/15'
                )}
              >
                0{i + 1}
              </span>

              {isActive && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/65 text-white border border-white/15 backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
                  <Expand size={12} />
                  <span className="hidden sm:inline">{inspectLabel}</span>
                </span>
              )}
            </div>

            {/* Active Bottom Details Overlay */}
            {isActive ? (
              <div className="absolute bottom-3 left-3 right-3 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 z-10">
                {item.issuer && (
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-wider text-blue-300 uppercase mb-1">
                    <span>{item.issuer}</span>
                    {item.date && (
                      <>
                        <span className="text-white/40">•</span>
                        <span className="text-white/75 font-medium">{item.date}</span>
                      </>
                    )}
                  </div>
                )}
                <h4 className="font-heading text-base sm:text-lg font-bold text-white leading-snug line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-white/75 mt-1 line-clamp-2 hidden sm:block">
                  {item.description}
                </p>
              </div>
            ) : (
              /* Inactive Label (Horizontal on mobile, vertical/compact on desktop) */
              <div className="absolute inset-x-3 bottom-3 md:inset-x-2 md:bottom-4 z-10 flex items-center md:justify-center">
                <span className="text-xs font-semibold text-white/90 truncate md:hidden pl-10">
                  {item.title}
                </span>
                <span className="hidden md:block text-[11px] font-semibold tracking-wide text-white/85 truncate max-w-full px-1.5 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/10">
                  {item.issuer?.split('·')[0].trim() || item.title}
                </span>
              </div>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

export interface AccordionModalProps {
  items?: GalleryAccordionItem[]
  lang?: 'en' | 'id'
  className?: string
}

export function GalleryModalAccordion({
  items = itemsArr,
  lang = 'en',
  className,
}: AccordionModalProps) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)

  const safeIndex = index >= 0 && index < items.length ? index : 0
  const activeItem = items[safeIndex]

  const inspectLabel = lang === 'id' ? 'Perbesar' : 'Inspect'
  const closeLabel = lang === 'id' ? 'Tutup' : 'Close'
  const verifiedLabel = lang === 'id' ? 'Kredensial Terverifikasi' : 'Verified Credential'

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      } else if (open && event.key === 'ArrowRight') {
        setIndex((prev) => (prev + 1) % items.length)
      } else if (open && event.key === 'ArrowLeft') {
        setIndex((prev) => (prev - 1 + items.length) % items.length)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('overflow-hidden')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, items.length])

  if (!activeItem) return null

  return (
    <div className={cn('relative w-full', className)}>
      <Gallery
        items={items}
        index={safeIndex}
        setIndex={setIndex}
        setOpen={setOpen}
        inspectLabel={inspectLabel}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="certificate-modal-overlay"
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-3xl border border-border bg-card shadow-2xl overflow-hidden my-auto"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-border bg-secondary/60">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-accent-soft border border-accent/25 flex items-center justify-center text-accent shrink-0">
                    <Award size={16} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold tracking-wider text-accent uppercase block">
                      {activeItem.issuer || verifiedLabel}
                    </span>
                    <h3 className="font-heading text-sm sm:text-base font-bold text-text-primary truncate">
                      {activeItem.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="hidden sm:flex items-center gap-1 mr-1">
                    <button
                      type="button"
                      onClick={() => setIndex((prev) => (prev - 1 + items.length) % items.length)}
                      className="p-2 rounded-full border border-border bg-card text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
                      aria-label="Previous certificate"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs font-mono text-text-muted px-2">
                      {safeIndex + 1} / {items.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIndex((prev) => (prev + 1) % items.length)}
                      className="p-2 rounded-full border border-border bg-card text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
                      aria-label="Next certificate"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-full border border-border bg-card text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
                    aria-label={closeLabel}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Full Uncropped Certificate View */}
              <div className="relative bg-secondary/40 p-4 sm:p-6 flex items-center justify-center">
                <div className="relative w-full h-[50vh] sm:h-[58vh] rounded-2xl overflow-hidden border border-border bg-white shadow-inner">
                  <Image
                    src={activeItem.url}
                    alt={activeItem.title}
                    fill
                    unoptimized
                    className="object-contain p-2"
                    sizes="(max-width: 1024px) 100vw, 900px"
                  />
                </div>
              </div>

              {/* Certificate Metadata Footer */}
              <div className="px-5 sm:px-6 py-4 sm:py-5 border-t border-border bg-card space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-text-muted">
                  <div className="flex flex-wrap items-center gap-3">
                    {activeItem.date && (
                      <span className="inline-flex items-center gap-1.5 text-text-secondary font-medium">
                        <Calendar size={13} className="text-accent" />
                        {activeItem.date}
                      </span>
                    )}
                    {activeItem.credentialId && (
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-secondary border border-border text-text-secondary">
                        <ShieldCheck size={12} className="text-accent" />
                        {activeItem.credentialId}
                      </span>
                    )}
                  </div>

                  {/* Mobile Prev/Next controls */}
                  <div className="flex sm:hidden items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setIndex((prev) => (prev - 1 + items.length) % items.length)}
                      className="p-1.5 rounded-full border border-border bg-secondary text-text-secondary"
                      aria-label="Previous certificate"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-[11px] font-mono text-text-muted px-1">
                      {safeIndex + 1}/{items.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIndex((prev) => (prev + 1) % items.length)}
                      className="p-1.5 rounded-full border border-border bg-secondary text-text-secondary"
                      aria-label="Next certificate"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed">
                  {activeItem.description}
                </p>

                {activeItem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-border bg-secondary text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GalleryModalAccordion
