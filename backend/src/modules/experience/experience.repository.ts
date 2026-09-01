import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { ExperienceEntity } from './entities/experience.entity';
import { toExperienceEntity } from './mappers/experience.mapper';
import type {
  CreateExperienceRepositoryData,
  UpdateExperienceData,
} from './types/experience.types';

@Injectable()
export class ExperienceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ExperienceEntity[]> {
    const experiences = await this.prisma.experience.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    return experiences.map(toExperienceEntity);
  }

  async findById(id: string): Promise<ExperienceEntity | null> {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });

    if (experience) {
      return toExperienceEntity(experience);
    }

    return null;
  }

  async create(
    data: CreateExperienceRepositoryData,
  ): Promise<ExperienceEntity> {
    const experience = await this.prisma.experience.create({ data });

    return toExperienceEntity(experience);
  }

  async update(
    id: string,
    data: UpdateExperienceData,
  ): Promise<ExperienceEntity> {
    const experience = await this.prisma.experience.update({
      where: { id },
      data,
    });

    return toExperienceEntity(experience);
  }

  async delete(id: string): Promise<ExperienceEntity> {
    const experience = await this.prisma.experience.delete({
      where: { id },
    });

    return toExperienceEntity(experience);
  }
}
