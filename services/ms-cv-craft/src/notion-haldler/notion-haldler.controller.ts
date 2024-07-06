import { Body, Controller, Post } from '@nestjs/common';
import { NotionHaldlerService } from './notion-haldler.service';

@Controller('notion')
export class NotionHaldlerController {
  constructor(private readonly notionService: NotionHaldlerService) {}
  @Post('/contact')
  async addContactDetails(@Body() body: any): Promise<any> {
    console.log(body);
    const data = await this.notionService.addContactDetails(body);
    return { code: 200, msg: data };
  }
}
