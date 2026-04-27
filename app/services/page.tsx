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

function AnimatedSection({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
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
        {/* Hero */}
        <section className="relative py-24 bg-brand-black overflow-hidden">
          <div className="absolute inset-0 bg-grid-dark bg-grid opacity-50" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-brand-red/6 blur-[100px] rounded-full" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-heading uppercase tracking-[0.3em] text-brand-red mb-4"
            >
              What We Offer
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-[clamp(3rem,8vw,7rem)] font-900 uppercase leading-none text-brand-cream mb-6"
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-brand-secondary max-w-2xl mx-auto text-lg leading-relaxed"
            >
              Every service comes with transparent pricing, honest communication, and the warranty of skilled hands. No hidden fees. No surprises.
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-brand-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SERVICES.map((svc, i) => {
                const Icon = ICON_MAP[svc.icon] || Cpu
                return (
                  <AnimatedSection key={svc.id} delay={i * 0.05}>
                    <motion.div
                      whileHover={{ borderColor: 'rgba(200,26,26,0.5)', scale: 1.005 }}
                      transition={{ duration: 0.2 }}
                      className="group bg-brand-surface border border-brand-border rounded-lg p-6 flex flex-col sm:flex-row gap-5 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/0 group-hover:from-brand-red/3 to-transparent transition-all duration-300" />

                      {/* Icon */}
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-lg bg-brand-red/15 group-hover:bg-brand-red/25 transition-colors flex items-center justify-center">
                          <Icon className="h-7 w-7 text-brand-red" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h3 className="font-heading text-xl font-800 uppercase tracking-wide text-brand-cream">{svc.name}</h3>
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="flex items-center gap-1 text-xs text-brand-dim">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{svc.hours === 0.5 ? '30 min' : `${svc.hours} hr${svc.hours > 1 ? 's' : ''}`}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-brand-amber font-medium">
                              <DollarSign className="h-3.5 w-3.5" />
                              <span>${svc.minPrice}–${svc.maxPrice}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-brand-secondary leading-relaxed mb-4">{svc.desc}</p>
                        <Button size="sm" asChild>
                          <Link href={`/booking?service=${svc.id}`}>
                            Book This Service <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </section>

        {/* Pricing note */}
        <section className="py-12 bg-brand-surface border-y border-brand-border">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <AnimatedSection>
              <p className="text-xs font-heading uppercase tracking-[0.2em] text-brand-dim mb-3">Pricing Policy</p>
              <p className="text-brand-secondary leading-relaxed">
                Prices shown are estimates. Final cost depends on vehicle make/model and parts required. We always provide a written quote before starting any work — you approve it, we do the job. Simple.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-brand-black">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <AnimatedSection>
              <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] font-800 uppercase leading-none text-brand-cream mb-4">
                Don&apos;t See What You Need?
              </h2>
              <p className="text-brand-secondary mb-8">
                We work on all makes and models. Send us your vehicle details and we&apos;ll get you a custom estimate within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" asChild>
                  <Link href="/booking">Book a Service</Link>
                </Button>
                <Button size="xl" variant="outline" asChild>
                  <Link href="/booking?mode=estimate">Request an Estimate</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
