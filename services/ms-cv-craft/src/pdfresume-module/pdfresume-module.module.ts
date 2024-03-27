import { Module } from '@nestjs/common';
import { PdfResumeController } from './pdfresume-module.controller';
import { PdfResumeService } from './pdfresume-module.service';

@Module({
  controllers: [PdfResumeController],
  providers: [PdfResumeService],
})
export class PdfresumeModuleModule {}
