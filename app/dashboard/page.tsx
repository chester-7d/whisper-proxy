'use client'

import { useState, useRef, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, List, BarChart3, Users, Send, Megaphone,
  Plus, ChevronLeft, ChevronRight, Clock, User, Wrench,
  CheckCircle2, AlertCircle, Loader2, Package, BotMessageSquare,
  ThumbsUp, ThumbsDown, Pencil, Mail, X, LayoutGrid,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  JOBS, MECHANICS, SERVICES, ESTIMATE_REQUESTS, ESTIMATE_DRAFTS,
  PAST_CUSTOMERS, OUTREACH_DRAFTS, AI_SUGGESTIONS, KPI_DATA,
  SHOP_NAME, type Job, type JobStatus,
} from '@/lib/mock-data'
import { useSearchParams } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

// ─── helpers ────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<JobStatus, string> = {
  'booked':         'Booked',
  'in-progress':    'In Progress',
  'waiting-parts':  'Waiting on Parts',
  'completed':      'Completed',
}

const STATUS_COLORS: Record<JobStatus, string> = {
  'booked':         'booked',
  'in-progress':    'in-progress',
  'waiting-parts':  'waiting-parts',
  'completed':      'completed',
}

const WEEK_DAYS = ['Mon Apr 27', 'Tue Apr 28', 'Wed Apr 29', 'Thu Apr 30', 'Fri May 1', 'Sat May 2']

function statusBg(s: JobStatus) {
  if (s === 'booked')         return 'bg-blue-900/50 border-blue-700/60 text-blue-200'
  if (s === 'in-progress')    return 'bg-yellow-900/50 border-yellow-700/60 text-yellow-200'
  if (s === 'waiting-parts')  return 'bg-orange-900/50 border-orange-700/60 text-orange-200'
  if (s === 'completed')      return 'bg-green-900/50 border-green-700/60 text-green-200'
  return ''
}

// ─── Toast ──────────────────────────────────────────────────────────────────

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9000] bg-brand-surface border border-brand-border rounded-lg px-5 py-3 shadow-2xl flex items-center gap-3"
    >
      <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
      <span className="text-sm text-brand-cream">{msg}</span>
      <button onClick={onClose} className="ml-2 text-brand-dim hover:text-brand-cream"><X className="h-3.5 w-3.5" /></button>
    </motion.div>
  )
}

// ─── Job Detail Modal ────────────────────────────────────────────────────────

function JobModal({ job, onClose, onUpdate }: { job: Job; onClose: () => void; onUpdate: (id: string, changes: Partial<Job>) => void }) {
  const [status, setStatus] = useState<JobStatus>(job.status)
  const [bay, setBay] = useState(job.bay)
  const [mechanic, setMechanic] = useState(job.mechanic)

  function save() {
    onUpdate(job.id, { status, bay, mechanic })
    onClose()
  }

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>Job — {job.customer}</DialogTitle>
        <DialogDescription>{job.vehicle.year} {job.vehicle.make} {job.vehicle.model} · {job.service}</DialogDescription>
      </DialogHeader>

      <div className="space-y-4 mt-2">
        {/* Info rows */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            ['Date', job.date],
            ['Time', job.time],
            ['Duration', job.duration <= 0.5 ? '30 min' : `${job.duration} hr`],
            ['Phone', job.phone],
          ].map(([k, v]) => (
            <div key={k} className="bg-brand-muted rounded p-3">
              <div className="text-[10px] text-brand-dim uppercase tracking-widest mb-0.5">{k}</div>
              <div className="text-brand-cream font-medium">{v}</div>
            </div>
          ))}
        </div>

        {job.notes && (
          <div className="bg-brand-muted rounded p-3 text-sm">
            <div className="text-[10px] text-brand-dim uppercase tracking-widest mb-1">Customer Notes</div>
            <p className="text-brand-secondary">{job.notes}</p>
          </div>
        )}

        {/* Editable fields */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-widest mb-1.5 block">Status</Label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as JobStatus)}
              className="w-full h-9 rounded border border-brand-border bg-brand-muted text-brand-cream text-sm px-2 focus:outline-none focus:ring-1 focus:ring-brand-red"
            >
              {(Object.keys(STATUS_LABELS) as JobStatus[]).map(s => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-widest mb-1.5 block">Bay</Label>
            <select
              value={bay}
              onChange={e => setBay(Number(e.target.value))}
              className="w-full h-9 rounded border border-brand-border bg-brand-muted text-brand-cream text-sm px-2 focus:outline-none focus:ring-1 focus:ring-brand-red"
            >
              {[1,2,3,4].map(b => <option key={b} value={b}>Bay {b}</option>)}
            </select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-widest mb-1.5 block">Mechanic</Label>
            <select
              value={mechanic}
              onChange={e => setMechanic(e.target.value)}
              className="w-full h-9 rounded border border-brand-border bg-brand-muted text-brand-cream text-sm px-2 focus:outline-none focus:ring-1 focus:ring-brand-red"
            >
              {MECHANICS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
        <Button size="sm" onClick={save}>Save Changes</Button>
      </div>
    </DialogContent>
  )
}

// ─── Walk-In Modal ───────────────────────────────────────────────────────────

function WalkInModal({ onClose, onAdd }: { onClose: () => void; onAdd: (job: Partial<Job>) => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [year, setYear] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [serviceId, setServiceId] = useState(SERVICES[0].id)
  const [bay, setBay] = useState(1)
  const [mechanic, setMechanic] = useState('dusty')
  const [notes, setNotes] = useState('')

  function submit() {
    const svc = SERVICES.find(s => s.id === serviceId)!
    onAdd({
      customer: name, phone,
      vehicle: { year: Number(year), make, model },
      service: svc.name, serviceId,
      notes, bay, mechanic,
      date: '2026-04-27', time: '11:00',
      duration: svc.hours, status: 'booked',
    })
    onClose()
  }

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>Walk-In Entry</DialogTitle>
        <DialogDescription>Add an unscheduled customer to an open slot.</DialogDescription>
      </DialogHeader>

      <div className="space-y-4 mt-2">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input placeholder="Customer name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input placeholder="(306) 555-0100" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label>Year</Label>
            <Input placeholder="2021" value={year} onChange={e => setYear(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Make</Label>
            <Input placeholder="Ford" value={make} onChange={e => setMake(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Model</Label>
            <Input placeholder="F-150" value={model} onChange={e => setModel(e.target.value)} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Service</Label>
          <select
            value={serviceId}
            onChange={e => setServiceId(e.target.value)}
            className="w-full h-11 rounded border border-brand-border bg-brand-muted text-brand-cream text-sm px-3 focus:outline-none focus:ring-1 focus:ring-brand-red"
          >
            {SERVICES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="block mb-1.5">Bay</Label>
            <select value={bay} onChange={e => setBay(Number(e.target.value))} className="w-full h-9 rounded border border-brand-border bg-brand-muted text-brand-cream text-sm px-2 focus:outline-none focus:ring-1 focus:ring-brand-red">
              {[1,2,3,4].map(b => <option key={b} value={b}>Bay {b}</option>)}
            </select>
          </div>
          <div>
            <Label className="block mb-1.5">Mechanic</Label>
            <select value={mechanic} onChange={e => setMechanic(e.target.value)} className="w-full h-9 rounded border border-brand-border bg-brand-muted text-brand-cream text-sm px-2 focus:outline-none focus:ring-1 focus:ring-brand-red">
              {MECHANICS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Notes</Label>
          <Textarea placeholder="Any relevant details..." value={notes} onChange={e => setNotes(e.target.value)} className="min-h-[80px]" />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
        <Button size="sm" onClick={submit} disabled={!name || !year || !make}>Add Walk-In</Button>
      </div>
    </DialogContent>
  )
}

// ─── Calendar Tab ────────────────────────────────────────────────────────────

function CalendarView({ jobs, onJobClick }: { jobs: Job[]; onJobClick: (j: Job) => void }) {
  const [view, setView] = useState<'week' | 'list'>('week')
  const todayJobs = jobs.filter(j => j.date === '2026-04-27')
  const weekJobs = jobs.filter(j => j.date <= '2026-05-02')

  const jobsByDayAndBay = (day: string, bay: number) =>
    jobs.filter(j => j.date === day.split(' ').slice(1).join(' ').replace('Apr', 'Apr').replace('May', 'May') && j.bay === bay)

  const dateMap: Record<string, string> = {
    'Mon Apr 27': '2026-04-27',
    'Tue Apr 28': '2026-04-28',
    'Wed Apr 29': '2026-04-29',
    'Thu Apr 30': '2026-04-30',
    'Fri May 1':  '2026-05-01',
    'Sat May 2':  '2026-05-02',
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-heading text-xl font-700 uppercase text-brand-cream">Schedule</h2>
          <span className="text-xs text-brand-dim bg-brand-muted border border-brand-border rounded px-2 py-0.5">Week of Apr 27</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setView('week')} className={`p-1.5 rounded border transition-colors ${view === 'week' ? 'border-brand-red bg-brand-red/10 text-brand-red' : 'border-brand-border text-brand-dim hover:text-brand-cream'}`}>
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button onClick={() => setView('list')} className={`p-1.5 rounded border transition-colors ${view === 'list' ? 'border-brand-red bg-brand-red/10 text-brand-red' : 'border-brand-border text-brand-dim hover:text-brand-cream'}`}>
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {(['booked', 'in-progress', 'waiting-parts', 'completed'] as JobStatus[]).map(s => (
          <div key={s} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${statusBg(s)}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {STATUS_LABELS[s]}
          </div>
        ))}
      </div>

      {view === 'week' ? (
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header row */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              <div className="text-[10px] font-heading uppercase tracking-widest text-brand-dim py-2 px-2">Bay</div>
              {WEEK_DAYS.map(d => (
                <div key={d} className={`text-[10px] font-heading uppercase tracking-widest py-2 px-2 ${d === 'Mon Apr 27' ? 'text-brand-red' : 'text-brand-dim'}`}>
                  {d}
                </div>
              ))}
            </div>
            {/* Bay rows */}
            {[1,2,3,4].map(bay => (
              <div key={bay} className="grid grid-cols-7 gap-1 mb-1">
                <div className="flex items-start py-2 px-2">
                  <span className="text-xs font-heading uppercase tracking-widest text-brand-secondary">Bay {bay}</span>
                </div>
                {WEEK_DAYS.map(day => {
                  const dayJobs = jobs.filter(j => j.date === dateMap[day] && j.bay === bay)
                  return (
                    <div key={day} className="min-h-[70px] bg-brand-muted/30 border border-brand-border/30 rounded p-1 space-y-1">
                      {dayJobs.map(job => (
                        <button
                          key={job.id}
                          onClick={() => onJobClick(job)}
                          className={`w-full text-left rounded px-1.5 py-1 border text-[10px] font-medium leading-tight transition-all hover:brightness-125 ${statusBg(job.status)}`}
                        >
                          <div className="font-bold truncate">{job.customer.split(' ')[0]}</div>
                          <div className="opacity-75 truncate">{job.service.split(' ').slice(0,2).join(' ')}</div>
                          <div className="opacity-60">{job.time}</div>
                        </button>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {jobs.slice(0, 12).map(job => (
            <button
              key={job.id}
              onClick={() => onJobClick(job)}
              className="w-full text-left bg-brand-surface border border-brand-border hover:border-brand-dim rounded-lg px-4 py-3 flex flex-wrap gap-3 items-center transition-colors"
            >
              <Badge variant={STATUS_COLORS[job.status] as 'booked' | 'in-progress' | 'waiting-parts' | 'completed'} className="shrink-0">
                {STATUS_LABELS[job.status]}
              </Badge>
              <span className="font-heading text-sm font-700 uppercase text-brand-cream">{job.customer}</span>
              <span className="text-xs text-brand-secondary">{job.vehicle.year} {job.vehicle.make} {job.vehicle.model}</span>
              <span className="text-xs text-brand-dim">{job.service}</span>
              <span className="ml-auto text-xs text-brand-dim shrink-0">Bay {job.bay} · {MECHANICS.find(m=>m.id===job.mechanic)?.name} · {job.date} {job.time}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── AI Panel ────────────────────────────────────────────────────────────────

function AIPanel({ suggestions, onApprove, onDismiss }: {
  suggestions: typeof AI_SUGGESTIONS
  onApprove: (id: string) => void
  onDismiss: (id: string) => void
}) {
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Good morning! I've analyzed today's schedule. I have 3 optimization suggestions ready. Check the cards below, or ask me anything about today's workload." }
  ])

  function send() {
    if (!chatInput.trim()) return
    const userMsg = chatInput.trim()
    setChatInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setTimeout(() => {
      const responses: Record<string, string> = {
        default: "I can see Bay 3 has a gap opening up. With current booking load, I estimate you'll finish today's schedule by 4:45 PM assuming no unexpected delays.",
        efficiency: "Today's shop efficiency is tracking at 87%. Bay 2 is your bottleneck — the brake job is estimated to run 20 minutes over.",
        tomorrow: "Tomorrow looks lighter — 3 jobs across 4 bays. Bay 1 and 3 have open morning slots. Good day to fit in a walk-in or two.",
      }
      const key = userMsg.toLowerCase().includes('tomorrow') ? 'tomorrow' : userMsg.toLowerCase().includes('efficiency') ? 'efficiency' : 'default'
      setMessages(prev => [...prev, { role: 'assistant', text: responses[key] }])
    }, 800)
  }

  const active = suggestions.filter(s => !s.dismissed)

  return (
    <div className="flex flex-col h-full min-h-[500px] bg-brand-surface border border-brand-border rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-brand-border bg-brand-muted/50">
        <BotMessageSquare className="h-4 w-4 text-brand-amber" />
        <span className="font-heading text-sm font-700 uppercase tracking-widest text-brand-cream">AI Scheduling Assistant</span>
        {active.length > 0 && (
          <span className="ml-auto text-xs bg-brand-amber/20 text-brand-amber border border-brand-amber/30 rounded-full px-2 py-0.5">
            {active.length} suggestions
          </span>
        )}
      </div>

      {/* Suggestions */}
      {active.length > 0 && (
        <div className="p-3 space-y-2 border-b border-brand-border">
          {active.map(s => (
            <div key={s.id} className="bg-brand-muted border border-brand-amber/20 rounded-lg p-3">
              <p className="text-xs text-brand-secondary leading-relaxed mb-2">{s.message}</p>
              <div className="flex gap-2">
                <button onClick={() => onApprove(s.id)} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-green-900/40 text-green-300 border border-green-700/50 hover:bg-green-900/60 transition-colors">
                  <ThumbsUp className="h-3 w-3" /> Approve
                </button>
                <button onClick={() => onDismiss(s.id)} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-brand-muted text-brand-dim border border-brand-border hover:text-brand-cream transition-colors">
                  <ThumbsDown className="h-3 w-3" /> Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
              m.role === 'user'
                ? 'bg-brand-red/20 border border-brand-red/30 text-brand-cream'
                : 'bg-brand-muted border border-brand-border text-brand-secondary'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-brand-border flex gap-2">
        <Input
          className="flex-1 h-9 text-xs"
          placeholder="Ask about today's schedule..."
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') send() }}
        />
        <Button size="sm" className="shrink-0 h-9 w-9 p-0" onClick={send}>
          <Send className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}

// ─── Estimates Tab ───────────────────────────────────────────────────────────

function EstimatesTab({ toast }: { toast: (m: string) => void }) {
  const [estimates, setEstimates] = useState(ESTIMATE_REQUESTS)
  const [draft, setDraft] = useState<{ id: string; text: string } | null>(null)
  const [editing, setEditing] = useState(false)

  function openDraft(id: string) {
    setDraft({ id, text: ESTIMATE_DRAFTS[id] || 'No draft available.' })
    setEditing(false)
  }

  function approve() {
    if (!draft) return
    setEstimates(prev => prev.map(e => e.id === draft.id ? { ...e, status: 'sent' } : e))
    toast('Estimate marked as sent!')
    setDraft(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-700 uppercase text-brand-cream">Estimate Requests</h2>
        <Badge variant="amber">{estimates.filter(e => e.status === 'pending').length} Pending</Badge>
      </div>

      <div className="space-y-2">
        {estimates.map(est => (
          <div key={est.id} className="bg-brand-surface border border-brand-border rounded-lg px-4 py-3 flex flex-wrap gap-3 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="font-heading text-sm font-700 uppercase text-brand-cream">{est.customer}</div>
              <div className="text-xs text-brand-secondary mt-0.5">{est.vehicle} · {est.service}</div>
              <div className="text-[10px] text-brand-dim mt-0.5">Received {est.submitted}</div>
            </div>
            <Badge variant={est.status === 'sent' ? 'completed' : 'amber'}>
              {est.status === 'sent' ? 'Sent' : 'Pending'}
            </Badge>
            {est.status === 'pending' && ESTIMATE_DRAFTS[est.id] && (
              <Button size="sm" variant="dark" onClick={() => openDraft(est.id)} className="gap-1.5 shrink-0">
                <BotMessageSquare className="h-3.5 w-3.5 text-brand-amber" />
                AI Draft
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Draft modal */}
      <Dialog open={!!draft} onOpenChange={(o) => { if (!o) setDraft(null) }}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>AI-Generated Estimate Draft</DialogTitle>
            <DialogDescription>Review, edit, or approve before sending to the customer.</DialogDescription>
          </DialogHeader>
          {draft && (
            <div className="space-y-3 mt-2">
              {editing ? (
                <Textarea
                  className="min-h-[220px] text-sm"
                  value={draft.text}
                  onChange={e => setDraft(d => d ? { ...d, text: e.target.value } : null)}
                />
              ) : (
                <div className="bg-brand-muted border border-brand-border rounded-lg p-4 text-sm text-brand-secondary whitespace-pre-wrap leading-relaxed">
                  {draft.text}
                </div>
              )}
              <div className="flex gap-2 justify-end">
                <Button size="sm" variant="outline" onClick={() => setEditing(e => !e)}>
                  <Pencil className="h-3.5 w-3.5 mr-1" />{editing ? 'Preview' : 'Edit'}
                </Button>
                <Button size="sm" variant="dark" onClick={() => setDraft(null)}>Discard</Button>
                <Button size="sm" onClick={approve}>
                  <Mail className="h-3.5 w-3.5 mr-1" />Approve & Send
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ─── Foreman Tab ─────────────────────────────────────────────────────────────

function ForemanTab() {
  const { bays, weeklyBillableHours, shopEfficiency } = KPI_DATA

  return (
    <div className="space-y-6">
      {/* Efficiency score */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1 bg-brand-red/10 border border-brand-red/30 rounded-lg p-5 flex flex-col items-center justify-center text-center">
          <div className="font-heading text-[5rem] font-900 leading-none text-brand-red">{shopEfficiency}%</div>
          <div className="text-xs font-heading uppercase tracking-widest text-brand-secondary mt-1">Overall Shop Efficiency</div>
          <div className="text-[10px] text-brand-dim mt-1">Today · Live</div>
        </div>
        <div className="sm:col-span-2 grid grid-cols-2 gap-3">
          {bays.map(b => (
            <div key={b.bay} className={`rounded-lg border p-4 ${b.overTime ? 'border-red-700/60 bg-red-900/20' : 'border-brand-border bg-brand-surface'}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-heading text-sm font-700 uppercase text-brand-cream">Bay {b.bay}</div>
                  <div className="text-[10px] text-brand-dim">{b.mechanic}</div>
                </div>
                <Badge variant={STATUS_COLORS[b.currentStatus] as 'booked' | 'in-progress' | 'waiting-parts' | 'completed'} className="text-[9px]">
                  {STATUS_LABELS[b.currentStatus]}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[
                  ['Jobs', b.jobsToday.toString()],
                  ['Hrs', b.billableHours.toFixed(1)],
                  ['Avg', `${(b.avgDuration * 60).toFixed(0)}m`],
                ].map(([k, v]) => (
                  <div key={k} className="text-center">
                    <div className="font-heading text-lg font-800 text-brand-cream">{v}</div>
                    <div className="text-[9px] text-brand-dim uppercase tracking-widest">{k}</div>
                  </div>
                ))}
              </div>
              {b.overTime && (
                <div className="flex items-center gap-1 mt-2 text-[10px] text-red-400">
                  <AlertCircle className="h-3 w-3" /> Running over estimate
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly billable hours chart */}
      <div className="bg-brand-surface border border-brand-border rounded-lg p-5">
        <h3 className="font-heading text-sm font-700 uppercase tracking-widest text-brand-cream mb-5">Billable Hours — This Week</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyBillableHours} barSize={36}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#606060', fontSize: 11, fontFamily: 'var(--font-heading)' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#606060', fontSize: 10 }} domain={[0, 40]} />
            <Tooltip
              contentStyle={{ background: '#1A1A1A', border: '1px solid #282828', borderRadius: 6, fontSize: 12 }}
              labelStyle={{ color: '#F0EDE8', fontWeight: 700 }}
              itemStyle={{ color: '#A0A09A' }}
              formatter={(v: number) => [`${v} hrs`, 'Billable']}
            />
            <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
              {weeklyBillableHours.map((_, i) => (
                <Cell key={i} fill={i === 0 ? '#C81A1A' : '#282828'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ─── Outreach Tab ─────────────────────────────────────────────────────────────

function OutreachTab({ toast }: { toast: (m: string) => void }) {
  const [sent, setSent] = useState<Set<string>>(new Set())
  const [draft, setDraft] = useState<{ id: string; name: string; text: string } | null>(null)
  const [editing, setEditing] = useState(false)
  const [campaignSent, setCampaignSent] = useState(false)

  const CAMPAIGN_DRAFT = "🛞 WINTER TIRE SPECIAL — Save 10% on tire installation this month at Janzen & Gand Auto! Limited spots available. Reply BOOK to schedule. Valid through end of May. – The J&G Team"

  function openDraft(id: string, name: string) {
    setDraft({ id, name, text: OUTREACH_DRAFTS[id] })
    setEditing(false)
  }

  function sendReminder() {
    if (!draft) return
    setSent(prev => new Set([...prev, draft.id]))
    toast(`Reminder sent to ${draft.name}!`)
    setDraft(null)
  }

  return (
    <div className="space-y-6">
      {/* Campaign */}
      <div className="bg-brand-amber/8 border border-brand-amber/30 rounded-lg p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Megaphone className="h-4 w-4 text-brand-amber" />
              <span className="font-heading text-sm font-700 uppercase tracking-widest text-brand-cream">Seasonal Campaign</span>
            </div>
            <p className="text-xs text-brand-secondary">Winter Tire Special · May 2026 · Draft SMS blast to all past customers</p>
          </div>
          <Button size="sm" variant="amber" onClick={() => { setCampaignSent(true); toast('Campaign sent to 8 customers!') }} disabled={campaignSent}>
            {campaignSent ? <><CheckCircle2 className="h-3.5 w-3.5 mr-1" />Sent</> : 'Send Campaign'}
          </Button>
        </div>
        <div className="bg-brand-muted border border-brand-border rounded p-3 text-sm text-brand-secondary leading-relaxed">
          {CAMPAIGN_DRAFT}
        </div>
        {campaignSent && <p className="text-xs text-green-400 mt-2">✅ Campaign sent to 8 past customers.</p>}
      </div>

      {/* Individual reminders */}
      <div>
        <h3 className="font-heading text-sm font-700 uppercase tracking-widest text-brand-cream mb-3">Individual Reminders</h3>
        <div className="space-y-2">
          {PAST_CUSTOMERS.map(c => (
            <div key={c.id} className="bg-brand-surface border border-brand-border rounded-lg px-4 py-3 flex flex-wrap gap-3 items-center">
              <div className="flex-1 min-w-[180px]">
                <div className="font-heading text-sm font-700 uppercase text-brand-cream">{c.name}</div>
                <div className="text-xs text-brand-secondary">{c.vehicle} · {c.lastService}</div>
                <div className="text-[10px] text-brand-dim">{c.monthsAgo} months ago · {c.lastDate}</div>
              </div>
              {sent.has(c.id) ? (
                <Badge variant="completed"><CheckCircle2 className="h-3 w-3 mr-1" />Sent</Badge>
              ) : (
                <Button size="sm" variant="dark" onClick={() => openDraft(c.id, c.name)} className="gap-1.5 shrink-0">
                  <BotMessageSquare className="h-3.5 w-3.5 text-brand-amber" />
                  AI Draft
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Draft modal */}
      <Dialog open={!!draft} onOpenChange={o => { if (!o) setDraft(null) }}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>AI-Generated Reminder</DialogTitle>
            <DialogDescription>Review before sending to {draft?.name}.</DialogDescription>
          </DialogHeader>
          {draft && (
            <div className="space-y-3 mt-2">
              {editing ? (
                <Textarea className="min-h-[120px] text-sm" value={draft.text} onChange={e => setDraft(d => d ? { ...d, text: e.target.value } : null)} />
              ) : (
                <div className="bg-brand-muted border border-brand-border rounded-lg p-4 text-sm text-brand-secondary leading-relaxed">{draft.text}</div>
              )}
              <div className="flex gap-2 justify-end">
                <Button size="sm" variant="outline" onClick={() => setEditing(e => !e)}>
                  <Pencil className="h-3.5 w-3.5 mr-1" />{editing ? 'Preview' : 'Edit'}
                </Button>
                <Button size="sm" variant="dark" onClick={() => setDraft(null)}>Discard</Button>
                <Button size="sm" onClick={sendReminder}>
                  <Send className="h-3.5 w-3.5 mr-1" />Send Reminder
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────

function DashboardContent() {
  const params = useSearchParams()
  const defaultTab = params?.get('tab') || 'calendar'

  const [jobs, setJobs] = useState<Job[]>(JOBS)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showWalkIn, setShowWalkIn] = useState(false)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState(AI_SUGGESTIONS)

  function showToast(msg: string) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  function updateJob(id: string, changes: Partial<Job>) {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, ...changes } : j))
    showToast('Job updated successfully!')
  }

  function addWalkIn(job: Partial<Job>) {
    const newJob: Job = {
      ...job,
      id: `walk-${Date.now()}`,
    } as Job
    setJobs(prev => [...prev, newJob])
    showToast('Walk-in added to schedule!')
  }

  function approveSuggestion(id: string) {
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, dismissed: true } : s))
    showToast('Schedule change approved and applied!')
  }
  function dismissSuggestion(id: string) {
    setSuggestions(prev => prev.map(s => s.id === id ? { ...s, dismissed: true } : s))
  }

  const todayJobs = jobs.filter(j => j.date === '2026-04-27')
  const pendingEstimates = ESTIMATE_REQUESTS.filter(e => e.status === 'pending').length

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Top bar */}
      <div className="h-16 bg-brand-surface border-b border-brand-border flex items-center px-4 sm:px-6 gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center">
            <Wrench className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="font-heading text-base font-800 uppercase tracking-wide text-brand-cream leading-tight">{SHOP_NAME}</div>
            <div className="text-[10px] text-brand-dim uppercase tracking-widest">Internal Dashboard</div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-brand-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Mon Apr 27, 2026
          </div>
          <div className="text-xs text-brand-secondary hidden sm:block">
            {todayJobs.length} jobs today
          </div>
          <Button size="sm" variant="outline" onClick={() => setShowWalkIn(true)} className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />Walk-In
          </Button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        <Tabs defaultValue={defaultTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="calendar">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />Schedule
            </TabsTrigger>
            <TabsTrigger value="estimates">
              <Mail className="h-3.5 w-3.5 mr-1.5" />Estimates
              {pendingEstimates > 0 && (
                <span className="ml-1.5 text-[9px] bg-brand-amber/30 text-brand-amber rounded-full px-1.5 py-0.5">{pendingEstimates}</span>
              )}
            </TabsTrigger>
            <TabsTrigger value="foreman">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5" />Foreman KPI
            </TabsTrigger>
            <TabsTrigger value="outreach">
              <Megaphone className="h-3.5 w-3.5 mr-1.5" />Outreach
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
              <CalendarView jobs={jobs} onJobClick={setSelectedJob} />
              <AIPanel suggestions={suggestions} onApprove={approveSuggestion} onDismiss={dismissSuggestion} />
            </div>
          </TabsContent>

          <TabsContent value="estimates">
            <EstimatesTab toast={showToast} />
          </TabsContent>

          <TabsContent value="foreman">
            <ForemanTab />
          </TabsContent>

          <TabsContent value="outreach">
            <OutreachTab toast={showToast} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <Dialog open={!!selectedJob} onOpenChange={o => { if (!o) setSelectedJob(null) }}>
        {selectedJob && (
          <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} onUpdate={updateJob} />
        )}
      </Dialog>

      <Dialog open={showWalkIn} onOpenChange={setShowWalkIn}>
        <WalkInModal onClose={() => setShowWalkIn(false)} onAdd={addWalkIn} />
      </Dialog>

      {/* Toast */}
      <AnimatePresence>
        {toastMsg && <Toast msg={toastMsg} onClose={() => setToastMsg(null)} />}
      </AnimatePresence>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-black flex items-center justify-center text-brand-secondary">
        Loading dashboard…
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
