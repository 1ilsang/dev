import { ReactNode } from 'react';

export type Company = {
  company: CompanyName;
  companyHref: string;
  companyLogoUrl: string;
  projectList: Project[];
  workStartDate: number;
  workEndDate?: number;
  position?: string;
};

export enum CompanyName {
  LINE = 'LINE Plus Corp',
  Blind = 'TeamBlind',
  Smilegate = 'Smilegate',
}

export enum ProjectName {
  LPC = 'LandPress Content',
  OAL = 'Official Account LIVE CMS',
  VLC = 'VOOM LIVE CMS',
  LDS_CALENDAR = 'LINE Design System - Calendar',
  UVP = 'Universal Video Player',
  PLACE = 'LINE Place',
  OAP = 'Official Account Profile',
  Bleet = 'Bleet',
  MyBiskit = 'Mybiskit',
  Blind = 'Blind',
  Stove = 'Stove',
}

export enum JobPosition {
  FE = 'Frontend Engineer',
  FULL_STACK = 'Fullstack Engineer',
}

export type Technique =
  | 'Vite'
  | 'pnpm'
  | 'React-Query'
  | 'HTMLVideo'
  | 'Preact10'
  | 'Zustand'
  | 'Turborepo'
  | 'Storybook'
  | 'Cypress'
  | 'Webpack'
  | 'React18'
  | 'React-Testing-Library'
  | 'WebSocket'
  | 'MSW'
  | 'Chart.js'
  | 'Next12'
  | 'Redux'
  | 'Redux-Saga'
  | 'Swiper'
  | 'Node.js'
  | 'MySQL'
  | 'Swagger'
  | 'Firebase'
  | 'Nuxt2'
  | 'PHP'
  | 'Docker'
  | 'Redis'
  | 'Vue2';

export type Project = {
  name: ProjectName;
  url?: string;
  img?: {
    url: string;
    alt: string;
    width?: number;
  };
  summary: string;
  body: ReactNode;
  startDate: number;
  tags: Technique[];
  endDate?: number;
};
