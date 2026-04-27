'use client'

import { useDemo, type DemoRole, type DemoMechanic } from '@/lib/demo-context'
import { useRouter, usePathname } from 'next/navigation'
import { Wrench, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const ROLES: { id: DemoRole; label: string; path: string }[] = [
  { id: 'customer',  label: 'Customer View',  path: '/' },
  { id: 'secretary', label: 'Secretary View', path: '/dashboard' },
  { id: 'mechanic',  label: 'Mechanic View',  path: '/mechanic' },
  { id: 'foreman',   label: 'Foreman View',   path: '/dashboard?tab=foreman' },
]

const MECHANICS: { id: DemoMechanic; label: string }[] = [
  { id: 'dusty',  label: 'Dusty' },
  { id: 'layton', label: 'Layton' },
  { id: 'matt',   label: 'Matt' },
  { id: 'tyler',  label: 'Tyler' },
]

export function DemoBar() {
  const { role, setRole, mechanic, setMechanic } = useDemo()
  const router = useRouter()
  const pathname = usePathname()
  const [mechanicOpen, setMechanicOpen] = useState(false)

  function handleRole(r: typeof ROLES[0]) {
    setRole(r.id)
    router.push(r.path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] h-14 bg-[#0D0D0D]/95 backdrop-blur-md border-t border-white/10 flex items-center px-4 gap-3">
      {/* Label */}
      <div className="flex items-center gap-2 pr-3 border-r border-white/10 shrink-0">
        <Wrench className="h-3.5 w-3.5 text-brand-amber" />
        <span className="text-[10px] font-heading uppercase tracking-[0.2em] text-brand-amber font-600">Demo Mode</span>
      </div>

      {/* Role buttons */}
      <div className="flex items-center gap-1.5 flex-1">
        {ROLES.map((r) => (
          <button
            key={r.id}
            onClick={() => handleRole(r)}
            className={[
              'px-3 h-7 rounded text-[11px] font-heading uppercase tracking-widest transition-all duration-150 whitespace-nowrap',
              role === r.id
                ? 'bg-brand-red text-white'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80',
            ].join(' ')}
          >
            {r.label}
          </button>
        ))}

        {/* Mechanic sub-selector */}
        {role === 'mechanic' && (
          <div className="relative ml-2 border-l border-white/10 pl-3">
            <button
              onClick={() => setMechanicOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 h-7 rounded bg-yellow-900/40 text-yellow-300 border border-yellow-800/60 text-[11px] font-heading uppercase tracking-widest"
            >
              {mechanic.charAt(0).toUpperCase() + mechanic.slice(1)}
              <ChevronDown className="h-3 w-3" />
            </button>
            {mechanicOpen && (
              <div className="absolute bottom-9 left-0 bg-brand-surface border border-brand-border rounded-md overflow-hidden shadow-xl min-w-[120px]">
                {MECHANICS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setMechanic(m.id); setMechanicOpen(false) }}
                    className={[
                      'w-full text-left px-3 py-2 text-[11px] font-heading uppercase tracking-widest transition-colors',
                      mechanic === m.id ? 'text-yellow-300 bg-yellow-900/20' : 'text-brand-secondary hover:text-brand-cream hover:bg-brand-muted',
                    ].join(' ')}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Current path indicator */}
      <div className="hidden sm:block text-[10px] text-brand-dim font-body shrink-0">
        Viewing: <span className="text-white/40">{pathname}</span>
      </div>
    </div>
  )
}
