import { useState, type FormEvent } from 'react'
import { useMutation } from '@apollo/client/react'

import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
} from '../../graphql/project.mutations'
import { GET_PROJECTS } from '../../graphql/project.queries'
import type {
  CreateProjectMutation,
  CreateProjectVariables,
  Project,
  UpdateProjectMutation,
  UpdateProjectVariables,
} from '../../types/project.types'

type ProjectFormProps = {
  project?: Project
  onClose: () => void
}

function nullableValue(value: string): string | null {
  const trimmedValue = value.trim()
  return trimmedValue || null
}

export function ProjectForm({ project, onClose }: ProjectFormProps) {
  const [name, setName] = useState(project?.name ?? '')
  const [description, setDescription] = useState(project?.description ?? '')
  const [technologies, setTechnologies] = useState(project?.technologies ?? '')
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl ?? '')
  const [demoUrl, setDemoUrl] = useState(project?.demoUrl ?? '')
  const [createProject, createState] = useMutation<
    CreateProjectMutation,
    CreateProjectVariables
  >(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
    awaitRefetchQueries: true,
  })
  const [updateProject, updateState] = useMutation<
    UpdateProjectMutation,
    UpdateProjectVariables
  >(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
    awaitRefetchQueries: true,
  })

  const loading = createState.loading || updateState.loading
  const error = createState.error ?? updateState.error

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const input = {
      name: name.trim(),
      description: description.trim(),
      technologies: nullableValue(technologies),
      githubUrl: nullableValue(githubUrl),
      demoUrl: nullableValue(demoUrl),
    }

    try {
      if (project) {
        await updateProject({ variables: { id: project.id, input } })
      } else {
        await createProject({ variables: { input } })
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
        aria-labelledby="project-form-title"
      >
        <div className="editor-modal__header">
          <div>
            <span className="editor-modal__eyebrow">Project</span>
            <h2 id="project-form-title">
              {project ? 'Edit project' : 'Add project'}
            </h2>
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
            <span>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              minLength={1}
              maxLength={1000}
              rows={4}
            />
          </label>

          <label className="form-field">
            <span>Technologies</span>
            <input
              value={technologies}
              onChange={(event) => setTechnologies(event.target.value)}
              maxLength={500}
              placeholder="Comma-separated, optional"
            />
          </label>

          <div className="editor-form__grid">
            <label className="form-field">
              <span>GitHub URL</span>
              <input
                type="url"
                value={githubUrl}
                onChange={(event) => setGithubUrl(event.target.value)}
                placeholder="Optional"
              />
            </label>

            <label className="form-field">
              <span>Demo URL</span>
              <input
                type="url"
                value={demoUrl}
                onChange={(event) => setDemoUrl(event.target.value)}
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
              {loading ? 'Saving...' : project ? 'Save project' : 'Add project'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
