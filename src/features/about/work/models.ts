import type { ReactNode } from 'react';

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
  WoowaBros = 'Woowa Bros',
}

export enum ProjectName {
  LPC = 'LandPress Content',
  OAL = 'Official Account Live CMS',
  VLC = 'VOOM Live CMS',
  LDS_CALENDAR = 'LINE Design System - Calendar',
  UVP = 'Universal Video Player',
  PLACE = 'LINE Place',
  OAP = 'Official Account Profile',
  Bleet = 'Bleet',
  MyBiskit = 'Mybiskit',
  Blind = 'Blind',
  Stove = 'Stove',
  TBD = 'Coming Soon',
}

export enum JobPosition {
  FE = 'Frontend Engineer',
  FULL_STACK = 'Full Stack Engineer',
}

type Technique =
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
  | 'RTL'
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
  | 'Vue2'
  | 'Jotai'
  | 'AWS'
  | 'Puppeteer';

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
