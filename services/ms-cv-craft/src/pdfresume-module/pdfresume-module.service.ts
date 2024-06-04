import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  EducationDetailDto,
  ExperienceDetailDto,
  ProjectDetailDto,
  ResumeDataDto,
  ResumeDataStateDto,
  SkillDetailDto,
} from './dto/pdfresume.dto';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs/promises';
import * as showdown from 'showdown';
import Handlebars from 'handlebars';
import * as path from 'path';

@Injectable()
export class PdfResumeService {
  // Step 3: Populate the template with the data
  populateTemplate = (
    compiledTemplate: HandlebarsTemplateDelegate<any>,
    data: ResumeDataDto,
  ) => {
    const newData = {
      TITLE:
        data.personalDetails['First Name'] +
        ' ' +
        data.personalDetails['Last Name'],
      EMAIL: data.personalDetails['Email'],
      EMAIL_LINK: `mailto:${data.personalDetails['Email']}`,
      PHONE_NO: data.personalDetails['Phone No'],
      LINKEDIN_URL: data.personalDetails['Linkedin URL'],
      GITHUB_URL: data.personalDetails['Github URL'],
      EDUCATION_LIST: data.educationDetails.map((item: EducationDetailDto) => ({
        COLLAGE_NAME: item['College/School Name'],
        COLLAGE_YEAR: item['Year'],
        COLLAGE_COURSE: item['Course'],
        COLLAGE_LOCATION: item['Location'],
      })),
      EXPERIENCE_LIST: data.experienceDetails.map(
        (item: ExperienceDetailDto) => ({
          COMPANY_NAME: item['Company'],
          COMPANY_YEAR: item['Date'],
          JOB_ROLE: item['Role'],
          COMPANY_LOCATION: item['Location'],
          DESCRIPTIONS: item['descriptions'],
        }),
      ),
      PROJECT_LIST: data.projectDetails.map((item: ProjectDetailDto) => ({
        PROJECT_NAME: item['Project Name'],
        PROJECT_LINK: item['Link'],
        PROJECT_TECH: item['Tech'],
        DESCRIPTIONS: item['descriptions'],
      })),
      SKILL_LIST: data.skillDetails.map((item: SkillDetailDto) => ({
        CATEGORY: item['Skill Category'],
        SKILLS: item['Skills'],
      })),
    };
    return compiledTemplate(newData);
  };

  // Step 4: Convert Markdown to HTML using Showdown
  convertToHtml = (markdown: string) => {
    const converter = new showdown.Converter();
    return converter.makeHtml(markdown);
  };

  // Step 5: Generate PDF using Puppeteer
  async generatePdf(html: string, customCSS: string | null | undefined) {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/google-chrome-stable',
      args: [
        '--no-sandbox',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    });
    //   {
    //   headless: true,
    //   // executablePath: '/usr/bin/google-chrome-stable',
    //   args: [
    //     '--no-sandbox',
    //     '--disable-setuid-sandbox',
    //     '--disable-dev-shm-usage',
    //     '--single-process',
    //     '--disable-accelerated-2d-canvas',
    //     '--disable-gpu',
    //   ],
    // }
    // );
    const page = await browser.newPage();
    await page.setContent(html);
    if (customCSS) {
      await page.addStyleTag({ content: customCSS });
    }
    const buffer: Buffer = await page.pdf({ format: 'A4' });

    return buffer;
  }

  async createPDFDocument(resumeData: ResumeDataStateDto) {
    try {
      const customCSS = await fs.readFile(
        path.join(process.cwd(), './assets/styles.css'),
        'utf-8',
      );
      const template = await fs.readFile(
        path.join(process.cwd(), './assets/example.md'),
        'utf-8',
      );

      const compiledTemplate = Handlebars.compile(template);

      const populatedTemplate = this.populateTemplate(
        compiledTemplate,
        resumeData.resumeDataState,
      );
      const html = this.convertToHtml(populatedTemplate);
      return await this.generatePdf(html, customCSS);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
