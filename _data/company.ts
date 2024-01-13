import { Company, CompanyName, ProjectName } from '~/about/work/models';

const LINE: Company = {
  company: CompanyName.LINE,
  companyHref: 'https://www.linkedin.com/company/line-messenger/',
  companyLogoUrl:
    'https://github.com/1ilsang/dev/assets/23524849/815bfc87-2cec-43b1-b8c3-edb9db91b3b9',
  workStartDate: 1596985200000,
  projectList: [
    {
      name: ProjectName.UVP,
      tags: [
        'HTMLVideo',
        'Preact10',
        'Zustand',
        'Turborepo',
        'Storybook',
        'Cypress',
        'Webpack',
      ],
      startDate: 1604156400000,
    },
    {
      name: ProjectName.OAL,
      tags: [
        'React18',
        'React-Testing-Library',
        'React-Query',
        'WebSocket',
        'MSW',
        'Chart.js',
      ],
      url: 'https://oa-live.line.biz/',
      startDate: 1659279600000,
    },
    {
      name: ProjectName.VLC,
      tags: ['React18', 'React-Testing-Library', 'React-Query'],
      url: 'https://oa-live.line.biz/',
      startDate: 1686495600000,
    },
    {
      name: ProjectName.LDS_CALENDAR,
      tags: ['React18', 'vite'],
      startDate: 1680274800000,
    },

    {
      name: ProjectName.PLACE,
      tags: ['Next12', 'Redux', 'Redux-Saga', 'Swiper'],
      url: 'https://www.youtube.com/watch?v=-hmsdx_qoiA',
      startDate: 1601478000000,
      endDate: 1617980400000,
    },
    {
      name: ProjectName.OAP,
      tags: ['Next12'],
      url: 'https://creative.line.me/blog/91',
      startDate: 1597071600000,
      endDate: 1625929200000,
    },
  ],
};

const BLIND: Company = {
  company: CompanyName.Blind,
  companyHref: 'https://www.linkedin.com/company/teamblind/',
  companyLogoUrl:
    'https://github.com/1ilsang/dev/assets/23524849/abdc15c8-571c-430c-a3c3-f2473aedd201',
  position: 'Node.js Server Developer',
  workStartDate: 1564930800000,
  workEndDate: 1596726000000,
  projectList: [
    {
      name: ProjectName.Bleet,
      tags: ['Node.js', 'MySQL', 'Swagger', 'Firebase'],
      url: 'https://www.teambleet.com',
      startDate: 1588258800000,
      endDate: 1596726000000,
    },
    {
      name: ProjectName.MyBiskit,
      tags: ['Nuxt2', 'MySQL'],
      startDate: 1572534000000,
      endDate: 1588172400000,
    },
    {
      name: ProjectName.Blind,
      tags: ['Node.js', 'PHP', 'Docker', 'MySQL', 'Redis'],
      startDate: 1564930800000,
      endDate: 1577631600000,
      url: 'https://www.teamblind.com/',
    },
  ],
};

const SmileGate: Company = {
  company: CompanyName.Smilegate,
  companyHref: 'https://www.linkedin.com/company/smilegate/',
  companyLogoUrl:
    'https://github.com/1ilsang/dev/assets/23524849/932fade0-e7bf-4fdc-b7a8-c346fedbb76d',
  workStartDate: 1520780400000,
  workEndDate: 1525791600000,
  position: 'Frontend Developer(intern)',
  projectList: [
    {
      name: ProjectName.Stove,
      tags: ['Vue2'],
      startDate: 1520780400000,
      endDate: 1525791600000,
    },
  ],
};

export const companyData: Company[] = [
  { ...LINE },
  { ...BLIND },
  { ...SmileGate },
];
