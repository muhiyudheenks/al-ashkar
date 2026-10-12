import { useMemo, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/Section'
import { WhatsAppButton } from '../components/WhatsApp'
import {
  IconAlert,
  IconCheck,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from '../components/Icons'
import { mailLink, site, telLink, whatsappLink } from '../lib/site'
import { isSupabaseConfigured, submitThobeOrder, type ThobeOrderPayload } from '../lib/supabase'

/* ========================================================================
   Form model
   ======================================================================== */

type ServiceOption = 'custom' | 'fabric' | 'alteration' | 'express' | 'bulk' | 'other'
type StyleOption = 'saudi' | 'kuwaiti' | 'emirati' | 'omani' | 'unsure'

const measureKeys = ['chest', 'shoulder', 'sleeve', 'length', 'neck', 'cuff'] as const
type MeasureKey = (typeof measureKeys)[number]

type FormState = {
  name: string
  phone: string
  email: string
  city: string
  service: ServiceOption
  style: StyleOption
  fabric: string
  quantity: string
  needBy: string
  measurements: Record<MeasureKey, string>
  notes: string
  consent: boolean
}

const emptyForm: FormState = {
  name: '',
  phone: '',
  email: '',
  city: '',
  service: 'custom',
  style: 'unsure',
  fabric: '',
  quantity: '1',
  needBy: '',
  measurements: { chest: '', shoulder: '', sleeve: '', length: '', neck: '', cuff: '' },
  notes: '',
  consent: true,
}

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'quantity', string>>

type Status = 'idle' | 'submitting' | 'success' | 'not-configured' | 'error'

/* ========================================================================
   Page
   ======================================================================== */

export function Contact() {
  const { t } = useLang()
  const c = t.contact

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede}>
        {/* Only shown once a WhatsApp number is configured — otherwise this
            would simply point at the form directly below it. */}
        <WhatsAppButton className="btn btn-gold" />
      </PageHero>

      <ContactDetails />
      <OrderForm />
    </>
  )
}

/* ========================================================================
   Contact details
   ======================================================================== */

function ContactDetails() {
  const { t } = useLang()
  const d = t.contact.details

  const tel = telLink()
  const mail = mailLink()
  const wa = whatsappLink()

  const cards = [
    {
      key: 'whatsapp',
      icon: IconWhatsApp,
      label: d.whatsapp,
      value: site.whatsapp,
      href: wa,
      external: true,
    },
    { key: 'phone', icon: IconPhone, label: d.phone, value: site.phone, href: tel, external: false },
    { key: 'email', icon: IconMail, label: d.email, value: site.email, href: mail, external: false },
    {
      key: 'address',
      icon: IconPin,
      label: d.address,
      value: site.address,
      href: site.mapsUrl || null,
      external: true,
    },
    { key: 'hours', icon: IconClock, label: d.hours, value: site.hours, href: null, external: false },
  ]

  return (
    <Section tone="white">
      <SectionHeading eyebrow={d.eyebrow} title={d.title} />

      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-18">
        {cards.map((card, i) => {
          const Icon = card.icon
          const configured = card.value.length > 0

          const body = (
            <>
              <Icon className="h-6 w-6 text-gold" />
              <h3 className="mt-6 text-[0.6875rem] font-medium tracking-[0.2em] text-muted uppercase">
                {card.label}
              </h3>

              {configured ? (
                <p
                  className="mt-2.5 text-lg leading-snug whitespace-pre-line text-charcoal"
                  dir={card.key === 'phone' || card.key === 'whatsapp' ? 'ltr' : undefined}
                >
                  {card.value}
                </p>
              ) : (
                <>
                  <p className="mt-2.5 text-lg text-muted/70 italic">{d.pending}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted/70">{d.pendingHint}</p>
                </>
              )}
            </>
          )

          return (
            <Reveal as="li" key={card.key} delay={(i % 3) * 90} className="h-full">
              {configured && card.href ? (
                <a
                  href={card.href}
                  {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="card group flex h-full flex-col p-8 lg:p-9"
                >
                  {body}
                  <span
                    className="mt-5 block h-px w-8 bg-gold/50 transition-all duration-600 group-hover:w-16 group-hover:bg-gold"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <div className="card flex h-full flex-col p-8 lg:p-9">{body}</div>
              )}
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}

/* ========================================================================
   Order form
   ======================================================================== */

function OrderForm() {
  const { t, lang } = useLang()
  const f = t.contact.form
  const opts = t.contact.options

  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const resultRef = useRef<HTMLDivElement>(null)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const setMeasure = (key: MeasureKey, value: string) =>
    setForm((prev) => ({ ...prev, measurements: { ...prev.measurements, [key]: value } }))

  /** The same details, formatted for WhatsApp — used by the fallback link. */
  const waMessage = useMemo(() => buildWhatsAppMessage(form, t), [form, t])

  function validate(): boolean {
    const next: Errors = {}

    if (!form.name.trim()) next.name = f.requiredError
    if (!form.phone.trim()) next.phone = f.requiredError
    else if (!/^[+\d][\d\s()+-]{6,}$/.test(form.phone.trim())) next.phone = f.phoneError

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      next.email = f.emailError
    }

    const qty = Number(form.quantity)
    if (!Number.isFinite(qty) || qty < 1) next.quantity = f.numberError

    setErrors(next)

    if (Object.keys(next).length > 0) {
      // Focus the first field in error so keyboard users are not stranded.
      const first = Object.keys(next)[0]
      document.getElementById(`order-${first}`)?.focus()
      return false
    }
    return true
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return
    if (!validate()) return

    setStatus('submitting')
    setServerMessage('')

    const measurements = Object.fromEntries(
      measureKeys
        .map((k) => [k, Number(form.measurements[k])] as const)
        .filter(([, v]) => Number.isFinite(v) && v > 0),
    ) as Record<string, number>

    const payload: ThobeOrderPayload = {
      full_name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      city: form.city.trim() || null,
      service: form.service,
      collar_style: form.service === 'custom' || form.service === 'bulk' ? form.style : null,
      fabric: form.fabric.trim() || null,
      quantity: Math.max(1, Math.round(Number(form.quantity)) || 1),
      needed_by: form.needBy || null,
      measurements: Object.keys(measurements).length > 0 ? measurements : null,
      notes: form.notes.trim() || null,
      whatsapp_consent: form.consent,
      language: lang,
    }

    const result = await submitThobeOrder(payload)

    if (result.status === 'ok') {
      setStatus('success')
      setForm(emptyForm)
    } else if (result.status === 'not-configured') {
      setStatus('not-configured')
    } else {
      setStatus('error')
      setServerMessage(result.message)
    }

    requestAnimationFrame(() =>
      resultRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }),
    )
  }

  const showStyle = form.service === 'custom' || form.service === 'bulk'

  /* ---------- Result panels ---------- */

  if (status === 'success') {
    return (
      <Section tone="ivory" id="order">
        <div ref={resultRef}>
          <ResultPanel
            tone="success"
            title={f.successTitle}
            text={f.successText}
            action={
              <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>
                {f.successAgain}
              </button>
            }
          />
        </div>
      </Section>
    )
  }

  return (
    <Section tone="ivory" id="order">
      <SectionHeading eyebrow={f.eyebrow} title={f.title} lede={f.lede} />

      {(status === 'error' || status === 'not-configured') && (
        <div ref={resultRef} className="mx-auto mt-12 max-w-3xl">
          <ResultPanel
            tone="warning"
            title={status === 'error' ? f.errorTitle : f.offlineTitle}
            text={status === 'error' ? f.errorText : f.offlineText}
            detail={serverMessage}
            action={<WhatsAppButton className="btn btn-gold" message={waMessage} />}
          />
        </div>
      )}

      <Reveal delay={120} className="mx-auto mt-12 max-w-3xl md:mt-16">
        <form noValidate onSubmit={onSubmit} className="bg-white p-6 md:p-10 lg:p-12">
          {/* ---------- Your details ---------- */}
          <Fieldset legend={f.sectionContact}>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="order-name"
                label={f.name}
                required
                error={errors.name}
                value={form.name}
                placeholder={f.namePlaceholder}
                onChange={(v) => set('name', v)}
                autoComplete="name"
              />
              <Field
                id="order-phone"
                label={f.phone}
                required
                error={errors.phone}
                value={form.phone}
                placeholder={f.phonePlaceholder}
                onChange={(v) => set('phone', v)}
                type="tel"
                dir="ltr"
                autoComplete="tel"
              />
              <Field
                id="order-email"
                label={f.email}
                error={errors.email}
                value={form.email}
                placeholder={f.emailPlaceholder}
                onChange={(v) => set('email', v)}
                type="email"
                dir="ltr"
                autoComplete="email"
              />
              <Field
                id="order-city"
                label={f.city}
                value={form.city}
                placeholder={f.cityPlaceholder}
                onChange={(v) => set('city', v)}
                autoComplete="address-level2"
              />
            </div>
          </Fieldset>

          {/* ---------- Your thobe ---------- */}
          <Fieldset legend={f.sectionOrder}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="order-service" className="field-label">
                  {f.service}
                </label>
                <select
                  id="order-service"
                  className="field"
                  value={form.service}
                  onChange={(e) => set('service', e.target.value as ServiceOption)}
                >
                  {(Object.keys(opts.service) as ServiceOption[]).map((key) => (
                    <option key={key} value={key}>
                      {opts.service[key]}
                    </option>
                  ))}
                </select>
              </div>

              {showStyle && (
                <div>
                  <label htmlFor="order-style" className="field-label">
                    {f.style}
                  </label>
                  <select
                    id="order-style"
                    className="field"
                    value={form.style}
                    onChange={(e) => set('style', e.target.value as StyleOption)}
                  >
                    {(Object.keys(opts.style) as StyleOption[]).map((key) => (
                      <option key={key} value={key}>
                        {opts.style[key]}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <Field
                id="order-fabric"
                label={f.fabric}
                value={form.fabric}
                placeholder={f.fabricPlaceholder}
                onChange={(v) => set('fabric', v)}
              />

              <Field
                id="order-quantity"
                label={f.quantity}
                error={errors.quantity}
                value={form.quantity}
                onChange={(v) => set('quantity', v)}
                type="number"
                min="1"
                max="99"
                dir="ltr"
              />

              <Field
                id="order-needBy"
                label={f.needBy}
                value={form.needBy}
                onChange={(v) => set('needBy', v)}
                type="date"
                dir="ltr"
              />
            </div>
          </Fieldset>

          {/* ---------- Measurements ---------- */}
          <Fieldset legend={f.sectionMeasure} hint={f.measureHint}>
            <div className="grid gap-5 sm:grid-cols-3">
              {measureKeys.map((key) => (
                <Field
                  key={key}
                  id={`order-${key}`}
                  label={f[key]}
                  value={form.measurements[key]}
                  onChange={(v) => setMeasure(key, v)}
                  type="number"
                  min="0"
                  step="0.5"
                  suffix="cm"
                  dir="ltr"
                />
              ))}
            </div>
          </Fieldset>

          {/* ---------- Notes ---------- */}
          <Fieldset legend={f.sectionNotes}>
            <div>
              <label htmlFor="order-notes" className="field-label">
                {f.notes}
              </label>
              <textarea
                id="order-notes"
                rows={4}
                className="field resize-y"
                value={form.notes}
                placeholder={f.notesPlaceholder}
                onChange={(e) => set('notes', e.target.value)}
              />
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-muted">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set('consent', e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 appearance-none border border-ivory-deep bg-white transition-colors duration-300 checked:border-gold checked:bg-gold"
              />
              <span>{f.consent}</span>
            </label>
          </Fieldset>

          {/* ---------- Submit ---------- */}
          <div className="mt-10 border-t border-ivory-deep pt-8">
            <button type="submit" className="btn btn-gold w-full" disabled={status === 'submitting'}>
              {status === 'submitting' ? f.submitting : f.submit}
            </button>

            <div className="mt-4 text-center">
              <WhatsAppButton
                className="link-gold inline-flex items-center gap-2 text-sm"
                message={waMessage}
              >
                {f.orWhatsapp}
              </WhatsAppButton>
            </div>

            {!isSupabaseConfigured && (
              <p className="mt-5 flex items-start gap-2.5 border border-gold/30 bg-ivory p-4 text-xs leading-relaxed text-muted">
                <IconAlert className="mt-px h-4 w-4 shrink-0 text-gold" />
                {f.offlineText}
              </p>
            )}
          </div>
        </form>
      </Reveal>
    </Section>
  )
}

/* ========================================================================
   Form primitives
   ======================================================================== */

function Fieldset({
  legend,
  hint,
  children,
}: {
  legend: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <fieldset className="mt-10 first:mt-0">
      <legend className="flex w-full items-center gap-4">
        <span className="font-display text-xl whitespace-nowrap text-charcoal">{legend}</span>
        <span className="rule-gold h-px flex-1" aria-hidden="true" />
      </legend>

      {hint && <p className="mt-3 text-xs leading-relaxed text-muted">{hint}</p>}

      <div className="mt-6">{children}</div>
    </fieldset>
  )
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  type = 'text',
  suffix,
  ...rest
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  placeholder?: string
  type?: string
  suffix?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'onChange' | 'type'>) {
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="text-gold" aria-hidden="true">
            &nbsp;*
          </span>
        )}
      </label>

      <div className="relative">
        <input
          id={id}
          type={type}
          className="field"
          value={value}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
        />
        {suffix && (
          <span
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-[0.6875rem] tracking-wider text-muted/70 uppercase end-3.5"
            aria-hidden="true"
          >
            {suffix}
          </span>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-2 text-xs text-[#b4452f]">
          {error}
        </p>
      )}
    </div>
  )
}

function ResultPanel({
  tone,
  title,
  text,
  detail,
  action,
}: {
  tone: 'success' | 'warning'
  title: string
  text: string
  detail?: string
  action?: React.ReactNode
}) {
  const Icon = tone === 'success' ? IconCheck : IconAlert

  return (
    <div
      role="status"
      aria-live="polite"
      className={`mx-auto max-w-2xl border bg-white p-8 text-center md:p-12 ${
        tone === 'success' ? 'border-gold/45' : 'border-[#b4452f]/35'
      }`}
    >
      <span
        className={`mx-auto grid h-14 w-14 place-items-center rounded-full border ${
          tone === 'success' ? 'border-gold/40 text-gold' : 'border-[#b4452f]/35 text-[#b4452f]'
        }`}
      >
        <Icon className="h-6 w-6" />
      </span>

      <h3 className="mt-6 text-2xl text-balance md:text-3xl">{title}</h3>
      <p className="mx-auto mt-4 max-w-md text-muted text-pretty">{text}</p>

      {detail && (
        <p className="mx-auto mt-4 max-w-md font-mono text-xs break-words text-muted/70" dir="ltr">
          {detail}
        </p>
      )}

      {action && <div className="mt-8 flex justify-center">{action}</div>}
    </div>
  )
}

/* ========================================================================
   WhatsApp message
   ======================================================================== */

function buildWhatsAppMessage(form: FormState, t: ReturnType<typeof useLang>['t']): string {
  const f = t.contact.form
  const opts = t.contact.options

  const lines: string[] = [`${t.brand.name} — ${f.eyebrow}`, '']

  const add = (label: string, value: string) => {
    if (value.trim()) lines.push(`${label}: ${value.trim()}`)
  }

  add(f.name, form.name)
  add(f.phone, form.phone)
  add(f.email, form.email)
  add(f.city, form.city)
  add(f.service, opts.service[form.service])

  if (form.service === 'custom' || form.service === 'bulk') {
    add(f.style, opts.style[form.style])
  }

  add(f.fabric, form.fabric)
  add(f.quantity, form.quantity)
  add(f.needBy, form.needBy)

  const measures = measureKeys
    .filter((k) => form.measurements[k].trim())
    .map((k) => `${f[k]} ${form.measurements[k]}cm`)

  if (measures.length > 0) {
    lines.push('', `${f.sectionMeasure}: ${measures.join(' · ')}`)
  }

  if (form.notes.trim()) {
    lines.push('', `${f.notes}: ${form.notes.trim()}`)
  }

  return lines.join('\n')
}
