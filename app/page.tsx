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
  { value: '20+',     label: 'Years in Business' },
  { value: '12,400+', label: 'Vehicles Serviced' },
  { value: '94.7%',   label: 'Customer Satisfaction' },
  { value: '4',       label: 'Certified Technicians' },
]

const MARQUEE_ITEMS = [
  'Oil Change', 'Brake Service', 'Diagnostics', 'Tune-Up',
  'Wheel Alignment', 'Tire Service', 'Ag Equipment', 'Fleet Service',
]

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } },
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 90, damping: 20 }}
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
        <section ref={heroRef} className="relative min-h-[100dvh] flex items-end pb-20 overflow-hidden">
          {/* Background */}
          <motion.div style={{ y }} className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/hero_video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-black to-transparent" />
          </motion.div>

          {/* Ghost text — right side decoration */}
          <div className="absolute right-0 bottom-12 pointer-events-none select-none hidden lg:block leading-none">
            <div className="font-heading text-[clamp(6rem,16vw,14rem)] font-900 uppercase text-white/[0.04] text-right pr-8">
              EST.<br />2004
            </div>
          </div>

          {/* Content — left aligned */}
          <motion.div style={{ opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-brand-red/30 bg-brand-red/10"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                <span className="text-xs font-heading uppercase tracking-[0.25em] text-brand-red">Saskatoon&apos;s Trusted Auto Shop</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.3 }}
                className="font-heading font-900 uppercase leading-none tracking-tight mb-6"
              >
                <span className="block text-[clamp(3rem,8vw,7rem)] text-brand-cream">{SHOP_NAME}</span>
                <span className="block text-[clamp(1rem,2.2vw,1.75rem)] text-brand-red mt-3 tracking-[0.15em]">Expert Service. Real Craftsmanship.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-brand-secondary text-lg max-w-[55ch] mb-10 font-body leading-relaxed"
              >
                Family-owned and operated since 2004. We treat your vehicle like our own — because a good shop&apos;s reputation is built one honest job at a time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.65 }}
                className="flex flex-col sm:flex-row gap-4"
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
                className="mt-8 flex items-center gap-2 text-brand-secondary"
              >
                <Phone className="h-4 w-4 text-brand-red" />
                <a href={`tel:${SHOP_PHONE}`} className="text-sm font-body hover:text-brand-cream transition-colors">{SHOP_PHONE}</a>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll caret — bottom left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-4 sm:left-6 flex flex-col items-start gap-1"
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
            <AnimatedSection className="mb-16">
              <p className="text-xs font-heading uppercase tracking-[0.3em] text-brand-red mb-3">What We Do</p>
              <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-800 uppercase leading-none text-brand-cream">
                Full-Service<br />
                <span className="text-brand-secondary">Automotive Care</span>
              </h2>
            </AnimatedSection>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="divide-y divide-brand-border border-t border-brand-border"
            >
              {FEATURED_SERVICES.map((svc, i) => {
                const Icon = SERVICE_ICONS[svc.icon] || WrenchIcon
                return (
                  <motion.div
                    key={svc.name}
                    variants={staggerItem}
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="group flex items-center gap-4 sm:gap-6 py-5 cursor-pointer"
                  >
                    <span className="text-brand-dim font-heading text-sm tabular-nums w-7 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-brand-red/15 flex items-center justify-center group-hover:bg-brand-red/25 transition-colors shrink-0">
                      <Icon className="h-5 w-5 text-brand-red" />
                    </div>
                    <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between gap-8">
                      <h3 className="font-heading text-lg md:text-2xl font-700 uppercase tracking-wide text-brand-cream group-hover:text-white transition-colors">
                        {svc.name}
                      </h3>
                      <p className="text-sm text-brand-secondary leading-relaxed sm:max-w-[36ch] sm:text-right shrink-0">
                        {svc.desc}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-brand-border group-hover:text-brand-red group-hover:translate-x-1 transition-all shrink-0" />
                  </motion.div>
                )
              })}
            </motion.div>

            <AnimatedSection className="mt-10">
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">View All Services & Pricing <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══ MARQUEE ═════════════════════════════════════════════════════════ */}
        <div className="py-4 bg-brand-red overflow-hidden border-y border-brand-red">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="flex whitespace-nowrap"
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((label, i) => (
              <span key={i} className="inline-flex items-center gap-5 px-8 font-heading text-sm uppercase tracking-[0.25em] text-white/90">
                {label}
                <span className="text-white/40 text-xs">◆</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ═══ TRUST BAR ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-brand-black relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dark bg-grid opacity-30" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-brand-border border border-brand-border"
            >
              {STATS.map((stat) => (
                <motion.div key={stat.label} variants={staggerItem} className="bg-brand-black px-8 py-10 text-left">
                  <div className="font-heading text-[clamp(2rem,5vw,4rem)] font-900 uppercase leading-none text-brand-cream mb-2">
                    {stat.value}
                  </div>
                  <p className="text-xs font-heading uppercase tracking-[0.2em] text-brand-dim">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ WHY US ══════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-brand-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <AnimatedSection>
                <p className="text-xs font-heading uppercase tracking-[0.3em] text-brand-red mb-3">Why Choose Us</p>
                <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] font-800 uppercase leading-none text-brand-cream mb-6">
                  We Do It Right<br />
                  <span className="text-brand-secondary">The First Time.</span>
                </h2>
                <p className="text-brand-secondary leading-relaxed mb-8 max-w-[58ch]">
                  No upsells. No mystery charges. When we find an issue, we show you exactly what we found and what it costs to fix it. You decide. That&apos;s been our approach since day one.
                </p>
                <div className="space-y-px divide-y divide-brand-border border-t border-brand-border">
                  {[
                    { icon: Shield,  title: 'Honest Diagnostics',   desc: 'Written reports. No verbal runaround.' },
                    { icon: Clock3,  title: 'On-Time Service',       desc: 'We respect your schedule as much as our own.' },
                    { icon: Star,    title: 'Certified Technicians', desc: 'Experienced mechanics, not apprentices on your dime.' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4 py-4">
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

              {/* 2×2 metric grid */}
              <AnimatedSection>
                <div className="grid grid-cols-2 gap-px bg-brand-border border border-brand-border rounded-lg overflow-hidden">
                  {[
                    { val: '94.7%',  label: 'First-Visit Fix Rate' },
                    { val: '2.3h',   label: 'Avg. Service Time' },
                    { val: '1,200+', label: 'Parts On-Hand' },
                    { val: 'Est.\n2004', label: 'Saskatoon, SK' },
                  ].map(({ val, label }) => (
                    <div key={label} className="bg-brand-muted p-7 flex flex-col justify-between min-h-[140px]">
                      <div className="font-heading text-[clamp(1.6rem,3.5vw,2.8rem)] font-900 uppercase leading-tight text-brand-cream whitespace-pre-line">
                        {val}
                      </div>
                      <div className="text-xs font-heading uppercase tracking-widest text-brand-dim mt-3">{label}</div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ═══ TEAM ════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-brand-black relative">
          <div className="absolute inset-0 bg-grid-dark bg-grid opacity-40" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection className="mb-14">
              <p className="text-xs font-heading uppercase tracking-[0.3em] text-brand-red mb-3">The People</p>
              <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-800 uppercase leading-none text-brand-cream">
                Meet the Crew
              </h2>
            </AnimatedSection>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {MECHANICS.map((mech) => (
                <motion.div
                  key={mech.id}
                  variants={staggerItem}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="group bg-brand-surface border border-brand-border rounded-lg overflow-hidden"
                >
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
                    <div className="text-xs text-brand-dim mt-1">{mech.years} yrs experience</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ CTA BANNER ══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-brand-surface border-y border-brand-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div>
                  <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] font-800 uppercase leading-none text-brand-cream mb-2">
                    Ready to Book?
                  </h2>
                  <p className="text-brand-secondary max-w-[48ch]">
                    Book online in under 3 minutes or give us a call. We&apos;ll take care of the rest.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                  <Button size="xl" asChild>
                    <Link href="/booking">Book Your Service</Link>
                  </Button>
                  <Button size="xl" variant="outline" asChild>
                    <Link href={`tel:${SHOP_PHONE}`}><Phone className="h-5 w-5 mr-2" />{SHOP_PHONE}</Link>
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

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}
