export type CreateSkillData = {
  name: string;
  category?: string | null;
};

export type CreateSkillRepositoryData = CreateSkillData & {
  profileId: string;
};

export type UpdateSkillData = {
  name?: string;
  category?: string | null;
};
