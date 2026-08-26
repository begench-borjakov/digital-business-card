import { useState, type FormEvent } from 'react'
import { useMutation } from '@apollo/client/react'

import {
  CREATE_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from '../../graphql/experience.mutations'
import { GET_EXPERIENCES } from '../../graphql/experience.queries'
import type {
  CreateExperienceMutation,
  CreateExperienceVariables,
  Experience,
  UpdateExperienceMutation,
  UpdateExperienceVariables,
} from '../../types/experience.types'

type ExperienceFormProps = {
  experience?: Experience
  onClose: () => void
}

function nullableValue(value: string): string | null {
  const trimmedValue = value.trim()
  return trimmedValue || null
}

function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function splitCommaSeparated(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function toMonthIndex(value: string): number {
  const [month, year] = value.split('/').map(Number)
  return year * 12 + month
}

function validateDates(
  startDate: string,
  endDate: string,
  current: boolean,
): string | null {
  if (current) {
    return null
  }

  if (!endDate.trim()) {
    return 'End date is required when the position is not current.'
  }

  if (toMonthIndex(endDate) <= toMonthIndex(startDate)) {
    return 'End date must be after start date.'
  }

  return null
}

export function ExperienceForm({
  experience,
  onClose,
}: ExperienceFormProps) {
  const [company, setCompany] = useState(experience?.company ?? '')
  const [role, setRole] = useState(experience?.role ?? '')
  const [employmentType, setEmploymentType] = useState(
    experience?.employmentType ?? '',
  )
  const [startDate, setStartDate] = useState(experience?.startDate ?? '')
  const [endDate, setEndDate] = useState(experience?.endDate ?? '')
  const [current, setCurrent] = useState(experience?.current ?? false)
  const [description, setDescription] = useState(
    experience?.description ?? '',
  )
  const [highlights, setHighlights] = useState(
    experience?.highlights.join('\n') ?? '',
  )
  const [technologies, setTechnologies] = useState(
    experience?.technologies.join(', ') ?? '',
  )
  const [dateError, setDateError] = useState<string | null>(null)
  const [createExperience, createState] = useMutation<
    CreateExperienceMutation,
    CreateExperienceVariables
  >(CREATE_EXPERIENCE, {
    refetchQueries: [{ query: GET_EXPERIENCES }],
    awaitRefetchQueries: true,
  })
  const [updateExperience, updateState] = useMutation<
    UpdateExperienceMutation,
    UpdateExperienceVariables
  >(UPDATE_EXPERIENCE, {
    refetchQueries: [{ query: GET_EXPERIENCES }],
    awaitRefetchQueries: true,
  })

  const loading = createState.loading || updateState.loading
  const error = createState.error ?? updateState.error

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationMessage = validateDates(startDate, endDate, current)

    if (validationMessage) {
      setDateError(validationMessage)
      return
    }

    setDateError(null)
    const input = {
      company: company.trim(),
      role: role.trim(),
      employmentType: nullableValue(employmentType),
      startDate: startDate.trim(),
      endDate: current ? null : nullableValue(endDate),
      current,
      description: description.trim(),
      highlights: splitLines(highlights),
      technologies: splitCommaSeparated(technologies),
    }

    try {
      if (experience) {
        await updateExperience({ variables: { id: experience.id, input } })
      } else {
        await createExperience({ variables: { input } })
      }
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
        aria-labelledby="experience-form-title"
      >
        <div className="editor-modal__header">
          <div>
            <span className="editor-modal__eyebrow">Experience</span>
            <h2 id="experience-form-title">
              {experience ? 'Edit experience' : 'Add experience'}
            </h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form className="editor-form" onSubmit={handleSubmit}>
          <div className="editor-form__grid">
            <label className="form-field">
              <span>Company</span>
              <input
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                required
                maxLength={100}
                autoFocus
              />
            </label>
            <label className="form-field">
              <span>Role</span>
              <input
                value={role}
                onChange={(event) => setRole(event.target.value)}
                required
                maxLength={100}
              />
            </label>
            <label className="form-field">
              <span>Employment type</span>
              <input
                value={employmentType}
                onChange={(event) => setEmploymentType(event.target.value)}
                maxLength={100}
                placeholder="Optional"
              />
            </label>
            <label className="form-field">
              <span>Start date</span>
              <input
                value={startDate}
                onChange={(event) => {
                  setStartDate(event.target.value)
                  setDateError(null)
                }}
                required
                placeholder="MM/YYYY"
                pattern="(0[1-9]|1[0-2])/\d{4}"
              />
            </label>
            <label className="form-field">
              <span>End date</span>
              <input
                value={endDate}
                onChange={(event) => {
                  setEndDate(event.target.value)
                  setDateError(null)
                }}
                disabled={current}
                placeholder={current ? 'Present' : 'MM/YYYY, optional'}
                pattern="(0[1-9]|1[0-2])/\d{4}"
              />
            </label>
            <label className="form-checkbox">
              <input
                type="checkbox"
                checked={current}
                onChange={(event) => {
                  setCurrent(event.target.checked)
                  setDateError(null)
                  if (event.target.checked) {
                    setEndDate('')
                  }
                }}
              />
              <span>Current position</span>
            </label>

            {dateError && (
              <p className="date-validation-error" role="alert">
                {dateError}
              </p>
            )}
          </div>

          <label className="form-field">
            <span>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              maxLength={1000}
              rows={3}
            />
          </label>

          <label className="form-field">
            <span>Highlights — one per line</span>
            <textarea
              value={highlights}
              onChange={(event) => setHighlights(event.target.value)}
              required
              rows={5}
            />
          </label>

          <label className="form-field">
            <span>Technologies — comma-separated</span>
            <input
              value={technologies}
              onChange={(event) => setTechnologies(event.target.value)}
              required
            />
          </label>

          {error && <p className="form-error">{error.message}</p>}

          <div className="editor-form__actions">
            <button className="button button--ghost" type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button className="button button--primary" type="submit" disabled={loading}>
              {loading
                ? 'Saving...'
                : experience
                  ? 'Save experience'
                  : 'Add experience'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
