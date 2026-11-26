'use client'

import { cn } from '@/lib/utils'

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'pill'
}) {
  return (
    <button
      className={cn(
        'group relative inline-flex items-center justify-center text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-full select-none cursor-pointer',
        variant === 'primary' &&
          'bg-accent text-white px-6 py-3 hover:bg-accent-hover shadow-sm active:scale-[0.98]',
        variant === 'secondary' &&
          'bg-secondary border border-border text-text-primary px-6 py-3 hover:border-accent hover:text-accent active:scale-[0.98] shadow-sm',
        variant === 'pill' &&
          'bg-card border border-border text-text-secondary px-4 py-2 hover:border-accent hover:text-accent active:scale-[0.98]',
        variant === 'ghost' &&
          'text-text-secondary hover:text-accent px-4 py-2',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
