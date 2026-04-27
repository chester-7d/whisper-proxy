'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2, Clock, Car, Wrench, X,
  MessageSquare, AlertTriangle, Loader2, Package,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { JOBS, MECHANICS, type Job, type JobStatus } from '@/lib/mock-data'
import { useDemo } from '@/lib/demo-context'
import { cn } from '@/lib/utils'

const STATUS_ORDER: JobStatus[] = ['booked', 'in-progress', 'waiting-parts', 'completed']

const STATUS_META: Record<JobStatus, { label: string; icon: React.ElementType; badge: string; next: JobStatus | null; nextLabel: string; sms: string }> = {
  'booked': {
    label: 'Not Started',
    icon: Clock,
    badge: 'booked',
    next: 'in-progress',
    nextLabel: 'Start Job',
    sms: '',
  },
  'in-progress': {
    label: 'In Progress',
    icon: Loader2,
    badge: 'in-progress',
    next: 'waiting-parts',
    nextLabel: 'Waiting on Parts',
    sms: '🔧 Work has begun on your vehicle at Janzen & Gand Auto. We\'ll keep you updated.',
  },
  'waiting-parts': {
    label: 'Waiting on Parts',
    icon: Package,
    badge: 'waiting-parts',
    next: 'completed',
    nextLabel: 'Mark Complete',
    sms: '⏳ We\'re waiting on a part for your vehicle. Estimated delay: 1–2 hrs. We\'ll text when ready.',
  },
  'completed': {
    label: 'Completed',
    icon: CheckCircle2,
    badge: 'completed',
    next: null,
    nextLabel: '',
    sms: '✅ Your vehicle is ready for pickup at Janzen & Gand Auto! Come see us when you\'re ready.',
  },
}

function SMSToast({ customer, text, onClose }: { customer: string; text: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9000] bg-brand-surface border border-brand-border rounded-xl px-5 py-4 shadow-2xl max-w-sm w-full mx-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-green-900/40 border border-green-700/50 flex items-center justify-center shrink-0">
          <MessageSquare className="h-3.5 w-3.5 text-green-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-heading uppercase tracking-widest text-green-400 mb-1">SMS Sent to {customer}</div>
          <p className="text-xs text-brand-secondary leading-relaxed">{text}</p>
        </div>
        <button onClick={onClose} className="text-brand-dim hover:text-brand-cream shrink-0">
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}

function JobCard({
  job,
  onStatusChange,
}: {
  job: Job & { status: JobStatus }
  onStatusChange: (id: string, next: JobStatus, sms: string) => void
}) {
  const meta = STATUS_META[job.status]
  const StatusIcon = meta.icon

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-brand-surface border rounded-xl overflow-hidden transition-colors',
        job.status === 'completed' ? 'border-green-800/40 opacity-70' : 'border-brand-border',
      )}
    >
      {/* Status stripe */}
      <div className={cn('h-1 w-full', {
        'bg-blue-600':   job.status === 'booked',
        'bg-yellow-500': job.status === 'in-progress',
        'bg-orange-500': job.status === 'waiting-parts',
        'bg-green-600':  job.status === 'completed',
      })} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="font-heading text-xl font-800 uppercase text-brand-cream leading-tight">
              {job.customer}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-brand-secondary text-sm">
              <Car className="h-3.5 w-3.5" />
              {job.vehicle.year} {job.vehicle.make} {job.vehicle.model}
            </div>
          </div>
          <Badge variant={meta.badge as 'booked' | 'in-progress' | 'waiting-parts' | 'completed'}>
            <StatusIcon className={cn('h-3 w-3 mr-1', job.status === 'in-progress' && 'animate-spin')} />
            {meta.label}
          </Badge>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-brand-muted rounded-lg p-3">
            <div className="text-[10px] text-brand-dim uppercase tracking-widest mb-1">Service</div>
            <div className="font-heading text-sm font-700 text-brand-cream uppercase leading-tight">{job.service}</div>
          </div>
          <div className="bg-brand-muted rounded-lg p-3">
            <div className="text-[10px] text-brand-dim uppercase tracking-widest mb-1">Bay &amp; Time</div>
            <div className="font-heading text-sm font-700 text-brand-cream">Bay {job.bay} · {job.time}</div>
          </div>
          <div className="bg-brand-muted rounded-lg p-3">
            <div className="text-[10px] text-brand-dim uppercase tracking-widest mb-1">Est. Duration</div>
            <div className="font-heading text-sm font-700 text-brand-cream">
              {job.duration <= 0.5 ? '30 min' : `${job.duration} hr${job.duration > 1 ? 's' : ''}`}
            </div>
          </div>
          <div className="bg-brand-muted rounded-lg p-3">
            <div className="text-[10px] text-brand-dim uppercase tracking-widest mb-1">Phone</div>
            <div className="text-sm text-brand-cream">{job.phone}</div>
          </div>
        </div>

        {/* Notes */}
        {job.notes && (
          <div className="bg-brand-muted/50 border border-brand-border rounded-lg p-3 mb-4">
            <div className="text-[10px] text-brand-dim uppercase tracking-widest mb-1">Customer Notes</div>
            <p className="text-sm text-brand-secondary leading-relaxed">{job.notes}</p>
          </div>
        )}

        {/* Status button */}
        {meta.next && (
          <Button
            className="w-full"
            variant={job.status === 'waiting-parts' ? 'amber' : 'default'}
            onClick={() => onStatusChange(job.id, meta.next!, meta.sms)}
          >
            {job.status === 'booked' && <Wrench className="h-4 w-4 mr-2" />}
            {job.status === 'in-progress' && <Package className="h-4 w-4 mr-2" />}
            {job.status === 'waiting-parts' && <CheckCircle2 className="h-4 w-4 mr-2" />}
            {meta.nextLabel}
          </Button>
        )}
        {job.status === 'completed' && (
          <div className="flex items-center justify-center gap-2 py-2 text-green-400 text-sm">
            <CheckCircle2 className="h-4 w-4" /> Job Complete
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function MechanicPage() {
  const { mechanic: mechanicId } = useDemo()
  const mechanic = MECHANICS.find(m => m.id === mechanicId) || MECHANICS[0]

  const [jobStatuses, setJobStatuses] = useState<Record<string, JobStatus>>({})
  const [smsToast, setSmsToast] = useState<{ customer: string; text: string } | null>(null)

  const myJobs = JOBS.filter(j => j.mechanic === mechanicId)

  function getStatus(job: Job): JobStatus {
    return jobStatuses[job.id] ?? job.status
  }

  function handleStatusChange(id: string, next: JobStatus, smsText: string) {
    setJobStatuses(prev => ({ ...prev, [id]: next }))
    const job = JOBS.find(j => j.id === id)
    if (job && smsText) {
      setSmsToast({ customer: job.customer.split(' ')[0], text: smsText })
      setTimeout(() => setSmsToast(null), 4000)
    }
  }

  const enriched = myJobs.map(j => ({ ...j, status: getStatus(j) as JobStatus }))
  const active = enriched.filter(j => j.status !== 'completed')
  const done = enriched.filter(j => j.status === 'completed')

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
      <div className="bg-brand-surface border-b border-brand-border px-4 sm:px-6 py-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-brand-red/20 border-2 border-brand-red/30 flex items-center justify-center">
                <span className="font-heading text-xl font-900 text-brand-red">{mechanic.initials}</span>
              </div>
              <div>
                <div className="font-heading text-2xl font-900 uppercase text-brand-cream leading-tight">{mechanic.name}</div>
                <div className="text-xs text-brand-dim">{mechanic.role} · {mechanic.specialty}</div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-heading text-3xl font-900 text-brand-cream">{myJobs.length}</div>
            <div className="text-[10px] text-brand-dim uppercase tracking-widest">Jobs Today</div>
          </div>
        </div>
      </div>

      {/* Jobs */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* Active */}
        {active.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-brand-dim">Active Jobs</h2>
              <span className="text-[10px] bg-brand-muted border border-brand-border rounded-full px-2 py-0.5 text-brand-dim">{active.length}</span>
            </div>
            <div className="space-y-4">
              {active.map(job => (
                <JobCard key={job.id} job={job} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        {done.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-brand-dim">Completed Today</h2>
              <span className="text-[10px] bg-brand-muted border border-brand-border rounded-full px-2 py-0.5 text-brand-dim">{done.length}</span>
            </div>
            <div className="space-y-4">
              {done.map(job => (
                <JobCard key={job.id} job={job} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </div>
        )}

        {myJobs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-brand-dim text-5xl mb-4">🔧</div>
            <div className="font-heading text-lg uppercase text-brand-secondary">No jobs assigned today</div>
            <div className="text-sm text-brand-dim mt-1">Check back soon or contact the desk.</div>
          </div>
        )}
      </div>

      {/* SMS toast */}
      <AnimatePresence>
        {smsToast && (
          <SMSToast
            customer={smsToast.customer}
            text={smsToast.text}
            onClose={() => setSmsToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
