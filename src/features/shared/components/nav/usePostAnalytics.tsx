'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ga } from '~/shared/helpers/logger';
import { POST_BODY_ID } from './constants';

const READ_THRESHOLD = 0.8;
const ENGAGED_SECONDS = 15;
const SCROLL_MILESTONES = [25, 50, 75];
const CODE_BLOCK_VIEW_SECONDS = 5;
const LAST_VISIT_KEY = 'last-visit-ts';
const SESSION_DEPTH_KEY = 'session-post-depth';

export const usePostAnalytics = () => {
  const pathname = usePathname();
  const readFiredRef = useRef(false);
  const engagedFiredRef = useRef(false);
  const milestonesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!pathname.startsWith('/posts/')) return;

    const slug = pathname.replace('/posts/', '');
    readFiredRef.current = false;
    engagedFiredRef.current = false;
    milestonesRef.current = new Set();

    // --- Return Visit ---
    const now = Date.now();
    let lastVisit = 0;
    try {
      lastVisit = Number(localStorage.getItem(LAST_VISIT_KEY) || '0');
    } catch {
      /* empty */
    }
    if (lastVisit > 0) {
      const daysSince = (now - lastVisit) / (1000 * 60 * 60 * 24);
      if (daysSince >= 1 && daysSince <= 7) {
        ga('returnVisit', {
          type: 'days-since',
          value: String(Math.floor(daysSince)),
        });
      }
    }
    try {
      localStorage.setItem(LAST_VISIT_KEY, String(now));
    } catch {
      /* empty */
    }

    // --- Referrer Type ---
    const referrer = document.referrer;
    if (referrer) {
      let refType = 'direct';
      if (/google|bing|naver|daum/.test(referrer)) refType = 'search';
      else if (/twitter|x\.com|linkedin|facebook/.test(referrer))
        refType = 'social';
      else if (!referrer.includes(window.location.host)) refType = 'referral';
      ga('referrerType', { type: refType, value: slug });
    }

    // --- Session Depth ---
    const depth = Number(sessionStorage.getItem(SESSION_DEPTH_KEY) || '0') + 1;
    sessionStorage.setItem(SESSION_DEPTH_KEY, String(depth));
    if (depth >= 2) {
      ga('sessionDepth', { type: 'post-count', value: String(depth) });
    }

    // --- Engaged Timer ---
    const engagedTimer = setTimeout(() => {
      if (engagedFiredRef.current) return;
      engagedFiredRef.current = true;
      ga('postEngaged', { type: 'time-on-page', value: slug });
    }, ENGAGED_SECONDS * 1000);

    // --- Scroll: Read Complete + Milestones + Reversal ---
    let lastScrollTop = document.body.scrollTop;
    let reversalFired = false;
    const scrollHandler = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.body;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) return;
      const ratio = scrollTop / maxScroll;
      const percent = Math.floor(ratio * 100);

      // Milestones
      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone && !milestonesRef.current.has(milestone)) {
          milestonesRef.current.add(milestone);
          ga('scrollMilestone', {
            type: `${milestone}%`,
            value: slug,
          });
        }
      }

      // Read complete
      if (!readFiredRef.current && ratio >= READ_THRESHOLD) {
        readFiredRef.current = true;
        ga('postReadComplete', { type: 'scroll-depth', value: slug });
      }

      // Scroll reversal
      if (
        !reversalFired &&
        lastScrollTop - scrollTop > 200 &&
        lastScrollTop > 300
      ) {
        reversalFired = true;
        ga('scrollReversal', { type: 're-read', value: slug });
      }
      lastScrollTop = scrollTop;
    };

    // --- Code Block View (IntersectionObserver) ---
    const codeTimers = new Map<Element, NodeJS.Timeout>();
    const codeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timer = setTimeout(() => {
              const lang =
                entry.target
                  .querySelector('code')
                  ?.className.match(/language-(\w+)/)?.[1] || 'unknown';
              ga('codeBlockView', { type: lang, value: slug });
              codeObserver.unobserve(entry.target);
              codeTimers.delete(entry.target);
            }, CODE_BLOCK_VIEW_SECONDS * 1000);
            codeTimers.set(entry.target, timer);
          } else {
            const timer = codeTimers.get(entry.target);
            if (timer) {
              clearTimeout(timer);
              codeTimers.delete(entry.target);
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    // --- Heading Anchor Click (share intent) ---
    const anchorClickHandler = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href')?.slice(1) || '';
      ga('headingAnchorClick', { type: 'share-intent', value: id });
    };

    // --- Text Copy (인용/공유 의도) ---
    const copyHandler = () => {
      const selection = document.getSelection()?.toString().trim();
      if (!selection || selection.length < 10) return;
      ga('textCopy', {
        type: 'selection',
        value: selection.slice(0, 80),
      });
    };

    // --- Reading Time (완독까지 걸린 시간) ---
    const startTime = Date.now();

    const postBody = document.querySelector(POST_BODY_ID);
    if (postBody) {
      postBody.querySelectorAll('figure').forEach((fig) => {
        if (fig.querySelector('pre')) codeObserver.observe(fig);
      });
      postBody.addEventListener('click', anchorClickHandler);
    }

    document.body.addEventListener('scroll', scrollHandler, { passive: true });
    document.addEventListener('copy', copyHandler);

    return () => {
      document.body.removeEventListener('scroll', scrollHandler);
      document.removeEventListener('copy', copyHandler);
      postBody?.removeEventListener('click', anchorClickHandler);
      clearTimeout(engagedTimer);
      codeObserver.disconnect();
      codeTimers.forEach((timer) => clearTimeout(timer));

      // 이탈 시 읽기 시간 기록 (완독한 경우만)
      if (readFiredRef.current) {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        ga('readingTime', { type: 'seconds', value: String(seconds) });
      }
    };
  }, [pathname]);
};
