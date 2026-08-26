import { gql } from '@apollo/client'

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      name
      title
      about
      email
      phone
      telegram
      githubUrl
      linkedinUrl
      location
    }
  }
`
