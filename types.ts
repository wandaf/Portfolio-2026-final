export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  subhead?: string;
  tags: string[];
  imageUrl: string;
  description: string;
  category?: string;
  timeline?: string;
  role?: string;
  tools?: string;
}

export interface PlaygroundItem {
  id: number;
  title: string;
  type: string;
  imageUrl: string;
}

export enum Page {
  WORK = 'work',
  PLAYGROUND = 'playground',
  ABOUT = 'about',
  RESUME = 'resume',
  CASE_STUDY = 'case_study'
}