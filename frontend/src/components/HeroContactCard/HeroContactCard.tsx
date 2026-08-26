import type { ReactNode } from 'react'

export type ContactIconName =
  | 'email'
  | 'telegram'
  | 'github'
  | 'linkedin'
  | 'phone'
  | 'location'
  | 'edit'

type HeroContactCardProps = {
  label: string
  value: string
  href: string
  highlighted?: boolean
  external?: boolean
  icon: ReactNode
}

type ContactMetaPillProps = {
  label: string
  value: string
  href?: string
  icon: ReactNode
}

type ContactIconProps = {
  name: ContactIconName
}

export function ContactIcon({ name }: ContactIconProps) {
  if (name === 'email') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    )
  }

  if (name === 'telegram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3 11 17-7-5 16-4-6-4 3 1-5 8-5-9 4Z" />
      </svg>
    )
  }

  if (name === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <circle cx="6" cy="18" r="2" />
        <path d="M6 8v8M8 6h4a6 6 0 0 1 6 6v4" />
      </svg>
    )
  }

  if (name === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10v7M8 7v.01M12 17v-7m0 3a3 3 0 0 1 6 0v4" />
      </svg>
    )
  }

  if (name === 'phone') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-1-2 2a15 15 0 0 1-8-8l2-2Z" />
      </svg>
    )
  }

  if (name === 'location') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10Z" />
      <path d="m14 7 3 3M4 20h6" />
    </svg>
  )
}

export function HeroContactCard({
  label,
  value,
  href,
  highlighted = false,
  external = false,
  icon,
}: HeroContactCardProps) {
  return (
    <a
      className={
        highlighted
          ? 'hero-contact-card hero-contact-card--highlighted'
          : 'hero-contact-card'
      }
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
    >
      <span className="hero-contact-card__icon">{icon}</span>
      <span className="hero-contact-card__copy">
        <strong>{label}</strong>
        <small title={value}>{value}</small>
      </span>
      <span className="hero-contact-card__arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  )
}

export function ContactMetaPill({
  label,
  value,
  href,
  icon,
}: ContactMetaPillProps) {
  const content = (
    <>
      <span className="contact-meta-pill__icon">{icon}</span>
      <span>{value}</span>
    </>
  )

  return href ? (
    <a className="contact-meta-pill" href={href} aria-label={label}>
      {content}
    </a>
  ) : (
    <span className="contact-meta-pill" aria-label={label}>
      {content}
    </span>
  )
}
