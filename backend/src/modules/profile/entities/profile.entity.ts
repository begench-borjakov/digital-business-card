export interface ProfileEntity {
  id: string;
  name: string;
  title: string;
  about: string;
  email: string | null;
  phone: string | null;
  telegram: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  location: string | null;
  createdAt: Date;
  updatedAt: Date;
}
