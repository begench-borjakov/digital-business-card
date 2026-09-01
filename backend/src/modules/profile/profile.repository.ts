import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { ProfileEntity } from './entities/profile.entity';
import { toProfileEntity } from './mappers/profile.mapper';
import type { UpdateProfileData } from './types/profile.types';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findFirst(): Promise<ProfileEntity | null> {
    const profile = await this.prisma.profile.findFirst();

    if (profile) {
      return toProfileEntity(profile);
    }

    return null;
  }

  async update(id: string, data: UpdateProfileData): Promise<ProfileEntity> {
    const profile = await this.prisma.profile.update({
      where: { id },
      data,
    });

    return toProfileEntity(profile);
  }
}
