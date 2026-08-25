export interface ProjectEntity {
  id: string;
  name: string;
  description: string;
  technologies: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
}
