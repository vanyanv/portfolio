import React from 'react';
import Image from 'next/image';

interface MiniTechStackProps {
  techs: string[];
}

const javascriptORTypescript = (tech: string) => {
  if (tech === 'JavaScript') {
    return 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg';
  } else if (tech === 'TypeScript') {
    return 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Typescript.svg';
  } else {
    return `/Icons/${tech}.svg`;
  }
};
export default function MiniTechStack({ techs }: MiniTechStackProps) {
  return (
    <>
      <div className='mx-auto pt-5 grid max-w-lg grid-cols-12 items-center gap-x-1 gap-y-5 sm:max-w-xs xs:grid-cols-12 sm:grid-cols-12 sm:gap-x-1 sm:gap-y-6 lg:mx-0 lg:max-w-5 lg:grid-cols-10'>
        {techs.map((tech: string) => (
          <Image
            key={tech}
            className='col-span-2 max-h-6 w-full object-contain lg:col-span-1'
            src={javascriptORTypescript(tech)}
            alt={tech}
            width={5}
            height={5}
          />
        ))}
      </div>
    </>
  );
}
