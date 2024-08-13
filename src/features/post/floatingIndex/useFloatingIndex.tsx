import { useRouter } from 'next/navigation';
import { type MouseEventHandler, useEffect, useState } from 'react';
import { type PostType } from '~/posts/models';

type Props = {
  post: PostType;
};

type FloatingIndexType = Element | Element[];

const useFloatingIndex = ({ post }: Props) => {
  const [list, setList] = useState<FloatingIndexType[]>([]);
  const [activeId, setActiveId] = useState<string>();
  const router = useRouter();

  useEffect(
    function setAsideText() {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = post.content;
      const indexItems = getHeadingItems(tempDiv);
      tempDiv.innerHTML = '';

      setList(indexItems);
    },
    [post.title],
  );

  useEffect(
    function setDocumentObserver() {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            setActiveId(entry.target.id);
          });
        },
        { rootMargin: '0px 0px -75% 0px', threshold: 1 },
      );
      const indexItems = getHeadingItems(document);
      indexItems.flat(1).forEach((el) => io.observe(el));

      return () => {
        io.disconnect();
      };
    },
    [post.title],
  );

  const getHeadingItems = (target: Document | HTMLDivElement) => {
    return Array.from(
      target.querySelectorAll('h2[data-heading], h3[data-heading]'),
    ).reduce((acc, cur) => {
      const lastElement = acc[acc.length - 1];
      if (acc.length === 0 || cur.tagName === 'H2') {
        acc.push(cur);
      } else if (cur.tagName === 'H3') {
        const lastElementIsArray = Array.isArray(lastElement);
        const next = lastElementIsArray ? lastElement : [];
        next.push(cur);
        if (!lastElementIsArray) {
          acc.push(next);
        }
      }
      return acc;
    }, [] as FloatingIndexType[]);
  };

  const handleIndexClick: MouseEventHandler<HTMLLIElement> = (event) => {
    router.replace(`#${event.currentTarget.getAttribute('data-id')}`);
    setActiveId(undefined);
  };

  return { list, activeId, handleIndexClick };
};

export default useFloatingIndex;
