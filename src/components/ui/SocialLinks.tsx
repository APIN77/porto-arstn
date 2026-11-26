'use client'

import { Github, Instagram, Mail } from 'lucide-react'
import { socials } from '@/data/socials'

const iconMap = {
  github: Github,
  instagram: Instagram,
  mail: Mail,
} as const

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socials.map((s) => {
        const Icon = iconMap[s.icon]
        return (
          <a
            key={s.name}
            href={s.url}
            target={s.icon === 'mail' ? undefined : '_blank'}
            rel={s.icon === 'mail' ? undefined : 'noopener noreferrer'}
            aria-label={s.name}
            className="text-text-secondary hover:text-accent transition-colors duration-300"
          >
            <Icon size={20} />
          </a>
        )
      })}
    </div>
  )
}
