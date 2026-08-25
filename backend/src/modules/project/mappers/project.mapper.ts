import type { Project } from '../../../generated/prisma/client';
import type { ProjectEntity } from '../entities/project.entity';
import type { ProjectRto } from '../rto/project.rto';

export function toProjectEntity(project: Project): ProjectEntity {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    technologies: project.technologies,
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl,
    profileId: project.profileId,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

export function toProjectRto(entity: ProjectEntity): ProjectRto {
  return {
    id: entity.id,
    name: entity.name,
    description: entity.description,
    technologies: entity.technologies,
    githubUrl: entity.githubUrl,
    demoUrl: entity.demoUrl,
    profileId: entity.profileId,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}
