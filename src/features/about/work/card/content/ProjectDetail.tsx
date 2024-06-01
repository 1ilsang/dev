import { useAtom } from 'jotai';
import { type FunctionComponent, type MouseEventHandler, memo } from 'react';

import { Project } from '~/about/work/models';
import DynamicImage from '~/shared/components/DynamicImage';
import { imageSrcAtom } from '~/shared/components/modal/atoms';
import usePrint from '~/shared/hooks/usePrint';

type ProjectDetailProps = Project;

const ProjectDetail: FunctionComponent<ProjectDetailProps> = memo(
  ({ summary, body, img }) => {
    const { print } = usePrint();
    const [, setImageSrc] = useAtom(imageSrcAtom);

    const handleImageClick: MouseEventHandler<HTMLImageElement> = (e) => {
      if (!(e.target instanceof HTMLImageElement)) return;
      setImageSrc(e.target.src);
    };

    return (
      <>
        {!print && img && (
          <DynamicImage
            className="image"
            width={img.width}
            src={img.url}
            alt={img.alt}
            onClick={handleImageClick}
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
