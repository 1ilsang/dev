export type Profile = {
  label: string;
  href: string;
  imageSrc: string;
  imageSrcBlack?: string;
  alt: string;
};

export enum ProfileLabel {
  blog = `1ilsang.dev`,
  github = 'github.com/1ilsang',
  gmail = '1ilsangc@gmail.com',
  linkedin = 'linkedin',
}
