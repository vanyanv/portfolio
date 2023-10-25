import { StaticImageData } from 'next/image';

export type Project = {
  name: string;
  description: string;
  imageUrl: StaticImageData;
  githubUrl: string;
  linkUrl: string;
  tech: string[];
};
