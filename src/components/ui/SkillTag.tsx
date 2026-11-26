'use client'

export function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary border border-border text-text-secondary hover:border-accent hover:text-accent hover:bg-accent-soft transition-all duration-200 cursor-default">
      {label}
    </span>
  )
}
