'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import {
  Droplets, RotateCw, Circle, Disc, Zap, Cpu,
  Fuel, Flame, AlignCenter, Battery,
  ArrowRight, Phone, Star, Shield, Clock3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SHOP_NAME, SHOP_PHONE, MECHANICS } from '@/lib/mock-data'

const SERVICE_ICONS: Record<string, React.ElementType> = {
  Droplets, RotateCw, Circle, Disc, Zap, Cpu, Fuel, Flame, AlignCenter, Battery,
}

const FEATURED_SERVICES = [
  { icon: 'Droplets',    name: 'Oil Change',        desc: 'Full synthetic or conventional. Multi-point inspection included.' },
  { icon: 'Disc',        name: 'Brake Service',      desc: 'Pads, rotors, calipers. Stop with confidence.' },
  { icon: 'Circle',      name: 'Tire Service',       desc: 'Installation, rotation, and balancing on all makes.' },
  { icon: 'Cpu',         name: 'Diagnostics',        desc: 'Full OBD-II scan with written report. No guessing.' },
  { icon: 'AlignCenter', name: 'Wheel Alignment',    desc: 'Computer-assisted 4-wheel alignment to spec.' },
  { icon: 'Zap',         name: 'Tune-Up',            desc: 'Plugs, filters, ignition system. Runs like new.' },
]

const STATS = [
  { value: '20+', label: 'Years in Business' },
  { value: '12,400+', label: 'Vehicles Serviced' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '4', label: 'Certified Technicians' },
]

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <>
      <Header />
      <main>
        {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
          {/* Background */}
          <motion.div style={{ y }} className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-[#0D0808] to-brand-black" />
            {/* Subtle grid */}
            <div className="absolute inset-0 bg-grid-dark bg-grid opacity-100" />
            {/* Red glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-red/8 blur-[120px] rounded-full" />
            {/* Amber accent */}
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-amber/5 blur-[100px] rounded-full" />
          </motion.div>

          {/* Content */}
          <motion.div style={{ opacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-brand-red/30 bg-brand-red/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              <span className="text-xs font-heading uppercase tracking-[0.25em] text-brand-red">Saskatoon&apos;s Trusted Auto Shop</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-heading font-900 uppercase leading-none tracking-tight mb-6"
            >
              <span className="block text-[clamp(3.5rem,10vw,8rem)] text-brand-cream">{SHOP_NAME}</span>
              <span className="block text-[clamp(1.2rem,3vw,2.5rem)] text-brand-red mt-2 tracking-[0.15em]">Expert Service. Real Craftsmanship.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-brand-secondary text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed"
            >
              Family-owned and operated since 2004. We treat your vehicle like our own — because a good shop&apos;s reputation is built one honest job at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="xl" asChild>
                <Link href="/booking">Book Your Service <ArrowRight className="h-5 w-5 ml-1" /></Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/booking?mode=estimate">Request an Estimate</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 flex items-center justify-center gap-2 text-brand-secondary"
            >
              <Phone className="h-4 w-4 text-brand-red" />
              <a href={`tel:${SHOP_PHONE}`} className="text-sm font-body hover:text-brand-cream transition-colors">{SHOP_PHONE}</a>
            </motion.div>
          </motion.div>

          {/* Scroll caret */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          >
            <span className="text-[10px] font-heading uppercase tracking-[0.3em] text-brand-dim">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-8 bg-gradient-to-b from-brand-red/60 to-transparent"
            />
          </motion.div>
        </section>

        {/* ═══ SERVICES ════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-brand-black relative">
          <div className="absolute inset-0 bg-grid-dark bg-grid opacity-50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection className="mb-14 text-center">
              <p className="text-xs font-heading uppercase tracking-[0.3em] text-brand-red mb-3">What We Do</p>
              <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-800 uppercase leading-none text-brand-cream">
                Full-Service<br />
                <span className="text-brand-secondary">Automotive Care</span>
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURED_SERVICES.map((svc, i) => {
                const Icon = SERVICE_ICONS[svc.icon] || Wrench
                return (
                  <AnimatedSection key={svc.name}>
                    <motion.div
                      whileHover={{ y: -4, borderColor: 'rgba(200,26,26,0.4)' }}
                      transition={{ duration: 0.2 }}
                      className="group h-full bg-brand-surface border border-brand-border rounded-lg p-6 cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/3 transition-colors duration-300" />
                      <div className="relative">
                        <div className="w-11 h-11 rounded-lg bg-brand-red/15 flex items-center justify-center mb-4 group-hover:bg-brand-red/25 transition-colors">
                          <Icon className="h-5 w-5 text-brand-red" />
                        </div>
                        <h3 className="font-heading text-lg font-700 uppercase tracking-wide text-brand-cream mb-2">{svc.name}</h3>
                        <p className="text-sm text-brand-secondary leading-relaxed">{svc.desc}</p>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                )
              })}
            </div>

            <AnimatedSection className="mt-10 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">View All Services & Pricing <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══ TRUST BAR ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-brand-red relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/20">
              {STATS.map((stat, i) => (
                <AnimatedSection key={stat.label}>
                  <div className="text-center lg:px-8">
                    <div className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-900 uppercase leading-none text-white mb-2">
                      {stat.value}
                    </div>
                    <p className="text-xs font-heading uppercase tracking-[0.2em] text-white/70">{stat.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHY US ══════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-brand-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <p className="text-xs font-heading uppercase tracking-[0.3em] text-brand-red mb-3">Why Choose Us</p>
                <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] font-800 uppercase leading-none text-brand-cream mb-6">
                  We Do It Right<br />
                  <span className="text-brand-secondary">The First Time.</span>
                </h2>
                <p className="text-brand-secondary leading-relaxed mb-8">
                  No upsells. No mystery charges. When we find an issue, we show you exactly what we found and what it costs to fix it. You decide. That&apos;s been our approach since day one.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Shield,  title: 'Honest Diagnostics',   desc: 'Written reports. No verbal runaround.' },
                    { icon: Clock3,  title: 'On-Time Service',       desc: 'We respect your schedule as much as our own.' },
                    { icon: Star,    title: 'Certified Technicians', desc: 'Experienced mechanics, not apprentices on your dime.' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded bg-brand-red/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="h-4 w-4 text-brand-red" />
                      </div>
                      <div>
                        <div className="font-heading text-sm font-700 uppercase tracking-wide text-brand-cream">{title}</div>
                        <div className="text-sm text-brand-secondary">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Visual block */}
              <AnimatedSection>
                <div className="relative h-80 lg:h-full min-h-[360px] rounded-lg overflow-hidden bg-brand-muted border border-brand-border">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-heading text-[7rem] font-900 uppercase leading-none text-brand-border select-none">20</div>
                      <div className="font-heading text-xl font-700 uppercase tracking-widest text-brand-red -mt-4">Years of Trust</div>
                      <div className="text-sm text-brand-dim mt-2">Est. 2004 · Saskatoon, SK</div>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ═══ TEAM ════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-brand-black relative">
          <div className="absolute inset-0 bg-grid-dark bg-grid opacity-40" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection className="mb-14 text-center">
              <p className="text-xs font-heading uppercase tracking-[0.3em] text-brand-red mb-3">The People</p>
              <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-800 uppercase leading-none text-brand-cream">
                Meet the Crew
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MECHANICS.map((mech, i) => (
                <AnimatedSection key={mech.id}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group bg-brand-surface border border-brand-border rounded-lg overflow-hidden"
                  >
                    {/* Avatar */}
                    <div className="relative h-48 bg-gradient-to-br from-brand-muted to-brand-black flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-brand-red/20 border-2 border-brand-red/30 flex items-center justify-center">
                        <span className="font-heading text-5xl font-900 text-brand-red">{mech.initials}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="font-heading text-2xl font-800 uppercase text-brand-cream">{mech.name}</div>
                      <div className="text-xs font-heading uppercase tracking-widest text-brand-red mb-2">{mech.role}</div>
                      <div className="text-sm text-brand-secondary">{mech.specialty}</div>
                      <div className="text-xs text-brand-dim mt-1">{mech.years} years experience</div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA BANNER ══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-brand-surface border-y border-brand-border">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <AnimatedSection>
              <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] font-800 uppercase leading-none text-brand-cream mb-4">
                Ready to Book?
              </h2>
              <p className="text-brand-secondary mb-8">
                Book online in under 3 minutes or give us a call. We&apos;ll take care of the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="xl" asChild>
                  <Link href="/booking">Book Your Service</Link>
                </Button>
                <Button size="xl" variant="outline" asChild>
                  <Link href={`tel:${SHOP_PHONE}`}><Phone className="h-5 w-5 mr-2" />{SHOP_PHONE}</Link>
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

function Wrench({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}
