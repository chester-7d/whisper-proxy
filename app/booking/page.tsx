'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, ChevronLeft, ChevronRight,
  Calendar, Car, Bell, ClipboardCheck, MessageSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SERVICES, SHOP_NAME } from '@/lib/mock-data'

// Generate time slots (8am–5pm, 15min increments)
function generateSlots() {
  const slots: string[] = []
  for (let h = 8; h < 17; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hh = h.toString().padStart(2, '0')
      const mm = m.toString().padStart(2, '0')
      const ampm = h < 12 ? 'AM' : 'PM'
      const displayH = h > 12 ? h - 12 : h
      slots.push(`${displayH}:${mm} ${ampm}`)
    }
  }
  return slots
}
const TIME_SLOTS = generateSlots()

// Generate dates (next 14 days, Mon–Sat)
function generateDates() {
  const dates: string[] = []
  const base = new Date('2026-04-27')
  for (let i = 1; i <= 20; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    if (d.getDay() !== 0) { // Skip Sunday
      const label = d.toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' })
      dates.push(label)
      if (dates.length >= 12) break
    }
  }
  return dates
}
const AVAILABLE_DATES = generateDates()

const SMS_PREVIEWS = [
  { label: 'Booking Confirmed', text: '✅ Your booking at Janzen & Gand Auto is confirmed for Tue Apr 28 at 9:00 AM. See you then!' },
  { label: 'Work Started', text: '🔧 Dusty has started work on your 2021 Ford F-150. We\'ll keep you posted.' },
  { label: 'Waiting on Parts', text: '⏳ Quick update: we\'re waiting on a part for your vehicle. ETA is 2–3 hrs. We\'ll text you when ready.' },
  { label: 'Job Complete', text: '✅ Your vehicle is ready for pickup at Janzen & Gand Auto! Total: $89. See you soon.' },
]

const STEPS = [
  { id: 1, label: 'Service',       icon: ClipboardCheck },
  { id: 2, label: 'Date & Time',   icon: Calendar },
  { id: 3, label: 'Vehicle',       icon: Car },
  { id: 4, label: 'Notifications', icon: Bell },
  { id: 5, label: 'Confirm',       icon: CheckCircle2 },
]

interface BookingData {
  serviceId: string
  date: string
  time: string
  name: string
  phone: string
  email: string
  vehicleYear: string
  vehicleMake: string
  vehicleModel: string
  notes: string
  smsOptIn: boolean
  mode: 'book' | 'estimate'
}

function BookingContent() {
  const params = useSearchParams()
  const isEstimate = params.get('mode') === 'estimate'
  const preselectedService = params.get('service') || ''

  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState<BookingData>({
    serviceId: preselectedService,
    date: '', time: '',
    name: '', phone: '', email: '',
    vehicleYear: '', vehicleMake: '', vehicleModel: '',
    notes: '', smsOptIn: true,
    mode: isEstimate ? 'estimate' : 'book',
  })

  const selectedService = SERVICES.find(s => s.id === data.serviceId)

  function update(key: keyof BookingData, value: string | boolean) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  function canNext() {
    if (step === 1) return !!data.serviceId
    if (step === 2) return !!data.date && !!data.time
    if (step === 3) return !!(data.name && data.phone && data.vehicleYear && data.vehicleMake && data.vehicleModel)
    return true
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 rounded-full bg-green-900/40 border-2 border-green-600 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="font-heading text-4xl font-900 uppercase text-brand-cream mb-4">
            {isEstimate ? 'Estimate Requested!' : 'Booking Confirmed!'}
          </h1>
          {isEstimate ? (
            <p className="text-brand-secondary mb-6">
              We&apos;ve received your estimate request for your <strong className="text-brand-cream">{data.vehicleYear} {data.vehicleMake} {data.vehicleModel}</strong>. Someone will be in touch within <strong className="text-brand-cream">24 hours</strong>.
            </p>
          ) : (
            <p className="text-brand-secondary mb-6">
              Your <strong className="text-brand-cream">{selectedService?.name}</strong> is booked for <strong className="text-brand-cream">{data.date} at {data.time}</strong>. We&apos;ll see your {data.vehicleYear} {data.vehicleMake} {data.vehicleModel} then!
            </p>
          )}

          {data.smsOptIn && (
            <div className="bg-brand-muted border border-brand-border rounded-lg p-5 mb-8 text-left">
              <p className="text-xs font-heading uppercase tracking-widest text-brand-red mb-3">SMS Updates You&apos;ll Receive:</p>
              <div className="space-y-2">
                {SMS_PREVIEWS.map((preview) => (
                  <div key={preview.label} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2 shrink-0" />
                    <div>
                      <div className="text-xs text-brand-dim uppercase tracking-wide">{preview.label}</div>
                      <div className="text-xs text-brand-secondary mt-0.5 leading-relaxed">{preview.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button size="lg" onClick={() => { setSubmitted(false); setStep(1); setData({ serviceId: '', date: '', time: '', name: '', phone: '', email: '', vehicleYear: '', vehicleMake: '', vehicleModel: '', notes: '', smsOptIn: true, mode: isEstimate ? 'estimate' : 'book' }) }}>
            Book Another Service
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Step indicator */}
      <div className="flex items-center justify-center mb-12 gap-0">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const active = s.id === step
          const done = s.id < step
          return (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div className={[
                  'w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                  active ? 'bg-brand-red border-brand-red text-white' :
                  done   ? 'bg-brand-red/20 border-brand-red/50 text-brand-red' :
                           'bg-brand-muted border-brand-border text-brand-dim'
                ].join(' ')}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className={`text-[9px] font-heading uppercase tracking-wider hidden sm:block ${active ? 'text-brand-cream' : 'text-brand-dim'}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-10 sm:w-16 h-px mx-1 mb-4 transition-colors ${s.id < step ? 'bg-brand-red/50' : 'bg-brand-border'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1 — Service */}
          {step === 1 && (
            <div>
              <h2 className="font-heading text-3xl font-800 uppercase text-brand-cream mb-2">
                {isEstimate ? 'What do you need estimated?' : 'What can we help with?'}
              </h2>
              <p className="text-brand-secondary text-sm mb-8">Select the service you need.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => update('serviceId', svc.id)}
                    className={[
                      'w-full text-left p-4 rounded-lg border-2 transition-all duration-150',
                      data.serviceId === svc.id
                        ? 'border-brand-red bg-brand-red/10 text-brand-cream'
                        : 'border-brand-border bg-brand-muted text-brand-secondary hover:border-brand-dim hover:text-brand-cream',
                    ].join(' ')}
                  >
                    <div className="font-heading text-base font-700 uppercase tracking-wide">{svc.name}</div>
                    <div className="text-xs text-brand-dim mt-0.5">{svc.hours === 0.5 ? '30 min' : `${svc.hours} hr`} · ${svc.minPrice}–${svc.maxPrice}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="font-heading text-3xl font-800 uppercase text-brand-cream mb-2">Pick a Time</h2>
              <p className="text-brand-secondary text-sm mb-8">Choose your preferred date and time slot.</p>

              <div className="mb-6">
                <Label className="text-xs uppercase tracking-widest mb-3 block">Available Dates</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {AVAILABLE_DATES.map((d) => (
                    <button
                      key={d}
                      onClick={() => update('date', d)}
                      className={[
                        'py-2.5 px-3 rounded-lg border text-sm font-heading uppercase tracking-wide transition-all',
                        data.date === d
                          ? 'border-brand-red bg-brand-red/10 text-brand-cream'
                          : 'border-brand-border bg-brand-muted text-brand-secondary hover:border-brand-dim hover:text-brand-cream',
                      ].join(' ')}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {data.date && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Label className="text-xs uppercase tracking-widest mb-3 block">Available Times</Label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => update('time', t)}
                        className={[
                          'py-2 px-2 rounded border text-xs font-heading uppercase tracking-wide transition-all',
                          data.time === t
                            ? 'border-brand-red bg-brand-red/10 text-brand-cream'
                            : 'border-brand-border bg-brand-muted text-brand-secondary hover:border-brand-dim',
                        ].join(' ')}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Step 3 — Vehicle */}
          {step === 3 && (
            <div>
              <h2 className="font-heading text-3xl font-800 uppercase text-brand-cream mb-2">Your Info & Vehicle</h2>
              <p className="text-brand-secondary text-sm mb-8">So we can prepare for your visit.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="John Smith" value={data.name} onChange={e => update('name', e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="(306) 555-0100" type="tel" value={data.phone} onChange={e => update('phone', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" placeholder="john@email.com" type="email" value={data.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="year">Year *</Label>
                    <Input id="year" placeholder="2021" value={data.vehicleYear} onChange={e => update('vehicleYear', e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="make">Make *</Label>
                    <Input id="make" placeholder="Ford" value={data.vehicleMake} onChange={e => update('vehicleMake', e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="model">Model *</Label>
                    <Input id="model" placeholder="F-150" value={data.vehicleModel} onChange={e => update('vehicleModel', e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="notes">Describe the Issue or Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="E.g. Grinding noise from front brakes. Getting worse in cold weather..."
                    value={data.notes}
                    onChange={e => update('notes', e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4 — SMS */}
          {step === 4 && (
            <div>
              <h2 className="font-heading text-3xl font-800 uppercase text-brand-cream mb-2">Stay in the Loop</h2>
              <p className="text-brand-secondary text-sm mb-8">Opt in for text updates on your job status — no spam, just the updates that matter.</p>

              <div className="bg-brand-surface border border-brand-border rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-heading text-base font-700 uppercase text-brand-cream">SMS Status Updates</div>
                    <div className="text-xs text-brand-secondary mt-0.5">Text me when my job status changes</div>
                  </div>
                  <Switch checked={data.smsOptIn} onCheckedChange={(v) => update('smsOptIn', v)} />
                </div>

                {data.smsOptIn && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-3">
                    <p className="text-xs text-brand-dim uppercase tracking-widest mb-3">You&apos;d receive texts like these:</p>
                    {SMS_PREVIEWS.map((preview) => (
                      <div key={preview.label} className="bg-brand-muted rounded-lg p-3">
                        <div className="text-[10px] text-brand-dim uppercase tracking-widest mb-1">{preview.label}</div>
                        <div className="text-sm text-brand-secondary leading-relaxed">{preview.text}</div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              <p className="text-xs text-brand-dim">Standard message rates may apply. You can opt out at any time by replying STOP.</p>
            </div>
          )}

          {/* Step 5 — Confirm */}
          {step === 5 && (
            <div>
              <h2 className="font-heading text-3xl font-800 uppercase text-brand-cream mb-2">
                {isEstimate ? 'Confirm Your Request' : 'Confirm Your Booking'}
              </h2>
              <p className="text-brand-secondary text-sm mb-8">Review everything before submitting.</p>

              <div className="space-y-4">
                {[
                  { label: 'Service',    value: selectedService?.name || '—' },
                  { label: 'Date & Time', value: data.date && data.time ? `${data.date} at ${data.time}` : 'Not selected' },
                  { label: 'Name',       value: data.name || '—' },
                  { label: 'Phone',      value: data.phone || '—' },
                  { label: 'Vehicle',    value: data.vehicleYear && data.vehicleMake ? `${data.vehicleYear} ${data.vehicleMake} ${data.vehicleModel}` : '—' },
                  { label: 'Notes',      value: data.notes || 'None' },
                  { label: 'SMS Updates',value: data.smsOptIn ? 'Yes — opted in' : 'No' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4 py-3 border-b border-brand-border last:border-0">
                    <span className="text-xs font-heading uppercase tracking-widest text-brand-dim shrink-0">{label}</span>
                    <span className="text-sm text-brand-cream text-right">{value}</span>
                  </div>
                ))}
              </div>

              {isEstimate && (
                <div className="mt-6 p-4 bg-brand-amber/10 border border-brand-amber/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 text-brand-amber mt-0.5 shrink-0" />
                    <p className="text-sm text-brand-amber">
                      We&apos;ll review your request and send a detailed estimate within 24 hours. No obligation.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-10 pt-6 border-t border-brand-border">
        <Button
          variant="outline"
          onClick={() => setStep(s => s - 1)}
          disabled={step === 1}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>

        {step < 5 ? (
          <Button onClick={() => setStep(s => s + 1)} disabled={!canNext()} className="gap-2">
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="lg" onClick={() => setSubmitted(true)} className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            {isEstimate ? 'Submit Request' : 'Confirm Booking'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-brand-black">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20 text-brand-secondary">Loading...</div>
        }>
          <BookingContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
