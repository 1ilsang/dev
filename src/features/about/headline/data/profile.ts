import type { Profile } from '~/about/headline/models';

type AboutProfileKeys = 'blog' | 'github' | 'gmail' | 'linkedin';
type ProfileKeys = AboutProfileKeys | 'personal';

export const MyProfile: Readonly<Record<ProfileKeys, Readonly<Profile>>> = {
  personal: {
    label: '1ilsang',
    href: '/about',
    imageSrc: '/assets/chul.png',
    description: '클라이밍 하실래염?',
    alt: '1ilsang',
  },
  blog: {
    label: `1ilsang.dev`,
    href: 'https://1ilsang.dev',
    imageSrc: '/favicon/favicon-46x46.png',
    alt: 'website',
  },
  github: {
    label: 'github.com/1ilsang',
    href: 'https://github.com/1ilsang',
    imageSrc: '/assets/logo/github.webp',
    imageSrcBlack: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    alt: 'github',
  },
  gmail: {
    label: '1ilsangc@gmail.com',
    href: 'mailto:1ilsangc@gmail.com',
    imageSrc: '/assets/logo/gmail.webp',
    alt: 'gmail',
  },
  linkedin: {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/1ilsang',
    imageSrc: '/assets/logo/linkedin.webp',
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
