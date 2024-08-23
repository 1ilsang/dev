export enum UniversityName {
  catholic = '가톨릭대학교',
}

export type Education = {
  name: UniversityName;
  url: string;
  logoUrl: string;
  major: string;
  startDate: number;
  endDate?: number;
};
