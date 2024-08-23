'use client';

import { type FunctionComponent } from 'react';

import { cliLogo } from '~/shared/constants/blog';

let bannerOpened = false;

export const BannerWrapper: FunctionComponent = () => {
  if (!bannerOpened) {
    bannerOpened = true;
    if (typeof window !== 'undefined') {
      console.info(cliLogo);
    }
  }
  return <></>;
};
