import { useState } from 'react'
import { useQuery } from '@apollo/client/react'

import './App.css'
import { AboutSection } from './components/AboutSection/AboutSection'
import { ExperienceSection } from './components/ExperienceSection/ExperienceSection'
import { LanguagesSection } from './components/LanguagesSection/LanguagesSection'
import { ProfileHeader } from './components/ProfileHeader/ProfileHeader'
import { ProfileEditForm } from './components/ProfileEditForm/ProfileEditForm'
import { ProjectsSection } from './components/ProjectsSection/ProjectsSection'
import { SkillsSection } from './components/SkillsSection/SkillsSection'
import { spokenLanguages } from './data/spoken-languages'
import { GET_EXPERIENCES } from './graphql/experience.queries'
import { GET_PROFILE } from './graphql/profile.queries'
import { GET_PROJECTS } from './graphql/project.queries'
import { GET_SKILLS } from './graphql/skill.queries'
import type { GetExperiencesQuery } from './types/experience.types'
import type { GetProfileQuery } from './types/profile.types'
import type { GetProjectsQuery } from './types/project.types'
import type { GetSkillsQuery } from './types/skill.types'

function LoadingState() {
  return (
    <main className="app-shell" aria-busy="true" aria-label="Loading portfolio">
      <div className="loading-header">
        <div className="skeleton skeleton--brand" />
        <div className="skeleton skeleton--status" />
      </div>
      <div className="loading-hero">
        <div className="skeleton skeleton--avatar" />
        <div className="loading-copy">
          <div className="skeleton skeleton--label" />
          <div className="skeleton skeleton--title" />
          <div className="skeleton skeleton--subtitle" />
          <div className="skeleton skeleton--button" />
        </div>
      </div>
      <div className="loading-section">
        <div className="skeleton skeleton--label" />
        <div className="loading-lines">
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line skeleton--line-short" />
        </div>
      </div>
      <p className="loading-label">Loading portfolio...</p>
    </main>
  )
}

type ErrorStateProps = {
  onRetry: () => void
}

function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <main className="feedback-page">
      <div className="feedback-card" role="alert">
        <span className="feedback-card__code">Connection error</span>
        <h1>Portfolio is temporarily unavailable</h1>
        <p>
          We could not load the data. Make sure the API is running and try again.
        </p>
        <button type="button" onClick={onRetry}>
          Try again
        </button>
      </div>
    </main>
  )
}

function App() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false)
  const profileQuery = useQuery<GetProfileQuery>(GET_PROFILE)
  const skillsQuery = useQuery<GetSkillsQuery>(GET_SKILLS)
  const projectsQuery = useQuery<GetProjectsQuery>(GET_PROJECTS)
  const experiencesQuery = useQuery<GetExperiencesQuery>(GET_EXPERIENCES)

  const isLoading =
    profileQuery.loading ||
    skillsQuery.loading ||
    projectsQuery.loading ||
    experiencesQuery.loading
  const hasError =
    profileQuery.error ||
    skillsQuery.error ||
    projectsQuery.error ||
    experiencesQuery.error

  function retryQueries(): void {
    void Promise.all([
      profileQuery.refetch(),
      skillsQuery.refetch(),
      projectsQuery.refetch(),
      experiencesQuery.refetch(),
    ])
  }

  if (isLoading) {
    return <LoadingState />
  }

  if (
    hasError ||
    !profileQuery.data?.profile ||
    !skillsQuery.data ||
    !projectsQuery.data ||
    !experiencesQuery.data
  ) {
    return <ErrorState onRetry={retryQueries} />
  }

  const { profile } = profileQuery.data

  function toggleEditMode(): void {
    if (isEditMode) {
      setIsProfileFormOpen(false)
    }
    setIsEditMode(!isEditMode)
  }

  return (
    <>
      <div className="app-shell" id="top">
        <ProfileHeader
          profile={profile}
          isEditMode={isEditMode}
          onToggleEditMode={toggleEditMode}
          onEditProfile={() => setIsProfileFormOpen(true)}
        />

        <main>
          <AboutSection about={profile.about} />
          <SkillsSection
            skills={skillsQuery.data.skills}
            isEditMode={isEditMode}
          />
          <LanguagesSection languages={spokenLanguages} />
          <ExperienceSection
            experiences={experiencesQuery.data.experiences}
            isEditMode={isEditMode}
          />
          <ProjectsSection
            projects={projectsQuery.data.projects}
            githubUrl={profile.githubUrl}
            isEditMode={isEditMode}
          />
        </main>

        <footer className="site-footer">
          <p>
            Built with <span>NestJS</span>, <span>GraphQL</span> and{' '}
            <span>React</span>
          </p>
          <p>© {new Date().getFullYear()} {profile.name}</p>
        </footer>
      </div>

      {isProfileFormOpen && (
        <ProfileEditForm
          profile={profile}
          onClose={() => setIsProfileFormOpen(false)}
        />
      )}
    </>
  )
}

export default App
