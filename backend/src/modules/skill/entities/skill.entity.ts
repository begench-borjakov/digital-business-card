export interface SkillEntity {
  id: string;
  name: string;
  category: string | null;
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
}
