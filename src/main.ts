import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common/services/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as metadata from '../package.json';

async function bootstrap() { 
  const app = await NestFactory.create(AppModule,{ abortOnError: false });
  app.setGlobalPrefix(process.env.API_PREFIX)

  
  
  const config = new DocumentBuilder()
  .setTitle(metadata.name)
  .setDescription(metadata.description)
  .setVersion(metadata.version)
  .addTag(metadata.name)
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


  await app.listen(process.env.PORT);


  Logger.log(`~ Application is running on: ${await app.getUrl()}`);
}
bootstrap();
