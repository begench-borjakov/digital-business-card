import { useState, type FormEvent } from 'react'
import { useMutation } from '@apollo/client/react'

import { UPDATE_PROFILE } from '../../graphql/profile.mutations'
import { GET_PROFILE } from '../../graphql/profile.queries'
import type {
  Profile,
  UpdateProfileMutation,
  UpdateProfileVariables,
} from '../../types/profile.types'

type ProfileEditFormProps = {
  profile: Profile
  onClose: () => void
}

function nullableValue(value: string): string | null {
  const trimmedValue = value.trim()
  return trimmedValue || null
}

export function ProfileEditForm({
  profile,
  onClose,
}: ProfileEditFormProps) {
  const [name, setName] = useState(profile.name)
  const [title, setTitle] = useState(profile.title)
  const [about, setAbout] = useState(profile.about)
  const [email, setEmail] = useState(profile.email ?? '')
  const [githubUrl, setGithubUrl] = useState(profile.githubUrl ?? '')
  const [location, setLocation] = useState(profile.location ?? '')
  const [updateProfile, { loading, error }] = useMutation<
    UpdateProfileMutation,
    UpdateProfileVariables
  >(UPDATE_PROFILE, {
    refetchQueries: [{ query: GET_PROFILE }],
    awaitRefetchQueries: true,
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await updateProfile({
        variables: {
          input: {
            name: name.trim(),
            title: title.trim(),
            about: about.trim(),
            email: nullableValue(email),
            githubUrl: nullableValue(githubUrl),
            location: nullableValue(location),
          },
        },
      })
      onClose()
    } catch {
      // Apollo exposes the user-facing GraphQL message through `error`.
    }
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="editor-modal editor-modal--wide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-form-title"
      >
        <div className="editor-modal__header">
          <div>
            <span className="editor-modal__eyebrow">Profile</span>
            <h2 id="profile-form-title">Edit profile</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form className="editor-form" onSubmit={handleSubmit}>
          <div className="editor-form__grid">
            <label className="form-field">
              <span>Name</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                minLength={1}
                maxLength={100}
                autoFocus
              />
            </label>

            <label className="form-field">
              <span>Title</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                minLength={1}
                maxLength={100}
              />
            </label>
          </div>

          <label className="form-field">
            <span>About</span>
            <textarea
              value={about}
              onChange={(event) => setAbout(event.target.value)}
              required
              minLength={1}
              maxLength={1000}
              rows={5}
            />
          </label>

          <div className="editor-form__grid">
            <label className="form-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                maxLength={255}
                placeholder="Optional"
              />
            </label>

            <label className="form-field">
              <span>GitHub URL</span>
              <input
                type="url"
                value={githubUrl}
                onChange={(event) => setGithubUrl(event.target.value)}
                maxLength={500}
                placeholder="Optional"
              />
            </label>

            <label className="form-field">
              <span>Location</span>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                maxLength={100}
                placeholder="Optional"
              />
            </label>
          </div>

          {error && <p className="form-error">{error.message}</p>}

          <div className="editor-form__actions">
            <button className="button button--ghost" type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button className="button button--primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save profile'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
