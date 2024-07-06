import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';

@Injectable()
export class NotionHaldlerService {
  private notion = new Client({ auth: process.env.NOTION_API_KEY });
  async addContactDetails(contactObj: any): Promise<any> {
    const response = await this.notion.pages.create({
      parent: {
        database_id: 'c43950348b12461a9812f630e9ca6b1c',
      },
      properties: {
        Message: {
          rich_text: [
            {
              text: {
                content: contactObj['message'],
              },
            },
          ],
        },
        Email: {
          email: contactObj['email'],
        },
        Phone: {
          phone_number: contactObj['mobile'],
        },
        Source: {
          multi_select: [
            {
              name: contactObj['source'],
            },
          ],
        },
        Name: {
          title: [
            {
              text: {
                content: contactObj['name'],
              },
            },
          ],
        },
      },
    } as any);
    return response;
  }
}
