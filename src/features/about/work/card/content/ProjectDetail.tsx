import { FunctionComponent, memo } from 'react';

import { Project } from '~/about/work/models';
import DynamicImage from '~/shared/components/DynamicImage';
import usePrint from '~/shared/hooks/usePrint';

type ProjectDetailProps = Project;

const ProjectDetail: FunctionComponent<ProjectDetailProps> = memo(
  ({ summary, body, img }) => {
    const { print } = usePrint();

    return (
      <>
        {!print && img && (
          <DynamicImage
            className="image"
            width={img.width}
            src={img.url}
            alt={img.alt}
          />
        )}
        <div className="text">
          <ul className="main">
            <span className="summary">{summary}</span>
            {body}
          </ul>
        </div>
      </>
    );
  },
);
ProjectDetail.displayName = 'ProjectDetail';

export default ProjectDetail;
