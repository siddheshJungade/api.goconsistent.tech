import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkStatus(): object {
    return { code: 200, msg: 'working...' };
  }
}
