import { Module } from '@nestjs/common';
import { ProfileModule } from '../profile/profile.module';
import { SkillRepository } from './skill.repository';
import { SkillResolver } from './skill.resolver';
import { SkillService } from './skill.service';

@Module({
  imports: [ProfileModule],
  providers: [SkillResolver, SkillService, SkillRepository],
})
export class SkillModule {}
