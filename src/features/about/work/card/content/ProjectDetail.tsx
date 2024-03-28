import { FunctionComponent, memo } from 'react';

import { Project } from '~/about/work/models';
import DynamicImage from '~/shared/components/DynamicImage';

type ProjectDetailProps = Project;

const ProjectDetail: FunctionComponent<ProjectDetailProps> = memo(
  ({ summary, body, img }) => {
    return (
      <>
        {img && (
          <DynamicImage
            className="image"
            width={img.width}
            src={img.url}
            alt={img.alt}
          />
        )}
        <div className="text">
          <p className="summary">{summary}</p>
          <ul className="main">{body}</ul>
        </div>
      </>
    );
  },
);
ProjectDetail.displayName = 'ProjectDetail';

export default ProjectDetail;
