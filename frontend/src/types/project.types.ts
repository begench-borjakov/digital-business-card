export type Project = {
  id: string
  name: string
  description: string
  technologies: string | null
  githubUrl: string | null
  demoUrl: string | null
}

export type GetProjectsQuery = {
  projects: Project[]
}

export type ProjectInput = {
  name: string
  description: string
  technologies: string | null
  githubUrl: string | null
  demoUrl: string | null
}

export type CreateProjectVariables = {
  input: ProjectInput
}

export type UpdateProjectVariables = {
  id: string
  input: ProjectInput
}

export type DeleteProjectVariables = {
  id: string
}

export type CreateProjectMutation = {
  createProject: Project
}

export type UpdateProjectMutation = {
  updateProject: Project
}

export type DeleteProjectMutation = {
  deleteProject: Project
}
