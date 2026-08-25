import type { Skill } from '../../../generated/prisma/client';
import type { SkillEntity } from '../entities/skill.entity';
import type { SkillRto } from '../rto/skill.rto';

export function toSkillEntity(skill: Skill): SkillEntity {
  return {
    id: skill.id,
    name: skill.name,
    category: skill.category,
    profileId: skill.profileId,
    createdAt: skill.createdAt,
    updatedAt: skill.updatedAt,
  };
}

export function toSkillRto(entity: SkillEntity): SkillRto {
  return {
    id: entity.id,
    name: entity.name,
    category: entity.category,
    profileId: entity.profileId,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}
