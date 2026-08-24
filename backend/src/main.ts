import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  app.enableCors();
  app.enableShutdownHooks();

  await app.listen(port);

  Logger.log(`Application is running on: ${await app.getUrl()}`, 'Bootstrap');
}

void bootstrap();
