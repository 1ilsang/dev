import classNames from 'classnames';
import { useAtom } from 'jotai';
import { type FunctionComponent, type MouseEventHandler, memo } from 'react';

import type { Project } from '~/about/work/models';
import DynamicImage from '~/shared/components/DynamicImage';
import { imageSrcAtom } from '~/shared/components/modal/atoms';
import usePrint from '~/shared/hooks/usePrint';

type ProjectDetailProps = Project & {
  openClassName: string;
};

const ProjectDetail: FunctionComponent<ProjectDetailProps> = memo(
  ({ summary, body, img, openClassName }) => {
    const { print } = usePrint();
    const [, setImageSrc] = useAtom(imageSrcAtom);

    const handleImageClick: MouseEventHandler<HTMLImageElement> = (e) => {
      if (!(e.target instanceof HTMLImageElement)) return;
      setImageSrc(e.target.src);
    };

    return (
      <div className={classNames('break-words', [openClassName])}>
        {!print && img && (
          <DynamicImage
            className="w-full shadow-[1px_1px_8px] shadow-peach"
            width={img.width}
            src={img.url}
            alt={img.alt}
            onClick={handleImageClick}
          />
        )}
        <div className="mt-4 pl-2 py-4">
          <ul className="grid leading-7">
            <span className="ml-1 pb-5">{summary}</span>
            {body}
          </ul>
        </div>
      </div>
    );
  },
);
ProjectDetail.displayName = 'ProjectDetail';

export default ProjectDetail;
