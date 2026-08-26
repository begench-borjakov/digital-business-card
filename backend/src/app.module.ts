import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { GraphqlModule } from './common/graphql/graphql.module';
import { PrismaModule } from './database/prisma.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProjectModule } from './modules/project/project.module';
import { SkillModule } from './modules/skill/skill.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    GraphqlModule,
    ProfileModule,
    ExperienceModule,
    SkillModule,
    ProjectModule,
  ],
})
export class AppModule {}
