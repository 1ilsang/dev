import type { Project } from '../../models';

export type CompanyContentProjectProps = Project & {
  format: string;
  print: boolean;
};
