'use client'

import { useEffect, ReactNode } from 'react'

interface LenisInstance {
  raf: (t: number) => void
  destroy: () => void
}

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: LenisInstance | null = null
    let rafId: number

    import('lenis').then((mod) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Lenis = (mod.default || mod) as any
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      })

      function raf(time: number) {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      lenis?.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <>{children}</>
}
