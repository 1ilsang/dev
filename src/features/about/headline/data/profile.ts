import type { Profile } from '~/about/headline/models';

type AboutProfileKeys = 'blog' | 'github' | 'gmail' | 'linkedin';
type ProfileKeys = AboutProfileKeys | 'personal';

export const MyProfile: Readonly<Record<ProfileKeys, Readonly<Profile>>> = {
  personal: {
    label: '1ilsang',
    href: '/about',
    imageSrc: '/images/chul.webp',
    description: '클라이밍 하실래염?',
    alt: '1ilsang',
  },
  blog: {
    label: `1ilsang.dev`,
    href: 'https://1ilsang.dev',
    imageSrc: '/images/favicon/favicon-96x96.png',
    alt: 'website',
  },
  github: {
    label: 'github.com/1ilsang',
    href: 'https://github.com/1ilsang',
    imageSrc: '/images/logo/github-white.webp',
    imageSrcBlack: '/images/logo/github-black.webp',
    alt: 'github',
  },
  gmail: {
    label: '1ilsang.dev@gmail.com',
    href: 'mailto:1ilsang.dev@gmail.com',
    imageSrc: '/images/logo/gmail.webp',
    alt: 'gmail',
  },
  linkedin: {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/1ilsang',
    imageSrc: '/images/logo/linkedin.webp',
    alt: 'linked-in',
  },
};

const checkKeys = (key: string): key is AboutProfileKeys => {
  const allowList: AboutProfileKeys[] = ['blog', 'github', 'gmail', 'linkedin'];
  return allowList.includes(key as AboutProfileKeys);
};

export const profileLinks: readonly Profile[] = Object.entries(MyProfile)
  .map(([key, value]) => {
    if (checkKeys(key)) {
      return value;
    }
  })
  .filter((item) => item);
