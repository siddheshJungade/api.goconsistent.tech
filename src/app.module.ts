import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import {ConfigModule} from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpLoggerMiddleware } from './commons/middleware/httplogger/httplogger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(
      { 
        isGlobal: true,
        validationSchema: Joi.object({
            NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
            PORT: Joi.number().default(3000),
            MONGO_URI: Joi.string().required(),
        })
      }    
    ), 
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
