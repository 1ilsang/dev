export enum ActivityType {
  award = 'Award',
  seminar = 'Seminar',
  conference = 'Conference',
  magazine = 'Magazine',
  hackathon = 'Hackathon',
  club = 'Club',
  openSource = 'Open Source',
  sns = 'SNS',
}

export type Activity = {
  name: string;
  type: ActivityType;
  startDate: number;
  endDate?: number;
  description?: string;
  url?: string;
};
