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
  LINE = "LINE Plus Corp",
  Blind = "TeamBlind",
  Smilegate = "Smilegate",
}
export enum ProjectName {
  OAL = "Official Account LIVE CMS",
  VLC = "VOOM LIVE CMS",
  LDS_CALENDAR = "LINE Design System - Calendar",
  UVP = "Universal Video Player",
  PLACE = "LINE Place",
  OAP = "Official Account Profile",
  Bleet = "Bleet",
  MyBiskit = "Mybiskit",
  Blind = "Blind",
  Stove = "Stove",
}

export type Project = {
  name: ProjectName;
  url?: string;
  startDate: number;
  tags: string[];
  endDate?: number;
};
