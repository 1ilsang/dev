import { useRouter } from 'next/navigation';
import { type MouseEventHandler, useEffect, useState } from 'react';
import type { TOC } from '~/posts/models';

type Props = {
  toc: TOC[];
};

const useFloatingIndex = ({ toc }: Props) => {
  const [activeId, setActiveId] = useState<string>();
  const [targetActiveId, setTargetActiveId] = useState<string>();
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setTargetActiveId(undefined);
    }, 1000);
    return () => clearTimeout(timer);
  }, [targetActiveId]);

  const handleIndexClick: MouseEventHandler<HTMLLIElement> = (event) => {
    const targetId = event.currentTarget.id;
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    router.replace(`#${targetId}`, { scroll: false });
    setTargetActiveId(targetId);
    setActiveId(undefined);
  };

  return { activeId, handleIndexClick, targetActiveId };
};

export default useFloatingIndex;
