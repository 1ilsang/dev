import type { FunctionComponent } from 'react';

import { ExternalLink } from '~/shared/components/ExternalLink';
import { MainContainer } from '~/shared/components/MainContainer';

const description = `

      404 ERROR

 Do you enjoy surfing?

`;

export const NotFoundContainer: FunctionComponent = () => {
  return (
    <MainContainer className="flex flex-col items-center">
      <h1 className="sr-only">404 페이지를 찾을 수 없습니다</h1>
      <div>
        <img
          src="/images/404.webp"
          alt="서핑하는 모습"
          width={720}
          height={580}
        />
      </div>
      <pre>
        <code>{description}</code>
      </pre>
      <p>
        Image Copyright:&nbsp;
        <ExternalLink
          label="Freepik"
          href="https://kr.freepik.com/free-vector/isometric-summer-beach-vacation-concept_9515534.htm"
        />
      </p>
    </MainContainer>
  );
};
