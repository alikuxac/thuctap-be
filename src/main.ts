import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'log', 'warn', 'debug', 'verbose'],
  });
  setupSwagger(app);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 3000;
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
