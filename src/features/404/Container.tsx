import type { FunctionComponent } from 'react';

import ExternalLink from '~/shared/components/ExternalLink';
import { MainContainer } from '~/shared/components/MainContainer';

const description = `

      404 ERROR

 Do you enjoy surfing?

`;

const NotFoundContainer: FunctionComponent = () => {
  return (
    <MainContainer className="flex flex-col items-center">
      <div>
        <img src="/images/404.webp" alt="surfing" width={720} height={580} />
      </div>
      <pre>
        <code>{description}</code>
        <div>
          Image Copyright:&nbsp;
          <ExternalLink
            label="Freepik"
            href="https://kr.freepik.com/free-vector/isometric-summer-beach-vacation-concept_9515534.htm"
          />
        </div>
      </pre>
    </MainContainer>
  );
};

export default NotFoundContainer;
