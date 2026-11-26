'use client'

import { Brain, Code2, BarChart3, Wrench } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SkillTag } from '@/components/ui/SkillTag'
import { Reveal } from '@/components/animations/Reveal'

const icons = [Brain, Code2, BarChart3, Wrench]
const highlights = [
  'Machine Learning & Generative AI',
  'Arsitektur Web Modern',
  'Pengolahan & Visualisasi Data',
  'Tools & Lingkungan Pengembangan',
]

export function Expertise() {
  const { t } = useLanguage()

  return (
    <section id="expertise" className="py-20 md:py-32 relative overflow-hidden bg-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          indicator={t.expertise.indicator}
          heading={t.expertise.heading}
        />

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {t.expertise.cards.map((card, i) => {
            const Icon = icons[i]

            return (
              <Reveal key={card.title} delay={i * 0.1}>
                <div className="group relative h-full rounded-3xl border border-border bg-card p-8 md:p-10 hover:border-accent hover:bg-card-hover transition-all duration-300 shadow-md flex flex-col justify-between">
                  <div>
                    {/* Top Row: Index + Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-accent tracking-wider">
                          0{i + 1}
                        </span>
                        <span className="text-text-muted text-xs font-medium">/ 04</span>
                      </div>
                      <div className="w-11 h-11 rounded-2xl bg-secondary border border-border flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:border-accent group-hover:bg-accent-soft transition-all duration-200">
                        <Icon size={20} />
                      </div>
                    </div>

                    {/* Category Highlight */}
                    <span className="text-xs font-semibold tracking-wider text-accent uppercase block mb-2">
                      {highlights[i]}
                    </span>

                    {/* Title */}
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6 font-normal text-balance">
                      {card.description}
                    </p>
                  </div>

                  {/* Skills Tag Pills */}
                  <div className="pt-5 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {card.skills.map((skill) => (
                        <SkillTag key={skill} label={skill} />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
