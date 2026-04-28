'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  Droplets, RotateCw, Circle, Disc, Zap, Cpu,
  Fuel, Flame, AlignCenter, Battery, Clock, ArrowRight, DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SERVICES } from '@/lib/mock-data'

const ICON_MAP: Record<string, React.ElementType> = {
  Droplets, RotateCw, Circle, Disc, Zap, Cpu, Fuel, Flame, AlignCenter, Battery,
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } },
}

function AnimatedSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 90, damping: 20, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero — left aligned */}
        <section className="relative py-24 bg-brand-black overflow-hidden">
          <div className="absolute inset-0 bg-grid-dark bg-grid opacity-50" />
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="text-xs font-heading uppercase tracking-[0.3em] text-brand-red mb-4"
            >
              What We Offer
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.1 }}
              className="font-heading text-[clamp(3rem,8vw,7rem)] font-900 uppercase leading-none text-brand-cream mb-6 max-w-3xl"
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-brand-secondary max-w-[58ch] text-lg leading-relaxed"
            >
              Every service comes with transparent pricing, honest communication, and the warranty of skilled hands. No hidden fees. No surprises.
            </motion.p>
          </div>
        </section>

        {/* Services — editorial list */}
        <section className="py-16 bg-brand-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="divide-y divide-brand-border border-t border-brand-border"
            >
              {SERVICES.map((svc, i) => {
                const Icon = ICON_MAP[svc.icon] || Cpu
                return (
                  <motion.div
                    key={svc.id}
                    variants={staggerItem}
                    className="group grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-start gap-4 sm:gap-8 py-6"
                  >
                    {/* Left: number + icon */}
                    <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2 sm:w-14">
                      <span className="text-brand-dim font-heading text-sm tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <div className="w-11 h-11 rounded-lg bg-brand-red/15 group-hover:bg-brand-red/25 transition-colors flex items-center justify-center">
                        <Icon className="h-5 w-5 text-brand-red" />
                      </div>
                    </div>

                    {/* Center: name + description */}
                    <div className="min-w-0">
                      <h3 className="font-heading text-xl md:text-2xl font-700 uppercase tracking-wide text-brand-cream mb-1 group-hover:text-white transition-colors">
                        {svc.name}
                      </h3>
                      <p className="text-sm text-brand-secondary leading-relaxed max-w-[60ch]">{svc.desc}</p>
                    </div>

                    {/* Right: meta + CTA */}
                    <div className="flex flex-row sm:flex-col items-start sm:items-end gap-3 sm:gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 text-xs text-brand-dim">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{svc.hours === 0.5 ? '30 min' : `${svc.hours} hr${svc.hours > 1 ? 's' : ''}`}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-brand-amber font-medium">
                        <DollarSign className="h-3.5 w-3.5" />
                        <span>${svc.minPrice}–${svc.maxPrice}</span>
                      </div>
                      <Button size="sm" asChild className="mt-1">
                        <Link href={`/booking?service=${svc.id}`}>
                          Book <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Pricing note */}
        <section className="py-12 bg-brand-surface border-y border-brand-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-heading uppercase tracking-[0.2em] text-brand-dim mb-1">Pricing Policy</p>
                <p className="text-brand-secondary leading-relaxed max-w-[65ch] text-sm">
                  Prices shown are estimates. Final cost depends on vehicle make/model and parts required. We always provide a written quote before starting — you approve it, we do the job.
                </p>
              </div>
              <div className="shrink-0">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/booking?mode=estimate">Request a Quote <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA — left-right split */}
        <section className="py-20 bg-brand-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <div>
                  <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] font-800 uppercase leading-none text-brand-cream mb-3">
                    Don&apos;t See<br />What You Need?
                  </h2>
                  <p className="text-brand-secondary max-w-[48ch]">
                    We work on all makes and models. Send us your vehicle details and we&apos;ll get you a custom estimate within 24 hours.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                  <Button size="xl" asChild>
                    <Link href="/booking">Book a Service</Link>
                  </Button>
                  <Button size="xl" variant="outline" asChild>
                    <Link href="/booking?mode=estimate">Request an Estimate</Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
