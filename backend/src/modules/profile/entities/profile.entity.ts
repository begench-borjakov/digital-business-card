export interface ProfileEntity {
  id: string;
  name: string;
  title: string;
  about: string;
  email: string | null;
  githubUrl: string | null;
  location: string | null;
  createdAt: Date;
  updatedAt: Date;
}
