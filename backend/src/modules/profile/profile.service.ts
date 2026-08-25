import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { ProfileEntity } from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';
import type { UpdateProfileData } from './types/profile.types';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async getProfile(): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findFirst();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async updateProfile(data: UpdateProfileData): Promise<ProfileEntity> {
    const hasUpdates = Object.values(data).some((value) => value !== undefined);

    if (!hasUpdates) {
      throw new BadRequestException('At least one field must be provided');
    }

    const profile = await this.profileRepository.findFirst();

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return this.profileRepository.update(profile.id, data);
  }
}
