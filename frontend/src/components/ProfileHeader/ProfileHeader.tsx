import { phoneContact, staticContactLinks, type ContactLink } from '../../data/contacts'
import type { Profile } from '../../types/profile.types'
import { EditModeToggle } from '../EditModeToggle/EditModeToggle'

type ProfileHeaderProps = {
  profile: Profile
  isEditMode: boolean
  onToggleEditMode: () => void
  onEditProfile: () => void
}

export function ProfileHeader({
  profile,
  isEditMode,
  onToggleEditMode,
  onEditProfile,
}: ProfileHeaderProps) {
  const contactLinks: ContactLink[] = [
    ...(profile.email
      ? [
          {
            label: 'Email',
            href: `mailto:${profile.email}`,
            external: false,
          },
        ]
      : []),
    staticContactLinks[0],
    ...(profile.githubUrl
      ? [
          {
            label: 'GitHub',
            href: profile.githubUrl,
            external: true,
          },
        ]
      : []),
    staticContactLinks[1],
  ]

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

          <div className="contact-list" aria-label="Contact information">
            {contactLinks.map((contact, index) => (
              <a
                className={
                  index === 0
                    ? 'contact-link contact-link--primary'
                    : 'contact-link'
                }
                href={contact.href}
                target={contact.external ? '_blank' : undefined}
                rel={contact.external ? 'noreferrer noopener' : undefined}
                key={contact.label}
              >
                {contact.label}
                {contact.external && <span aria-hidden="true">↗</span>}
              </a>
            ))}
          </div>

          <div className="secondary-contacts">
            <a href={phoneContact.href}>{phoneContact.label}</a>
            {profile.location && (
              <span className="location">
                <span aria-hidden="true">⌖</span>
                {profile.location}
              </span>
            )}
          </div>

          {isEditMode && (
            <button
              className="management-button management-button--profile"
              type="button"
              onClick={onEditProfile}
            >
              Edit profile
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
