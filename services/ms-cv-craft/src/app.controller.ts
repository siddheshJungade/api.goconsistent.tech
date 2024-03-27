import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  getHello(): object {
    return { code: 200, msg: 'working...' };
  }
}
