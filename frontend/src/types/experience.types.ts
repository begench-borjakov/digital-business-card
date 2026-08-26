export type Experience = {
  id: string
  company: string
  role: string
  employmentType: string | null
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  highlights: string[]
  technologies: string[]
}

export type GetExperiencesQuery = {
  experiences: Experience[]
}

export type ExperienceInput = {
  company: string
  role: string
  employmentType: string | null
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  highlights: string[]
  technologies: string[]
}

export type CreateExperienceVariables = {
  input: ExperienceInput
}

export type UpdateExperienceVariables = {
  id: string
  input: ExperienceInput
}

export type DeleteExperienceVariables = {
  id: string
}

export type CreateExperienceMutation = {
  createExperience: Experience
}

export type UpdateExperienceMutation = {
  updateExperience: Experience
}

export type DeleteExperienceMutation = {
  deleteExperience: Experience
}
