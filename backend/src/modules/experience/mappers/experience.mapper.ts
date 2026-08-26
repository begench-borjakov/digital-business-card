import type { Experience } from '../../../generated/prisma/client';
import type { ExperienceEntity } from '../entities/experience.entity';
import type { ExperienceRto } from '../rto/experience.rto';

export function toExperienceEntity(experience: Experience): ExperienceEntity {
  return {
    id: experience.id,
    company: experience.company,
    role: experience.role,
    employmentType: experience.employmentType,
    startDate: experience.startDate,
    endDate: experience.endDate,
    current: experience.current,
    description: experience.description,
    highlights: experience.highlights,
    technologies: experience.technologies,
    profileId: experience.profileId,
    createdAt: experience.createdAt,
    updatedAt: experience.updatedAt,
  };
}

export function toExperienceRto(entity: ExperienceEntity): ExperienceRto {
  return {
    id: entity.id,
    company: entity.company,
    role: entity.role,
    employmentType: entity.employmentType,
    startDate: entity.startDate,
    endDate: entity.endDate,
    current: entity.current,
    description: entity.description,
    highlights: entity.highlights,
    technologies: entity.technologies,
    profileId: entity.profileId,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}
