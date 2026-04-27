'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SHOP_NAME } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/booking',  label: 'Book Service' },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-brand-black/90 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center">
            <Wrench className="h-4 w-4 text-white" />
          </div>
          <span className="font-heading text-lg font-800 uppercase tracking-wider text-brand-cream group-hover:text-white transition-colors">
            {SHOP_NAME}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-heading text-sm uppercase tracking-widest transition-colors',
                pathname === link.href ? 'text-brand-red' : 'text-brand-secondary hover:text-brand-cream'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/booking?mode=estimate">Get Estimate</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-brand-secondary hover:text-brand-cream"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-brand-surface border-b border-brand-border p-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'block py-2 px-4 font-heading text-sm uppercase tracking-widest rounded transition-colors',
                pathname === link.href ? 'text-brand-red bg-brand-red/10' : 'text-brand-secondary hover:text-brand-cream hover:bg-brand-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href="/booking?mode=estimate" onClick={() => setOpen(false)}>Estimate</Link>
            </Button>
            <Button size="sm" className="flex-1" asChild>
              <Link href="/booking" onClick={() => setOpen(false)}>Book Now</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
