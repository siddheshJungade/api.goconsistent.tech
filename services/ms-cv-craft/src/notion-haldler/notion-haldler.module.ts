import { Module } from '@nestjs/common';
import { NotionHaldlerController } from './notion-haldler.controller';
import { NotionHaldlerService } from './notion-haldler.service';

@Module({
  controllers: [NotionHaldlerController],
  providers: [NotionHaldlerService],
})
export class NotionHaldlerModule {}
