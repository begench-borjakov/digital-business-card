export type Skill = {
  id: string
  name: string
  category: string | null
}

export type GetSkillsQuery = {
  skills: Skill[]
}

export type CreateSkillInput = {
  name: string
  category: string | null
}

export type UpdateSkillInput = {
  name: string
  category: string | null
}

export type CreateSkillVariables = {
  input: CreateSkillInput
}

export type UpdateSkillVariables = {
  id: string
  input: UpdateSkillInput
}

export type DeleteSkillVariables = {
  id: string
}

export type CreateSkillMutation = {
  createSkill: Skill
}

export type UpdateSkillMutation = {
  updateSkill: Skill
}

export type DeleteSkillMutation = {
  deleteSkill: Skill
}
