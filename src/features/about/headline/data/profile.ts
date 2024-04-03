import { Profile, ProfileLabel } from '~/about/headline/models';

export const profileLinks: Profile[] = [
  {
    label: ProfileLabel.blog,
    href: 'https://1ilsang.dev',
    imageSrc: '/favicon/favicon-46x46.png',
    alt: 'website',
  },
  {
    label: ProfileLabel.github,
    href: 'https://github.com/1ilsang',
    imageSrc: '/assets/logo/github.webp',
    alt: 'github',
  },
  {
    label: ProfileLabel.gmail,
    href: 'mailto:1ilsangc@gmail.com',
    imageSrc: '/assets/logo/gmail.webp',
    alt: 'gmail',
  },
  {
    label: ProfileLabel.linkedin,
    href: 'https://www.linkedin.com/in/sangchul-lee-91a32b154',
    imageSrc: '/assets/logo/linkedin.webp',
    alt: 'linked-in',
  },
];
