import type { Project } from '../../models';
import { ProjectName } from '../../models';
import { Section } from '../../shared/Body';

export const TBD: Project = {
  name: ProjectName.TBD,
  tags: [],
  startDate: 1724112000000,
  summary: `TBD`,
  body: (
    <>
      <Section top>TBD</Section>
    </>
  ),
};
