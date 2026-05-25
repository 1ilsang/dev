import { useRouter } from 'next/navigation';
import { type MouseEventHandler, useEffect, useState } from 'react';
import type { TOC } from '~/posts/models';
import { ga } from '~/shared/helpers/logger';

type Props = {
  toc: TOC[];
};

export const useToc = ({ toc }: Props) => {
  // NOTE: 현재 보고 있는 섹션의 id
  const [activeId, setActiveId] = useState<string>();
  // NOTE: 이동할 섹션의 id
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
      if (target) io.observe(target);
    });

    // 스크롤 복원 후 현재 위치에 맞는 헤딩 활성화
    const rafId = requestAnimationFrame(() => {
      const scrollTop = document.body.scrollTop;
      let closest: string | undefined;
      for (const el of toc) {
        const target = document.getElementById(el.id);
        if (!target) continue;
        if (target.offsetTop <= scrollTop + 100) {
          closest = el.id;
        }
      }
      if (closest) setActiveId(closest);
    });

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(
    function showsTargetIdForNNSecond() {
      const NN = 1000;
      const timer = setTimeout(() => {
        setTargetActiveId(undefined);
      }, NN);
      return () => clearTimeout(timer);
    },
    [targetActiveId],
  );

  useEffect(function hashHistoryPushBackScrollObserver() {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      const hash = decodeURIComponent(window.location.hash);
      const targetId = hash.slice(1);
      setTargetActiveId(targetId);
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleIndexClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.id;
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    ga('tocClick', { type: 'toc', value: targetId });
    router.push(`#${targetId}`, { scroll: false });
    setTargetActiveId(targetId);
    setActiveId(undefined);
  };

  return { activeId, handleIndexClick, targetActiveId };
};
