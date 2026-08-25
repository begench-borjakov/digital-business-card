export type CreateProjectData = {
  name: string;
  description: string;
  technologies?: string | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
};

export type CreateProjectRepositoryData = CreateProjectData & {
  profileId: string;
};

export type UpdateProjectData = {
  name?: string;
  description?: string;
  technologies?: string | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
};
