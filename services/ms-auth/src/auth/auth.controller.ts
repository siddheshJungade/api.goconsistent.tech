import { Controller, Get, InternalServerErrorException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  getData() {
    try {
      return { message: 'hello from server' };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
