import { Module } from '@nestjs/common';
import { ConfigModule } from './common/config/config.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule],
})
export class AppModule {}
