export type Profile = {
  name: string
  title: string
  about: string
  email: string | null
  phone: string | null
  telegram: string | null
  githubUrl: string | null
  linkedinUrl: string | null
  location: string | null
}

export type GetProfileQuery = {
  profile: Profile
}

export type UpdateProfileInput = {
  name: string
  title: string
  about: string
  email: string | null
  phone: string | null
  telegram: string | null
  githubUrl: string | null
  linkedinUrl: string | null
  location: string | null
}

export type UpdateProfileVariables = {
  input: UpdateProfileInput
}

export type UpdateProfileMutation = {
  updateProfile: Profile
}
