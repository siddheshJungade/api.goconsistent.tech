import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PdfResumeService } from './pdfresume-module.service';
import { ResumeDataStateDto } from './dto/pdfresume.dto';
import { Response } from 'express';

@Controller('pdf')
@UsePipes(new ValidationPipe())
export class PdfResumeController {
  constructor(private readonly pdfService: PdfResumeService) {}

  @Get('resume')
  getHello(): string {
    return 'resume';
  }

  @Post('resume')
  async postPdfResume(
    @Body() resumeDataState: ResumeDataStateDto,
    @Res() res: Response,
  ) {
    try {
      const response = await this.pdfService.createPDFDocument(resumeDataState);
      const firstName =
        resumeDataState.resumeDataState.personalDetails['First Name'];
      const lastName =
        resumeDataState.resumeDataState.personalDetails['Last Name'];

      const fileName = firstName + ' ' + lastName;
      // res.contentType('application/pdf');
      res.header(
        'Content-Disposition',
        `attachment; filename="${fileName} RESUME.pdf"`,
      );
      res.status(201).send(response);
    } catch (e) {
      throw e;
    }
  }
}
