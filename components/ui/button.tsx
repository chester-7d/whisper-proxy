import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-heading uppercase tracking-widest text-sm font-700 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        default:  'bg-brand-red text-white hover:bg-brand-red-light active:scale-95',
        outline:  'border border-brand-border text-brand-cream hover:border-brand-red hover:text-brand-red active:scale-95',
        ghost:    'text-brand-secondary hover:text-brand-cream active:scale-95',
        amber:    'bg-brand-amber text-white hover:brightness-110 active:scale-95',
        dark:     'bg-brand-muted text-brand-cream hover:bg-brand-border active:scale-95',
        link:     'text-brand-red underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm:      'h-8 px-4 text-xs',
        lg:      'h-14 px-10 text-base',
        xl:      'h-16 px-12 text-lg',
        icon:    'h-9 w-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
