import Link from 'next/link'
import { Wrench, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SHOP_NAME, SHOP_PHONE, SHOP_EMAIL, SHOP_ADDRESS, SHOP_HOURS } from '@/lib/mock-data'

export function Footer() {
  return (
    <footer className="bg-brand-surface border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center">
                <Wrench className="h-4 w-4 text-white" />
              </div>
              <span className="font-heading text-lg font-800 uppercase tracking-wider">{SHOP_NAME}</span>
            </div>
            <p className="text-sm text-brand-secondary leading-relaxed">
              Saskatoon&apos;s trusted independent auto shop since 2004. Real craftsmanship, honest pricing, no surprises.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-widest text-brand-dim mb-4">Navigate</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/services', 'Services'], ['/booking', 'Book Service'], ['/booking?mode=estimate', 'Get an Estimate']].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-brand-secondary hover:text-brand-cream transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-widest text-brand-dim mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-brand-red mt-0.5 shrink-0" />
                <a href={`tel:${SHOP_PHONE}`} className="text-sm text-brand-secondary hover:text-brand-cream transition-colors">{SHOP_PHONE}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-brand-red mt-0.5 shrink-0" />
                <a href={`mailto:${SHOP_EMAIL}`} className="text-sm text-brand-secondary hover:text-brand-cream transition-colors">{SHOP_EMAIL}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand-red mt-0.5 shrink-0" />
                <span className="text-sm text-brand-secondary">{SHOP_ADDRESS}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-widest text-brand-dim mb-4">
              <Clock className="inline h-3.5 w-3.5 mr-1" />Hours
            </h4>
            <ul className="space-y-2">
              {Object.entries(SHOP_HOURS).map(([day, hours]) => (
                <li key={day} className="flex justify-between gap-4 text-sm">
                  <span className="text-brand-dim">{day}</span>
                  <span className={hours === 'Closed' ? 'text-brand-dim' : 'text-brand-secondary'}>{hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-brand-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-brand-dim">© {new Date().getFullYear()} {SHOP_NAME}. All rights reserved.</p>
          <p className="text-xs text-brand-dim">Saskatoon, SK — Built with pride.</p>
        </div>
      </div>
    </footer>
  )
}
