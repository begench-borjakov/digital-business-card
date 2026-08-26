import { Module } from '@nestjs/common';
import { ProfileModule } from '../profile/profile.module';
import { ExperienceRepository } from './experience.repository';
import { ExperienceResolver } from './experience.resolver';
import { ExperienceService } from './experience.service';

@Module({
  imports: [ProfileModule],
  providers: [ExperienceResolver, ExperienceService, ExperienceRepository],
})
export class ExperienceModule {}
