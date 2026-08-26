import type { Profile } from '../../types/profile.types'
import { EditModeToggle } from '../EditModeToggle/EditModeToggle'
import {
  ContactIcon,
  ContactMetaPill,
  HeroContactCard,
  type ContactIconName,
} from '../HeroContactCard/HeroContactCard'

type ContactLink = {
  label: string
  value: string
  href: string
  external: boolean
  primary?: boolean
  icon: ContactIconName
}

type ProfileHeaderProps = {
  profile: Profile
  isEditMode: boolean
  onToggleEditMode: () => void
  onEditProfile: () => void
}

function getTelegramUrl(value: string): string {
  return value.startsWith('@')
    ? `https://t.me/${value.slice(1)}`
    : value
}

function getPhoneUrl(value: string): string {
  const trimmedValue = value.trim()
  const prefix = trimmedValue.startsWith('+') ? '+' : ''
  const digits = trimmedValue.replace(/\D/g, '')

  return `tel:${prefix}${digits}`
}

function getReadableUrl(value: string): string {
  return value
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/$/, '')
}

export function ProfileHeader({
  profile,
  isEditMode,
  onToggleEditMode,
  onEditProfile,
}: ProfileHeaderProps) {
  const contactLinks: ContactLink[] = []

  if (profile.email) {
    contactLinks.push({
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      external: false,
      primary: true,
      icon: 'email',
    })
  }

  if (profile.telegram) {
    contactLinks.push({
      label: 'Telegram',
      value: profile.telegram,
      href: getTelegramUrl(profile.telegram),
      external: true,
      icon: 'telegram',
    })
  }

  if (profile.githubUrl) {
    contactLinks.push({
      label: 'GitHub',
      value: getReadableUrl(profile.githubUrl),
      href: profile.githubUrl,
      external: true,
      icon: 'github',
    })
  }

  if (profile.linkedinUrl) {
    contactLinks.push({
      label: 'LinkedIn',
      value: getReadableUrl(profile.linkedinUrl),
      href: profile.linkedinUrl,
      external: true,
      icon: 'linkedin',
    })
  }

  return (
    <header className="profile-header">
      <div className="profile-header__topline">
        <a className="brand" href="#top" aria-label="Go to the top">
          <span className="brand__mark" aria-hidden="true">
            {'{ }'}
          </span>
          <span>digital.card</span>
        </a>

        <div className="profile-header__actions">
          <span className="availability">
            <span className="availability__dot" aria-hidden="true" />
            Available for work
          </span>
          <EditModeToggle
            isActive={isEditMode}
            onToggle={onToggleEditMode}
          />
        </div>
      </div>

      <div className="profile-header__content">
        <div className="avatar">
          <img src="/profile.jpeg" alt="Begench Borjakov" />
        </div>

        <div className="profile-header__copy">
          <h1>{profile.name}</h1>
          <p className="profile-title">{profile.title}</p>

          <div className="hero-contact-grid" aria-label="Contact information">
            {contactLinks.map((contact) => (
              <HeroContactCard
                label={contact.label}
                value={contact.value}
                href={contact.href}
                highlighted={contact.primary}
                external={contact.external}
                icon={<ContactIcon name={contact.icon} />}
                key={contact.label}
              />
            ))}
          </div>

          <div className="contact-meta-row">
            {profile.phone && (
              <ContactMetaPill
                label="Phone"
                value={profile.phone}
                href={getPhoneUrl(profile.phone)}
                icon={<ContactIcon name="phone" />}
              />
            )}
            {profile.location && (
              <ContactMetaPill
                label="Location"
                value={profile.location.replace(/\s*\/\s*/g, ' / ')}
                icon={<ContactIcon name="location" />}
              />
            )}
          </div>

          {isEditMode && (
            <button
              className="management-button management-button--profile"
              type="button"
              onClick={onEditProfile}
            >
              <ContactIcon name="edit" />
              <span>Edit profile</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
