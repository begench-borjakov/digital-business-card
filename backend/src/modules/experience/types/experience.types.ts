export type CreateExperienceData = {
  company: string;
  role: string;
  employmentType?: string | null;
  startDate: string;
  endDate?: string | null;
  current?: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
};

export type CreateExperienceRepositoryData = CreateExperienceData & {
  profileId: string;
};

export type UpdateExperienceData = {
  company?: string;
  role?: string;
  employmentType?: string | null;
  startDate?: string;
  endDate?: string | null;
  current?: boolean;
  description?: string;
  highlights?: string[];
  technologies?: string[];
};
