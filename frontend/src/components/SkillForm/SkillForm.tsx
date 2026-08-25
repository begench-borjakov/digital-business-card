import { useState, type FormEvent } from 'react'
import { useMutation } from '@apollo/client/react'

import { CREATE_SKILL, UPDATE_SKILL } from '../../graphql/skill.mutations'
import { GET_SKILLS } from '../../graphql/skill.queries'
import type {
  CreateSkillMutation,
  CreateSkillVariables,
  Skill,
  UpdateSkillMutation,
  UpdateSkillVariables,
} from '../../types/skill.types'

type SkillFormProps = {
  skill?: Skill
  onClose: () => void
}

export function SkillForm({ skill, onClose }: SkillFormProps) {
  const [name, setName] = useState(skill?.name ?? '')
  const [category, setCategory] = useState(skill?.category ?? '')
  const [createSkill, createState] = useMutation<
    CreateSkillMutation,
    CreateSkillVariables
  >(CREATE_SKILL, {
    refetchQueries: [{ query: GET_SKILLS }],
    awaitRefetchQueries: true,
  })
  const [updateSkill, updateState] = useMutation<
    UpdateSkillMutation,
    UpdateSkillVariables
  >(UPDATE_SKILL, {
    refetchQueries: [{ query: GET_SKILLS }],
    awaitRefetchQueries: true,
  })

  const loading = createState.loading || updateState.loading
  const error = createState.error ?? updateState.error

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const input = {
      name: name.trim(),
      category: category.trim() || null,
    }

    try {
      if (skill) {
        await updateSkill({ variables: { id: skill.id, input } })
      } else {
        await createSkill({ variables: { input } })
      }
      onClose()
    } catch {
      // Apollo exposes the user-facing GraphQL message through `error`.
    }
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="editor-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-form-title"
      >
        <div className="editor-modal__header">
          <div>
            <span className="editor-modal__eyebrow">Skill</span>
            <h2 id="skill-form-title">{skill ? 'Edit skill' : 'Add skill'}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form className="editor-form" onSubmit={handleSubmit}>
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
            <span>Category</span>
            <input
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              maxLength={100}
              placeholder="Optional"
            />
          </label>

          {error && <p className="form-error">{error.message}</p>}

          <div className="editor-form__actions">
            <button className="button button--ghost" type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button className="button button--primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : skill ? 'Save skill' : 'Add skill'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
