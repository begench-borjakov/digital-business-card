import { gql } from '@apollo/client'

export const GET_EXPERIENCES = gql`
  query GetExperiences {
    experiences {
      id
      company
      role
      employmentType
      startDate
      endDate
      current
      description
      highlights
      technologies
    }
  }
`
