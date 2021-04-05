export class CreateUserDto {
  name: string;
  gender: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  dob: string;
  nationality: string;
  educationBackground: [EducationBackground];
}

export class EducationBackground {
  organization: string;
  level: string;
  startYear: number;
  endYear: number;
}
