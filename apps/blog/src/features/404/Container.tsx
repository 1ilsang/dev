import { FunctionComponent } from 'react';

import ExternalLink from '~/shared/components/ExternalLink';

const description = `

     404 ERROR

Do you enjoy surfing?


`;

const NotFoundContainer: FunctionComponent = () => {
  return (
    <div className="not-found-container">
      <div>
        <img src="/assets/404.webp" alt="surfing" width={720} height={580} />
      </div>
      <audio
        className="mt-4"
        src="/assets/jackpot.mp4"
        controls
        autoPlay
        loop
      />
      <pre>
        <code>{description}</code>
        <div className="small">
          Image Copyright:&nbsp;
          <ExternalLink
            label="Freepik"
            href="https://kr.freepik.com/free-vector/isometric-summer-beach-vacation-concept_9515534.htm"
          />
        </div>
        <div className="small">
          Audio:&nbsp;
          <ExternalLink
            label="TheFatRat - Jackpot"
            href="https://youtu.be/kL8CyVqzmkc"
          />
        </div>
      </pre>
    </div>
  );
};

export default NotFoundContainer;
