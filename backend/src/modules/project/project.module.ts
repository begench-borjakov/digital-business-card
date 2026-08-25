import { Module } from '@nestjs/common';
import { ProfileModule } from '../profile/profile.module';
import { ProjectRepository } from './project.repository';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [ProfileModule],
  providers: [ProjectResolver, ProjectService, ProjectRepository],
})
export class ProjectModule {}
