import React from 'react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function ContactMe() {
  return (
    <div className='bg-white dark:bg-black'>
      <div className='mx-auto max-w-7xl px-6 py-16 lg:px-8'>
        <div className='mx-auto max-w-lg'>
          <div className='mt-12 sm:mt-16 md:mt-0 flex flex-col justify-center items-center'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-300 sm:text-3xl sm:tracking-tight'>
              Lets Connect!
            </h2>
            <div className='mt-3'>
              <h2 className='text-lg text-gray-500 dark:text-gray-200'>
                I would love to chat and connect, get in touch with me!
              </h2>
            </div>
            <div className='mt-9 flex flex-col items-end gap-5 sm:flex-row'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <Image
                    src={'/Icons/Github.svg'}
                    className='h-6 w-6 text-gray-400 dark:text-gray-200 dark:invert'
                    aria-hidden='true'
                    alt='github icon'
                    height={6}
                    width={6}
                  />
                </div>
                <div className='ml-3 text-base text-gray-500 dark:text-gray-200'>
                  <p>https://github.com/vanyanv</p>
                </div>
              </div>
              <div className='mt-6 flex'>
                <div className='flex-shrink-0'>
                  <EnvelopeIcon
                    className='h-6 w-6 text-gray-400 dark:text-gray-200'
                    aria-hidden='true'
                  />
                </div>
                <div className='ml-3 text-base text-gray-500 dark:text-gray-200'>
                  <p>vardan.vanyan@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
