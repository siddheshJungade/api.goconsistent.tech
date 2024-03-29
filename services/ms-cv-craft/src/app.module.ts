import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PdfresumeModuleModule } from './pdfresume-module/pdfresume-module.module';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(
    //   `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    //   { dbName: process.env.MONGO_DATABASE },
    // ),
    PdfresumeModuleModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
