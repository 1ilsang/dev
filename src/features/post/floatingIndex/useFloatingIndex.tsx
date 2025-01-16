import { useRouter } from 'next/navigation';
import { type MouseEventHandler, useEffect, useState } from 'react';
import type { TOC } from '~/posts/models';

type Props = {
  toc: TOC[];
};

const useFloatingIndex = ({ toc }: Props) => {
  const [activeId, setActiveId] = useState<string>();
  const router = useRouter();

  useEffect(function setDocumentObserver() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveId(entry.target.id);
        });
      },
      { rootMargin: '0px 0px -95% 0px', threshold: 0.3 },
    );
    toc.forEach((el) => {
      const target = document.getElementById(el.id);
      io.observe(target);
    });

    return () => {
      io.disconnect();
    };
  }, []);

  const handleIndexClick: MouseEventHandler<HTMLLIElement> = (event) => {
    router.replace(event.currentTarget.id);
    setActiveId(undefined);
  };

  return { activeId, handleIndexClick };
};

export default useFloatingIndex;
