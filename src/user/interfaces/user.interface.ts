export interface IUser {
  id: string;
  name: string;
  gender: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  dob: string;
  nationality: string;
  educationBackground: [IEducationBackground];
}

export interface IEducationBackground {
  organization: string;
  level: string;
  startYear: number;
  endYear: number;
}
