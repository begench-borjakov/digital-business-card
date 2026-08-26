import { gql } from '@apollo/client'

export const CREATE_EXPERIENCE = gql`
  mutation CreateExperience($input: CreateExperienceInput!) {
    createExperience(input: $input) {
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

export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($id: ID!, $input: UpdateExperienceInput!) {
    updateExperience(id: $id, input: $input) {
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

export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id) {
      id
      company
    }
  }
`
