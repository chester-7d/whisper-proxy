// All dates relative to April 27, 2026
export const SHOP_NAME = 'Janzen & Gand Auto'
export const SHOP_PHONE = '(306) 555-0182'
export const SHOP_EMAIL = 'service@janzengandauto.com'
export const SHOP_ADDRESS = '412 Industrial Ave, Saskatoon, SK S7K 2H6'
export const SHOP_HOURS = {
  'Mon–Fri': '8:00 AM – 5:30 PM',
  'Saturday': '9:00 AM – 3:00 PM',
  'Sunday': 'Closed',
}

export const SERVICES = [
  { id: 'oil-change',         name: 'Oil Change',                hours: 0.5, minPrice: 59,  maxPrice: 89,  icon: 'Droplets',    desc: 'Full synthetic or conventional oil change with filter replacement and multi-point inspection.' },
  { id: 'tire-rotation',      name: 'Tire Rotation',             hours: 0.5, minPrice: 29,  maxPrice: 49,  icon: 'RotateCw',    desc: 'Rotate tires to even wear and extend tread life. Includes pressure check and visual inspection.' },
  { id: 'tire-install',       name: 'Tire Install (Set of 4)',   hours: 1.0, minPrice: 80,  maxPrice: 120, icon: 'Circle',      desc: 'Mount and balance a full set of four tires. Old tires disposed of responsibly.' },
  { id: 'brake-job',          name: 'Brake Job (Pads + Rotors)', hours: 1.5, minPrice: 299, maxPrice: 499, icon: 'Disc',        desc: 'Front or rear brake pad and rotor replacement. Includes brake fluid top-up and road test.' },
  { id: 'tune-up',            name: 'Tune-Up',                   hours: 1.0, minPrice: 149, maxPrice: 249, icon: 'Zap',         desc: 'Spark plugs, air filter, fuel filter check, ignition system inspection.' },
  { id: 'diagnostics',        name: 'Diagnostics',               hours: 1.0, minPrice: 99,  maxPrice: 149, icon: 'Cpu',         desc: 'Full OBD-II scan, live data analysis, and written report with recommended repairs.' },
  { id: 'fuel-system',        name: 'Fuel System Service',       hours: 1.0, minPrice: 129, maxPrice: 179, icon: 'Fuel',        desc: 'Fuel injector cleaning, throttle body service, and fuel pressure test.' },
  { id: 'spark-plugs',        name: 'Spark Plugs',               hours: 0.5, minPrice: 79,  maxPrice: 149, icon: 'Flame',       desc: 'Iridium or standard spark plug replacement with gap check and torque to spec.' },
  { id: 'wheel-alignment',    name: 'Wheel Alignment',           hours: 1.0, minPrice: 89,  maxPrice: 129, icon: 'AlignCenter', desc: 'Computer-assisted 4-wheel alignment to manufacturer specifications.' },
  { id: 'battery-replacement',name: 'Battery Replacement',       hours: 0.5, minPrice: 149, maxPrice: 249, icon: 'Battery',     desc: 'Battery load test, replacement with premium battery, and charging system check.' },
]

export const MECHANICS = [
  { id: 'dusty',  name: 'Dusty',  role: 'Senior Technician',   years: 14, specialty: 'Diesel & Drivetrains',   initials: 'D' },
  { id: 'latent', name: 'Latent', role: 'Lead Technician',     years: 9,  specialty: 'Electrical & Diagnostics', initials: 'L' },
  { id: 'matt',   name: 'Matt',   role: 'Technician',          years: 6,  specialty: 'Tires & Brakes',          initials: 'M' },
  { id: 'taylor', name: 'Taylor', role: 'Junior Technician',   years: 3,  specialty: 'Oil Service & Tune-Ups',  initials: 'T' },
]

export const BAYS = [1, 2, 3, 4]

export type JobStatus = 'booked' | 'in-progress' | 'waiting-parts' | 'completed'

export interface Job {
  id: string
  customer: string
  phone: string
  vehicle: { year: number; make: string; model: string }
  service: string
  serviceId: string
  notes: string
  bay: number
  mechanic: string
  date: string   // YYYY-MM-DD
  time: string   // HH:MM
  duration: number // hours
  status: JobStatus
  estimate?: boolean
}

export const JOBS: Job[] = [
  { id: 'j1',  customer: 'John Smith',      phone: '(306) 555-0110', vehicle: { year: 2021, make: 'Ford',      model: 'F-150'         }, service: 'Oil Change',                serviceId: 'oil-change',          notes: 'Prefers synthetic. Last change at 85k km.',                    bay: 1, mechanic: 'dusty',  date: '2026-04-27', time: '08:00', duration: 0.5, status: 'in-progress'  },
  { id: 'j2',  customer: 'Sarah Johnson',   phone: '(306) 555-0221', vehicle: { year: 2019, make: 'Toyota',    model: 'Camry'         }, service: 'Brake Job (Pads + Rotors)', serviceId: 'brake-job',           notes: 'Grinding noise from front left. Check rear too.',              bay: 2, mechanic: 'matt',   date: '2026-04-27', time: '09:00', duration: 1.5, status: 'booked'       },
  { id: 'j3',  customer: 'Mike Davis',      phone: '(306) 555-0334', vehicle: { year: 2022, make: 'Ram',       model: '1500'          }, service: 'Tire Install (Set of 4)',   serviceId: 'tire-install',        notes: 'Switching to winter tires. Rims already off.',                 bay: 3, mechanic: 'latent', date: '2026-04-27', time: '10:30', duration: 1.0, status: 'waiting-parts'},
  { id: 'j4',  customer: 'Emily Chen',      phone: '(306) 555-0445', vehicle: { year: 2018, make: 'Honda',     model: 'Civic'         }, service: 'Tune-Up',                   serviceId: 'tune-up',             notes: 'Check engine light on. Last tune-up 3 years ago.',             bay: 4, mechanic: 'taylor', date: '2026-04-27', time: '11:00', duration: 1.0, status: 'booked'       },
  { id: 'j5',  customer: 'Bob Wilson',      phone: '(306) 555-0556', vehicle: { year: 2020, make: 'Chevrolet', model: 'Silverado'     }, service: 'Diagnostics',               serviceId: 'diagnostics',         notes: 'Transmission shudder at highway speed.',                       bay: 1, mechanic: 'dusty',  date: '2026-04-28', time: '08:00', duration: 1.0, status: 'booked'       },
  { id: 'j6',  customer: 'Lisa Anderson',   phone: '(306) 555-0667', vehicle: { year: 2017, make: 'Subaru',    model: 'Outback'       }, service: 'Oil Change',                serviceId: 'oil-change',          notes: '5W-30 full synthetic. Customer waits.',                        bay: 2, mechanic: 'matt',   date: '2026-04-28', time: '09:30', duration: 0.5, status: 'booked'       },
  { id: 'j7',  customer: 'James Martinez',  phone: '(306) 555-0778', vehicle: { year: 2021, make: 'Toyota',    model: 'Tundra'        }, service: 'Wheel Alignment',           serviceId: 'wheel-alignment',     notes: 'Pulling right since hitting pothole last month.',              bay: 3, mechanic: 'latent', date: '2026-04-29', time: '10:00', duration: 1.0, status: 'booked'       },
  { id: 'j8',  customer: 'Karen White',     phone: '(306) 555-0889', vehicle: { year: 2023, make: 'Kia',       model: 'Seltos'        }, service: 'Battery Replacement',       serviceId: 'battery-replacement', notes: "Won't start on cold mornings.",                                bay: 4, mechanic: 'taylor', date: '2026-04-29', time: '08:30', duration: 0.5, status: 'booked'       },
  { id: 'j9',  customer: 'Tom Brown',       phone: '(306) 555-0990', vehicle: { year: 2016, make: 'Ford',      model: 'Mustang'       }, service: 'Fuel System Service',       serviceId: 'fuel-system',         notes: 'Hard starting and rough idle. 95k km on original injectors.',  bay: 1, mechanic: 'dusty',  date: '2026-05-01', time: '09:00', duration: 1.0, status: 'booked'       },
  { id: 'j10', customer: 'Rachel Lee',      phone: '(306) 555-1001', vehicle: { year: 2020, make: 'Honda',     model: 'CR-V'          }, service: 'Spark Plugs',               serviceId: 'spark-plugs',         notes: 'Using NGK iridium as per customer request.',                   bay: 2, mechanic: 'matt',   date: '2026-05-01', time: '10:00', duration: 0.5, status: 'booked'       },
  { id: 'j11', customer: 'David Garcia',    phone: '(306) 555-1112', vehicle: { year: 2019, make: 'Nissan',    model: 'Altima'        }, service: 'Tire Rotation',             serviceId: 'tire-rotation',       notes: 'Cross-rotate. Visual inspection of tread wear.',               bay: 3, mechanic: 'latent', date: '2026-05-04', time: '11:00', duration: 0.5, status: 'booked'       },
  { id: 'j12', customer: 'Amy Taylor',      phone: '(306) 555-1223', vehicle: { year: 2022, make: 'Jeep',      model: 'Grand Cherokee' }, service: 'Brake Job (Pads + Rotors)', serviceId: 'brake-job',          notes: 'Squealing at low speed. Full 4-corner inspection.',            bay: 4, mechanic: 'taylor', date: '2026-05-04', time: '08:30', duration: 1.5, status: 'booked'       },
]

export const ESTIMATE_REQUESTS = [
  { id: 'e1', customer: 'Patrick O\'Brien',  vehicle: '2018 Dodge Charger',     service: 'Diagnostics + possible engine work', submitted: '2026-04-26', status: 'pending',  phone: '(306) 555-2001' },
  { id: 'e2', customer: 'Diane Hoffman',     vehicle: '2020 Toyota RAV4',        service: 'Transmission fluid service',         submitted: '2026-04-26', status: 'pending',  phone: '(306) 555-2002' },
  { id: 'e3', customer: 'Marcus Ellis',      vehicle: '2015 Ford F-250',         service: 'Full brake job + alignment',         submitted: '2026-04-25', status: 'sent',     phone: '(306) 555-2003' },
  { id: 'e4', customer: 'Priya Patel',       vehicle: '2021 Honda Accord',       service: 'Wheel alignment + tire rotation',    submitted: '2026-04-25', status: 'pending',  phone: '(306) 555-2004' },
  { id: 'e5', customer: 'Greg Simmons',      vehicle: '2017 Chevrolet Traverse', service: 'AC service + cabin filter',          submitted: '2026-04-24', status: 'sent',     phone: '(306) 555-2005' },
]

export const ESTIMATE_DRAFTS: Record<string, string> = {
  e1: `Hi Patrick,\n\nThank you for reaching out to Janzen & Gand Auto.\n\nBased on your description of your 2018 Dodge Charger, we recommend starting with a full diagnostic scan ($99–$149) to identify the root cause before recommending engine work. Engine repairs vary widely in scope — we'll give you a complete written breakdown after the scan with no obligation.\n\nEstimated time: 1–2 hours for initial diagnostics.\n\nWe have availability this week. Reply or call us at (306) 555-0182 to book.\n\nJanzen & Gand Auto`,
  e2: `Hi Diane,\n\nThanks for your inquiry about your 2020 Toyota RAV4.\n\nA transmission fluid service typically runs $149–$199 and takes approximately 1 hour. We use OEM-spec fluids and perform a full visual inspection of the transmission and cooling lines as part of the service.\n\nWe have Thursday morning available. Give us a call at (306) 555-0182 to confirm.\n\nJanzen & Gand Auto`,
  e4: `Hi Priya,\n\nThank you for contacting Janzen & Gand Auto about your 2021 Honda Accord.\n\nWe can bundle your wheel alignment ($89–$129) and tire rotation ($29–$49) for a combined estimate of $109–$169 — a saving of about $10 versus booking separately. Total time: approximately 1.5 hours.\n\nWe have openings Monday and Wednesday this week. Call us at (306) 555-0182 to book.\n\nJanzen & Gand Auto`,
}

export const PAST_CUSTOMERS = [
  { id: 'pc1', name: 'Alice Cooper',      vehicle: '2020 Nissan Sentra',       lastService: 'Oil Change',           lastDate: '2025-10-14', phone: '(306) 555-3001', monthsAgo: 6 },
  { id: 'pc2', name: 'Robert Hall',       vehicle: '2018 Ford Explorer',       lastService: 'Brake Job',            lastDate: '2025-08-22', phone: '(306) 555-3002', monthsAgo: 8 },
  { id: 'pc3', name: 'Jessica Nguyen',    vehicle: '2021 Honda Pilot',         lastService: 'Tire Rotation',        lastDate: '2025-11-03', phone: '(306) 555-3003', monthsAgo: 5 },
  { id: 'pc4', name: 'Chris Adams',       vehicle: '2019 Toyota 4Runner',      lastService: 'Tune-Up',              lastDate: '2025-09-17', phone: '(306) 555-3004', monthsAgo: 7 },
  { id: 'pc5', name: 'Melissa Scott',     vehicle: '2017 Chevrolet Equinox',   lastService: 'Diagnostics',          lastDate: '2025-10-30', phone: '(306) 555-3005', monthsAgo: 6 },
  { id: 'pc6', name: 'Daniel Kim',        vehicle: '2022 Subaru Forester',     lastService: 'Oil Change',           lastDate: '2025-12-09', phone: '(306) 555-3006', monthsAgo: 5 },
  { id: 'pc7', name: 'Jennifer Lewis',    vehicle: '2020 Mazda CX-5',          lastService: 'Wheel Alignment',      lastDate: '2025-07-18', phone: '(306) 555-3007', monthsAgo: 9 },
  { id: 'pc8', name: 'Mark Thompson',     vehicle: '2018 Dodge Ram',           lastService: 'Fuel System Service',  lastDate: '2025-04-20', phone: '(306) 555-3008', monthsAgo: 12 },
]

export const OUTREACH_DRAFTS: Record<string, string> = {
  pc1: "Hi Alice! 👋 It's been about 6 months since your last oil change at Janzen & Gand Auto. Time for your next one! Give us a call at (306) 555-0182 or reply BOOK to schedule. We'll have you back on the road fast. – The J&G Team",
  pc2: "Hi Robert! We noticed it's been 8 months since your brake service at Janzen & Gand Auto. Winter road conditions can be tough on brakes — let us take a look. Call (306) 555-0182 or reply BOOK to book a free brake inspection. – The J&G Team",
  pc3: "Hey Jessica! Your Honda Pilot is due for another tire rotation — it's been about 5 months. Keep that tread wearing evenly! Book online or call us at (306) 555-0182. – Janzen & Gand Auto",
  pc4: "Hi Chris! It's been 7 months since your tune-up at J&G Auto. How's the 4Runner running? If you're noticing any roughness or hesitation, we'd love to take a look. Call (306) 555-0182 anytime. – The J&G Team",
  pc5: "Hi Melissa! We wanted to follow up — it's been 6 months since your diagnostic visit. If any warning lights have come back or you're experiencing new issues, bring the Equinox by. We're here Mon–Sat. – Janzen & Gand Auto",
  pc6: "Hey Daniel! Your Forester is coming up on another oil change interval. Full synthetic keeps that Boxer engine happy 🔧 Book your spot at (306) 555-0182. – The J&G Team",
  pc7: "Hi Jennifer! Road conditions this winter may have knocked your alignment off again. A quick check is only $89–$129 and takes about an hour. Call us at (306) 555-0182 to book. – Janzen & Gand Auto",
  pc8: "Hi Mark! It's been a full year since your fuel system service — a good time for another round to keep that Ram running strong. We have openings this week. Call (306) 555-0182 or reply BOOK. – The J&G Team",
}

export const AI_SUGGESTIONS = [
  {
    id: 's1',
    message: "Bay 3 is waiting on parts until approximately 2:00 PM today. I suggest moving the 30-minute Oil Change (Rachel Lee, Bay 2 at 1:30 PM) into Bay 3 at 1:00 PM, freeing Bay 2 for the incoming walk-in at 1:30 PM. Approve this swap?",
    type: 'swap',
    dismissed: false,
  },
  {
    id: 's2',
    message: "Dusty has a 45-minute gap between jobs at 10:30 AM in Bay 1. The Tire Rotation for David Garcia (currently unassigned at 11:00 AM) could be moved to 10:30 AM in Bay 1 with Dusty. This fills the gap efficiently. Approve?",
    type: 'fill-gap',
    dismissed: false,
  },
  {
    id: 's3',
    message: "Bay 4 has back-to-back 1.5-hour brake jobs with no buffer today. Taylor may run into overtime. Suggest moving Amy Taylor's Brake Job to tomorrow morning at 8:30 AM when Bay 4 opens fresh. Approve the reschedule?",
    type: 'reschedule',
    dismissed: false,
  },
]

export const KPI_DATA = {
  bays: [
    { bay: 1, mechanic: 'Dusty',  jobsToday: 3, billableHours: 2.5, avgDuration: 0.83, currentStatus: 'in-progress' as JobStatus, overTime: false },
    { bay: 2, mechanic: 'Matt',   jobsToday: 4, billableHours: 2.0, avgDuration: 0.50, currentStatus: 'booked'      as JobStatus, overTime: true  },
    { bay: 3, mechanic: 'Latent', jobsToday: 2, billableHours: 1.5, avgDuration: 0.75, currentStatus: 'waiting-parts' as JobStatus, overTime: false },
    { bay: 4, mechanic: 'Taylor', jobsToday: 3, billableHours: 2.5, avgDuration: 0.83, currentStatus: 'booked'      as JobStatus, overTime: false },
  ],
  weeklyBillableHours: [
    { name: 'Dusty',  hours: 34 },
    { name: 'Matt',   hours: 28 },
    { name: 'Latent', hours: 31 },
    { name: 'Taylor', hours: 22 },
  ],
  shopEfficiency: 87,
}
