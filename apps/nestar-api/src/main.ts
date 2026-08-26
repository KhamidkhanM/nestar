import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MaxFileSizeValidator, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './libs/interceptor/logging.interceptor';
import { graphqlUploadExpress } from 'graphql-upload';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress(({ fileSize: 15000000, files: 10 })));
  app.useGlobalPipes(new ValidationPipe());
  app.use(/uploads/, express.static('uploads')); // Serve static files from the "uploads" directory to the "/uploads" route
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors({ origin: true, credentials: true });
  await app.listen(process.env.PORT_API ?? 3000);
}
bootstrap();
