import { useRouter } from 'next/navigation';
import { type MouseEventHandler, useEffect, useState } from 'react';
import type { TOC } from '~/posts/models';
import { ga } from '~/shared/helpers/logger';

type Props = {
  toc: TOC[];
};

export const useToc = ({ toc }: Props) => {
  // NOTE: 현재 보고 있는 섹션의 id
  const [activeId, setActiveId] = useState<string>(() => {
    if (typeof document === 'undefined') return undefined;
    const scrollTop = document.body.scrollTop;
    let closest: string | undefined;
    for (const el of toc) {
      const target = document.getElementById(el.id);
      if (!target) continue;
      if (target.offsetTop <= scrollTop + 100) {
        closest = el.id;
      }
    }
    return closest;
  });
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

    // 뒤로가기 등 스크롤 복원 후 현재 위치에 맞는 헤딩 활성화
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
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    targetEl.scrollIntoView({ behavior: 'smooth' });
    ga('tocClick', { type: 'toc', value: targetId });
    setTargetActiveId(targetId);
    setActiveId(undefined);

    // smooth 스크롤 완료 후 history push (뒤로가기 시 정확한 위치 복원)
    const checkScrollEnd = () => {
      let scrollTimer: ReturnType<typeof setTimeout>;
      const onScroll = () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          document.body.removeEventListener('scroll', onScroll);
          router.push(`#${targetId}`, { scroll: false });
        }, 100);
      };
      document.body.addEventListener('scroll', onScroll, { passive: true });
      // 이미 해당 위치에 있는 경우 대비
      scrollTimer = setTimeout(() => {
        document.body.removeEventListener('scroll', onScroll);
        router.push(`#${targetId}`, { scroll: false });
      }, 100);
    };
    checkScrollEnd();
  };

  return { activeId, handleIndexClick, targetActiveId };
};
