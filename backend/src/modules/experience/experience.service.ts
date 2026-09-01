import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfileRepository } from '../profile/profile.repository';
import type { ExperienceEntity } from './entities/experience.entity';
import { ExperienceRepository } from './experience.repository';
import type {
  CreateExperienceData,
  CreateExperienceRepositoryData,
  UpdateExperienceData,
} from './types/experience.types';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly experienceRepository: ExperienceRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async getExperiences(): Promise<ExperienceEntity[]> {
    return this.experienceRepository.findAll();
  }

  async getExperience(id: string): Promise<ExperienceEntity> {
    const experience = await this.experienceRepository.findById(id);

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    return experience;
  }

  async createExperience(
    data: CreateExperienceData,
  ): Promise<ExperienceEntity> {
    this.validateDates(
      data.startDate,
      data.endDate ?? null,
      data.current ?? false,
    );

    const profile = await this.profileRepository.findFirst();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const repositoryData: CreateExperienceRepositoryData = {
      ...data,
      profileId: profile.id,
    };

    return this.experienceRepository.create(repositoryData);
  }

  async updateExperience(
    id: string,
    data: UpdateExperienceData,
  ): Promise<ExperienceEntity> {
    const hasUpdates = Object.values(data).some((value) => value !== undefined);

    if (!hasUpdates) {
      throw new BadRequestException('At least one field must be provided');
    }

    const experience = await this.experienceRepository.findById(id);

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    let startDate = experience.startDate;
    let endDate = experience.endDate;
    let current = experience.current;

    if (data.startDate !== undefined) {
      startDate = data.startDate;
    }

    if (data.endDate !== undefined) {
      endDate = data.endDate;
    }

    if (data.current !== undefined) {
      current = data.current;
    }

    this.validateDates(startDate, endDate, current);

    return this.experienceRepository.update(id, data);
  }

  async deleteExperience(id: string): Promise<ExperienceEntity> {
    const experience = await this.experienceRepository.findById(id);

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    return this.experienceRepository.delete(id);
  }

  private validateDates(
    startDate: string,
    endDate: string | null,
    current: boolean,
  ): void {
    if (current) {
      if (endDate !== null) {
        throw new BadRequestException(
          'End date must be empty for a current position',
        );
      }

      return;
    }

    if (!endDate) {
      throw new BadRequestException(
        'End date is required when the position is not current',
      );
    }

    if (this.toMonthIndex(endDate) <= this.toMonthIndex(startDate)) {
      throw new BadRequestException('End date must be after start date');
    }
  }

  private toMonthIndex(value: string): number {
    const [month, year] = value.split('/').map(Number);

    return year * 12 + month;
  }
}
