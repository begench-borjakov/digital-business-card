import type { Profile } from '../../../generated/prisma/client';
import type { ProfileEntity } from '../entities/profile.entity';
import type { ProfileRto } from '../rto/profile.rto';

export function toProfileEntity(profile: Profile): ProfileEntity {
  return {
    id: profile.id,
    name: profile.name,
    title: profile.title,
    about: profile.about,
    email: profile.email,
    githubUrl: profile.githubUrl,
    location: profile.location,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}

export function toProfileRto(entity: ProfileEntity): ProfileRto {
  return {
    id: entity.id,
    name: entity.name,
    title: entity.title,
    about: entity.about,
    email: entity.email,
    githubUrl: entity.githubUrl,
    location: entity.location,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}
