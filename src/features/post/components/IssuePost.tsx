import type { FunctionComponent } from 'react';

import { ExternalLink } from '~/shared/components/ExternalLink';

type IssuePostProps = {
  title: string;
};

export const IssuePost: FunctionComponent<IssuePostProps> = ({ title }) => {
  const NEW_ISSUE_URL = 'https://github.com/1ilsang/dev/issues/new';

  const ICE_CUBE_LABEL = 'labels=🧊 comment';
  const ASSIGNEES = 'assignees=1ilsang';
  const TITLE = `title=[🧊] ${encodeURI(title)}`;
  const BODY = `body=<!-- 환영합니다. 이슈 남겨주시면 빠르게 답변드리겠습니다. 🙇 -->`;
  const queries = `${ICE_CUBE_LABEL}&${ASSIGNEES}&${TITLE}&${BODY}`;

  return (
    <ExternalLink
      className="mt-24 [&&]:text-transparent bg-rainbow-water bg-clip-text bg-[length:400%_400%] animate-rainbow-water"
      href={`${NEW_ISSUE_URL}?${queries}`}
      label="📮 이 포스트에 관심 있으신가요? 이슈를 남겨주세요! 👍"
    />
  );
};
