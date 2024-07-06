import { Body, Controller, Post, Res } from '@nestjs/common';
import { NotionHaldlerService } from './notion-haldler.service';
import { Response } from 'express';
@Controller('notion')
export class NotionHaldlerController {
  constructor(private readonly notionService: NotionHaldlerService) {}
  @Post('/contact')
  async addContactDetails(
    @Body() body: any,
    @Res() res: Response,
  ): Promise<any> {
    if (Object.keys(body).length > 0) {
      const data = await this.notionService.addContactDetails(body);
      console.log(data);
      res.status(201).send({ message: 'contact added sucesfully' });
    } else {
      res.status(401).send({ message: 'Empty Contact Object' });
    }
  }
}
