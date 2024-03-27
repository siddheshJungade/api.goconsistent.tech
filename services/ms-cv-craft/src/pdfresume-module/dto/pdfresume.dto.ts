import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class EducationDetailDto {
  collegeName: string;
  course: string;
  location: string;
  year: string;
}

export class ExperienceDetailDto {
  descriptions: string[];
  company: string;
  role: string;
  location: string;
  date: string;
}

export class ProjectDetailDto {
  descriptions: string[];
  projectName: string;
  tech: string;
  link: string;
}

export class AchievementDetailDto {
  descriptions: string[];
  achievements: string;
}

export class SkillDetailDto {
  skillCategory: string;
  skills: string;
}

export class PersonalDetailDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  githubUrl: string;
  linkedinUrl: string;
}

export class ResumeDataDto {
  educationDetails: EducationDetailDto[];
  experienceDetails: ExperienceDetailDto[];
  projectDetails: ProjectDetailDto[];
  achievementDetails: AchievementDetailDto[];
  skillDetails: SkillDetailDto[];
  @IsNotEmpty()
  @Type(() => PersonalDetailDto)
  personalDetails: PersonalDetailDto;
}

export class ResumeDataStateDto {
  @ValidateNested()
  @Type(() => ResumeDataDto)
  resumeDataState: ResumeDataDto;
}
