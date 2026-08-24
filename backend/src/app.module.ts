import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { GraphqlModule } from './common/graphql/graphql.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule, GraphqlModule],
})
export class AppModule {}
