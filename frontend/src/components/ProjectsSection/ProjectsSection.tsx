import { useState } from 'react'
import { useMutation } from '@apollo/client/react'

import { DELETE_PROJECT } from '../../graphql/project.mutations'
import { GET_PROJECTS } from '../../graphql/project.queries'
import type {
  DeleteProjectMutation,
  DeleteProjectVariables,
  Project,
} from '../../types/project.types'
import { ProjectForm } from '../ProjectForm/ProjectForm'

type ProjectsSectionProps = {
  projects: Project[]
  githubUrl: string | null
  isEditMode: boolean
}

function getTechnologies(technologies: string | null): string[] {
  return technologies
    ? technologies
        .split(',')
        .map((technology) => technology.trim())
        .filter(Boolean)
    : []
}

export function ProjectsSection({
  projects,
  githubUrl,
  isEditMode,
}: ProjectsSectionProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteProject, deleteState] = useMutation<
    DeleteProjectMutation,
    DeleteProjectVariables
  >(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
    awaitRefetchQueries: true,
  })

  function closeForm(): void {
    setIsCreating(false)
    setEditingProject(null)
  }

  async function handleDelete(project: Project): Promise<void> {
    const confirmed = window.confirm(`Delete project “${project.name}”?`)

    if (!confirmed) {
      return
    }

    setDeletingId(project.id)
    try {
      await deleteProject({ variables: { id: project.id } })
    } catch {
      // Apollo exposes the user-facing GraphQL message through `deleteState.error`.
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="section" aria-labelledby="projects-title">
      <div className="section-heading">
        <span className="section-number">05</span>
        <h2 id="projects-title">Selected Projects</h2>
        <span className="section-count">{projects.length}</span>
      </div>

      <div className="section-body">
        {isEditMode && (
          <div className="management-toolbar">
            <span>Manage portfolio projects</span>
            <button
              className="management-button management-button--primary"
              type="button"
              onClick={() => setIsCreating(true)}
            >
              + Add project
            </button>
          </div>
        )}

        {deleteState.error && (
          <p className="section-error">{deleteState.error.message}</p>
        )}

        {projects.length === 0 ? (
          <p className="empty-state">Projects will appear here soon.</p>
        ) : (
          <div className="project-grid">
            {projects.map((project, index) => {
              const technologies = getTechnologies(project.technologies)

              return (
                <article className="project-card" key={project.id}>
                  <div className="project-card__meta">
                    <span>Project {String(index + 1).padStart(2, '0')}</span>
                    <span className="project-card__status">Completed</span>
                  </div>

                  {isEditMode && (
                    <div className="card-management-actions">
                      <button type="button" onClick={() => setEditingProject(project)}>
                        Edit
                      </button>
                      <button
                        className="danger-action"
                        type="button"
                        onClick={() => void handleDelete(project)}
                        disabled={deleteState.loading}
                      >
                        {deletingId === project.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  )}

                  <h3>{project.name}</h3>
                  <p>{project.description}</p>

                  {technologies.length > 0 && (
                    <ul className="technology-list" aria-label="Technologies">
                      {technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  )}

                  {(project.githubUrl || project.demoUrl) && (
                    <div className="project-links">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer">
                          Source <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noreferrer">
                          Live demo <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  )}
                </article>
              )
            })}

            {githubUrl && (
              <a
                className="all-projects-link"
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span>View all projects on GitHub</span>
                <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        )}
      </div>

      {isEditMode && (isCreating || editingProject) && (
        <ProjectForm project={editingProject ?? undefined} onClose={closeForm} />
      )}
    </section>
  )
}
