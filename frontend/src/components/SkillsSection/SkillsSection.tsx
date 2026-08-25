import { useState } from 'react'
import { useMutation } from '@apollo/client/react'

import { DELETE_SKILL } from '../../graphql/skill.mutations'
import { GET_SKILLS } from '../../graphql/skill.queries'
import type {
  DeleteSkillMutation,
  DeleteSkillVariables,
  Skill,
} from '../../types/skill.types'
import { SkillForm } from '../SkillForm/SkillForm'

type SkillsSectionProps = {
  skills: Skill[]
  isEditMode: boolean
}

function groupSkills(skills: Skill[]): Map<string, Skill[]> {
  return skills.reduce<Map<string, Skill[]>>((groups, skill) => {
    const category = skill.category?.trim() || 'Other'
    const categorySkills = groups.get(category) ?? []

    categorySkills.push(skill)
    groups.set(category, categorySkills)

    return groups
  }, new Map())
}

export function SkillsSection({ skills, isEditMode }: SkillsSectionProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteSkill, deleteState] = useMutation<
    DeleteSkillMutation,
    DeleteSkillVariables
  >(DELETE_SKILL, {
    refetchQueries: [{ query: GET_SKILLS }],
    awaitRefetchQueries: true,
  })
  const groupedSkills = groupSkills(skills)

  function closeForm(): void {
    setIsCreating(false)
    setEditingSkill(null)
  }

  async function handleDelete(skill: Skill): Promise<void> {
    const confirmed = window.confirm(`Delete skill “${skill.name}”?`)

    if (!confirmed) {
      return
    }

    setDeletingId(skill.id)
    try {
      await deleteSkill({ variables: { id: skill.id } })
    } catch {
      // Apollo exposes the user-facing GraphQL message through `deleteState.error`.
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="section" aria-labelledby="skills-title">
      <div className="section-heading">
        <span className="section-number">02</span>
        <h2 id="skills-title">Skills</h2>
        <span className="section-count">{skills.length}</span>
      </div>

      <div className="section-body">
        {isEditMode && (
          <div className="management-toolbar">
            <span>Manage technical skills</span>
            <button
              className="management-button management-button--primary"
              type="button"
              onClick={() => setIsCreating(true)}
            >
              + Add skill
            </button>
          </div>
        )}

        {deleteState.error && (
          <p className="section-error">{deleteState.error.message}</p>
        )}

        {skills.length === 0 ? (
          <p className="empty-state">Skills will appear here soon.</p>
        ) : (
          <div className="skill-groups">
            {Array.from(groupedSkills, ([category, categorySkills]) => (
              <div className="skill-group" key={category}>
                <h3>{category}</h3>
                <ul className="skill-list">
                  {categorySkills.map((skill) => (
                    <li
                      className={
                        isEditMode ? 'skill-chip skill-chip--editable' : 'skill-chip'
                      }
                      key={skill.id}
                    >
                      <span>{skill.name}</span>
                      {isEditMode && (
                        <span className="inline-actions">
                          <button
                            type="button"
                            onClick={() => setEditingSkill(skill)}
                            aria-label={`Edit ${skill.name}`}
                          >
                            Edit
                          </button>
                          <button
                            className="danger-action"
                            type="button"
                            onClick={() => void handleDelete(skill)}
                            disabled={deleteState.loading}
                            aria-label={`Delete ${skill.name}`}
                          >
                            {deletingId === skill.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditMode && (isCreating || editingSkill) && (
        <SkillForm skill={editingSkill ?? undefined} onClose={closeForm} />
      )}
    </section>
  )
}
