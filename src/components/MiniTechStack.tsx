import React from 'react';
import Image from 'next/image';

interface MiniTechStackProps {
  techs: string[];
}

export default function MiniTechStack({ techs }: MiniTechStackProps) {
  return (
    <>
      <div className='mx-auto pt-5 grid max-w-lg grid-cols-12 items-center gap-x-1 gap-y-5 sm:max-w-xs xs:grid-cols-12 sm:grid-cols-12 sm:gap-x-1 sm:gap-y-6 lg:mx-0 lg:max-w-5 lg:grid-cols-10'>
        {techs.map((tech: string) => (
          <Image
            key={tech}
            className='col-span-2 max-h-6 w-full object-contain lg:col-span-1'
            src={`/Icons/${tech}.svg`}
            alt={tech}
            width={5}
            height={5}
          />
        ))}
      </div>
    </>
  );
}
