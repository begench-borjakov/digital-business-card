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
    phone: profile.phone,
    telegram: profile.telegram,
    githubUrl: profile.githubUrl,
    linkedinUrl: profile.linkedinUrl,
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
    phone: entity.phone,
    telegram: entity.telegram,
    githubUrl: entity.githubUrl,
    linkedinUrl: entity.linkedinUrl,
    location: entity.location,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}
