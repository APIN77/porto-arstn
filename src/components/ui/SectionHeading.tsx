'use client'

import { Reveal } from '@/components/animations/Reveal'

export function SectionHeading({
  indicator,
  heading,
  subtitle,
}: {
  indicator: string
  heading: string
  subtitle?: string
}) {
  return (
    <div className="mb-8 md:mb-10">
      <Reveal>
        <span className="inline-block text-xs font-semibold tracking-wider text-accent uppercase mb-3">
          {indicator}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary whitespace-pre-line leading-[1.15] tracking-tight mb-3">
          {heading}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mt-3 text-text-secondary text-base md:text-lg max-w-2xl leading-relaxed text-balance">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
