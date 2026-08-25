import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfileRepository } from '../profile/profile.repository';
import type { SkillEntity } from './entities/skill.entity';
import { SkillRepository } from './skill.repository';
import type {
  CreateSkillData,
  CreateSkillRepositoryData,
  UpdateSkillData,
} from './types/skill.types';

@Injectable()
export class SkillService {
  constructor(
    private readonly skillRepository: SkillRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async getSkills(): Promise<SkillEntity[]> {
    return this.skillRepository.findAll();
  }

  async getSkill(id: string): Promise<SkillEntity> {
    const skill = await this.skillRepository.findById(id);

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    return skill;
  }

  async createSkill(data: CreateSkillData): Promise<SkillEntity> {
    const profile = await this.profileRepository.findFirst();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const existingSkill = await this.skillRepository.findByProfileIdAndName(
      profile.id,
      data.name,
    );

    if (existingSkill) {
      throw new ConflictException('Skill already exists');
    }

    const repositoryData: CreateSkillRepositoryData = {
      ...data,
      profileId: profile.id,
    };

    return this.skillRepository.create(repositoryData);
  }

  async updateSkill(id: string, data: UpdateSkillData): Promise<SkillEntity> {
    const hasUpdates = Object.values(data).some((value) => value !== undefined);

    if (!hasUpdates) {
      throw new BadRequestException('At least one field must be provided');
    }

    const skill = await this.skillRepository.findById(id);

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    if (data.name !== undefined && data.name !== skill.name) {
      const existingSkill = await this.skillRepository.findByProfileIdAndName(
        skill.profileId,
        data.name,
      );

      if (existingSkill) {
        throw new ConflictException('Skill already exists');
      }
    }

    return this.skillRepository.update(id, data);
  }

  async deleteSkill(id: string): Promise<SkillEntity> {
    const skill = await this.skillRepository.findById(id);

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    return this.skillRepository.delete(id);
  }
}
