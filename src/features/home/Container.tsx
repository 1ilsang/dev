'use client';

import Link from 'next/link';
import type { FunctionComponent } from 'react';
import { ga } from '~/shared/helpers/logger';

export const HomeContainer: FunctionComponent = () => {
  const handleLinkClick = () => {
    ga('videoClick', { type: 'router-push', value: '/posts' });
  };

  return (
    <div id="main-content" tabIndex={-1}>
      <Link
        href="/posts"
        className="block cursor-pointer"
        aria-label="포스트 목록으로 이동"
        title="포스트 목록으로 이동"
        onClick={handleLinkClick}
      >
        <h1 className="sr-only">1ilsang 블로그</h1>
        <video
          className="object-cover w-full h-screen max-w-none"
          src="/open.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
        <div
          className="fixed top-0 w-full h-full bg-home contrast-200 mix-blend-overlay"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
};
