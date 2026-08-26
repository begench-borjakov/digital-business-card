export interface ExperienceEntity {
  id: string;
  company: string;
  role: string;
  employmentType: string | null;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
}
