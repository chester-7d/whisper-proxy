import * as React from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'booked' | 'in-progress' | 'waiting-parts' | 'completed' | 'amber' | 'outline'

const variantClasses: Record<BadgeVariant, string> = {
  default:        'bg-brand-muted text-brand-secondary border border-brand-border',
  booked:         'bg-blue-900/40 text-blue-300 border border-blue-800/60',
  'in-progress':  'bg-yellow-900/40 text-yellow-300 border border-yellow-800/60',
  'waiting-parts':'bg-orange-900/40 text-orange-300 border border-orange-800/60',
  completed:      'bg-green-900/40 text-green-300 border border-green-800/60',
  amber:          'bg-brand-amber/20 text-brand-amber border border-brand-amber/40',
  outline:        'border border-brand-border text-brand-secondary',
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium font-body',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
