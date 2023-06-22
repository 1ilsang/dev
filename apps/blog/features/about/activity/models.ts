export enum ActivityType {
  award = "Award",
  sideProject = "Side Project",
  conference = "Conference",
  magazine = "Magazine",
  hackathon = "Hackathon",
  club = "Club",
  openSource = "Open Source",
}

export type Activity = {
  name: string;
  type: ActivityType;
  startDate: number;
  endDate?: number;
  description?: string;
  url?: string;
};
