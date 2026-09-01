import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { SkillEntity } from './entities/skill.entity';
import { toSkillEntity } from './mappers/skill.mapper';
import type {
  CreateSkillRepositoryData,
  UpdateSkillData,
} from './types/skill.types';

@Injectable()
export class SkillRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<SkillEntity[]> {
    const skills = await this.prisma.skill.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    return skills.map(toSkillEntity);
  }

  async findById(id: string): Promise<SkillEntity | null> {
    const skill = await this.prisma.skill.findUnique({
      where: { id },
    });

    if (skill) {
      return toSkillEntity(skill);
    }

    return null;
  }

  async findByProfileIdAndName(
    profileId: string,
    name: string,
  ): Promise<SkillEntity | null> {
    const skill = await this.prisma.skill.findUnique({
      where: {
        profileId_name: {
          profileId,
          name,
        },
      },
    });

    if (skill) {
      return toSkillEntity(skill);
    }

    return null;
  }

  async create(data: CreateSkillRepositoryData): Promise<SkillEntity> {
    const skill = await this.prisma.skill.create({
      data,
    });

    return toSkillEntity(skill);
  }

  async update(id: string, data: UpdateSkillData): Promise<SkillEntity> {
    const skill = await this.prisma.skill.update({
      where: { id },
      data,
    });

    return toSkillEntity(skill);
  }

  async delete(id: string): Promise<SkillEntity> {
    const skill = await this.prisma.skill.delete({
      where: { id },
    });

    return toSkillEntity(skill);
  }
}
