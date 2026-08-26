import { useState } from 'react'
import { useMutation } from '@apollo/client/react'

import { DELETE_EXPERIENCE } from '../../graphql/experience.mutations'
import { GET_EXPERIENCES } from '../../graphql/experience.queries'
import type {
  DeleteExperienceMutation,
  DeleteExperienceVariables,
  Experience,
} from '../../types/experience.types'
import { ExperienceForm } from '../ExperienceForm/ExperienceForm'

type ExperienceSectionProps = {
  experiences: Experience[]
  isEditMode: boolean
}

function getPeriod(experience: Experience): string {
  if (experience.current) {
    return `${experience.startDate} — Present`
  }

  return experience.endDate
    ? `${experience.startDate} — ${experience.endDate}`
    : experience.startDate
}

export function ExperienceSection({
  experiences,
  isEditMode,
}: ExperienceSectionProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [editingExperience, setEditingExperience] =
    useState<Experience | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteExperience, deleteState] = useMutation<
    DeleteExperienceMutation,
    DeleteExperienceVariables
  >(DELETE_EXPERIENCE, {
    refetchQueries: [{ query: GET_EXPERIENCES }],
    awaitRefetchQueries: true,
  })

  function closeForm(): void {
    setIsCreating(false)
    setEditingExperience(null)
  }

  async function handleDelete(experience: Experience): Promise<void> {
    const confirmed = window.confirm(
      `Delete experience at “${experience.company}”?`,
    )

    if (!confirmed) {
      return
    }

    setDeletingId(experience.id)
    try {
      await deleteExperience({ variables: { id: experience.id } })
    } catch {
      // Apollo exposes the user-facing GraphQL message through `deleteState.error`.
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="section" aria-labelledby="experience-title">
      <div className="section-heading">
        <span className="section-number">04</span>
        <h2 id="experience-title">Experience</h2>
        <span className="section-count">{experiences.length}</span>
      </div>

      <div className="section-body">
        {isEditMode && (
          <div className="management-toolbar">
            <span>Manage work experience</span>
            <button
              className="management-button management-button--primary"
              type="button"
              onClick={() => setIsCreating(true)}
            >
              + Add experience
            </button>
          </div>
        )}

        {deleteState.error && (
          <p className="section-error">{deleteState.error.message}</p>
        )}

        {experiences.length === 0 ? (
          <p className="empty-state">Experience will appear here soon.</p>
        ) : (
          <ol className="experience-list">
            {experiences.map((item) => (
              <li className="experience-item" key={item.id}>
                <div className="experience-item__period">
                  <span>{getPeriod(item)}</span>
                  <span
                    className={
                      item.current
                        ? 'timeline-dot timeline-dot--current'
                        : 'timeline-dot'
                    }
                    aria-hidden="true"
                  />
                </div>

                <div className="experience-item__content">
                  <div className="experience-item__heading">
                    <div>
                      <h3>{item.company}</h3>
                      <p className="experience-role">
                        {item.role}
                        {item.employmentType && ` · ${item.employmentType}`}
                      </p>
                    </div>

                    <div className="experience-heading-actions">
                      {item.current && (
                        <span className="current-badge">Current</span>
                      )}
                      {isEditMode && (
                        <div className="experience-management-actions">
                          <button
                            type="button"
                            onClick={() => setEditingExperience(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="danger-action"
                            type="button"
                            onClick={() => void handleDelete(item)}
                            disabled={deleteState.loading}
                          >
                            {deletingId === item.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="experience-description">{item.description}</p>

                  <div className="experience-details">
                    <h4>Highlights</h4>
                    <ul className="experience-highlights">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  <ul
                    className="experience-stack"
                    aria-label="Technology stack"
                  >
                    {item.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      {isEditMode && (isCreating || editingExperience) && (
        <ExperienceForm
          experience={editingExperience ?? undefined}
          onClose={closeForm}
        />
      )}
    </section>
  )
}
