import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { ProjectEntity } from './entities/project.entity';
import { toProjectEntity } from './mappers/project.mapper';
import type {
  CreateProjectRepositoryData,
  UpdateProjectData,
} from './types/project.types';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProjectEntity[]> {
    const projects = await this.prisma.project.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    return projects.map(toProjectEntity);
  }

  async findById(id: string): Promise<ProjectEntity | null> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (project) {
      return toProjectEntity(project);
    }

    return null;
  }

  async create(data: CreateProjectRepositoryData): Promise<ProjectEntity> {
    const project = await this.prisma.project.create({
      data,
    });

    return toProjectEntity(project);
  }

  async update(id: string, data: UpdateProjectData): Promise<ProjectEntity> {
    const project = await this.prisma.project.update({
      where: { id },
      data,
    });

    return toProjectEntity(project);
  }

  async delete(id: string): Promise<ProjectEntity> {
    const project = await this.prisma.project.delete({
      where: { id },
    });

    return toProjectEntity(project);
  }
}
