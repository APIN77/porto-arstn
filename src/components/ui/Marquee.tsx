'use client'

import { motion } from 'framer-motion'

const items = [
  'Artificial Intelligence',
  'Web Development',
  'Machine Learning',
  'Data Analytics',
  'Python Programming',
  'Next.js & React',
  'Tailwind CSS',
  'Support Vector Machine',
  'Natural Language Processing',
  'Prompt Engineering',
]

export function Marquee() {
  const content = [...items, ...items, ...items]

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-border bg-secondary/80 backdrop-blur-sm select-none">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-8 items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 32,
        }}
      >
        {content.map((text, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-xs font-semibold tracking-wider text-text-primary uppercase">
              {text}
            </span>
            <span className="text-accent text-sm font-bold">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
