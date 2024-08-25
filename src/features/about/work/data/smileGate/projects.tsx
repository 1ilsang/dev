import type { Project } from '../../models';
import { ProjectName } from '../../models';

import ExternalLink from '~/shared/components/ExternalLink';
import { Paragraph, Section, Sentence } from '../../shared/Body';

export const Stove: Project = {
  name: ProjectName.Stove,
  tags: ['Vue2'],
  startDate: 1520780400000,
  endDate: 1525791600000,
  summary: `모바일 게임 유저 타임라인 개발`,
  body: (
    <>
      <Section top>방명록 CRUD 기능 개발</Section>
      <Section top>댓글 / 신고하기 기능 개발</Section>
      <Section top>
        재밌고 즐겁게 인턴생활 적응
        <Paragraph>
          <Sentence value=" ">
            <ExternalLink
              label="SDC 참여!"
              href="https://blog.naver.com/1ilsang/221313294314"
            />
          </Sentence>
        </Paragraph>
      </Section>
    </>
  ),
};
