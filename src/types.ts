import { StaticImageData } from 'next/image';

export type Project = {
  name: string;
  description: string;
  imageUrl: StaticImageData;
  twitterUrl: string;
  linkedinUrl: string;
  react: string;
  electron: string;
};
