import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT || 8001, () => {
    console.log(`server start on ${process.env.PORT}`);
  });
}
bootstrap();
