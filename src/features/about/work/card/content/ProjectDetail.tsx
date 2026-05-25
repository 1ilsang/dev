import classNames from 'classnames';
import { useSetAtom } from 'jotai';
import { type FunctionComponent, type MouseEventHandler, memo } from 'react';

import type { Project } from '~/about/work/models';
import DynamicImage from '~/shared/components/DynamicImage';
import { ExternalLink } from '~/shared/components/ExternalLink';
import { imageAltAtom, imageSrcAtom } from '~/shared/components/modal/atoms';

type ProjectDetailProps = Pick<Project, 'summary' | 'body' | 'img' | 'url'> & {
  id: string;
  openClassName: string;
  print: boolean;
};

const ProjectDetail: FunctionComponent<ProjectDetailProps> = memo(
  ({ id, summary, body, img, url, openClassName, print }) => {
    const setImageSrc = useSetAtom(imageSrcAtom);
    const setImageAlt = useSetAtom(imageAltAtom);

    const handleImageClick: MouseEventHandler<HTMLButtonElement> = () => {
      if (!img) return;
      setImageSrc(img.url);
      setImageAlt(img.alt);
    };

    return (
      <div
        id={id}
        className={classNames('break-words print:animate-none', [
          openClassName,
        ])}
      >
        {!print && img && (
          <DynamicImage
            className="w-full shadow-[1px_1px_8px] shadow-peach"
            width={img.width}
            src={img.url}
            alt={img.alt}
            onClick={handleImageClick}
          />
        )}
        <div className="py-4 pl-2 mt-4">
          <ul className="grid leading-7">
            <li className="pb-5 ml-1">{summary}</li>
            {body}
          </ul>
        </div>
        {url && (
          <ExternalLink
            className="mt-2 mb-4.5"
            href={url}
            label={`> 서비스 링크`}
          />
        )}
      </div>
    );
  },
);
ProjectDetail.displayName = 'ProjectDetail';

export default ProjectDetail;
