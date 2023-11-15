import Image from 'next/image';
import Vardan from '/public/Images/Vardan.png';
import Reveal from './Reveal';
export default function AboutMe() {
  return (
    <div className='bg-white dark:bg-black h-screen'>
      <div className='relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14'>
        <div
          className='absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96 dark:bg-black dark:shadow-black dark:ring-black dark:ring-opacity-10'
          aria-hidden='true'
        />
        <div className='mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8'>
            <Reveal>
              <div className='mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1'>
                <p className='text-md leading-8 text-gray-600 dark:text-gray-300'>
                  Hi, I&apos;m Vardan. My world revolves around frontend
                  development, where I wield TypeScript and JavaScript to
                  breathe life into clean and beautiful user interfaces.
                  Witnessing creations come to life is what fuels my passion.
                </p>
                <p className='text-md leading-8 text-gray-600  dark:text-gray-300'>
                  Though my heart lies in the frontend, I&apos;m no stranger to
                  the backend. I&apos;ve delved into the realms of Node/Express
                  and worked with SQL/NoSQL databases to round out my skill set.
                </p>
                <p className='text-md leading-8 text-gray-600  dark:text-gray-300'>
                  My journey in technology began when my mom handed me my first
                  computer. Since then, my enthusiasm for tech has been
                  unwavering. I&apos;ve always been a hands-on explorer, diving
                  into challenges to fix and enhance things. I distinctly recall
                  upgrading my first GPU to handle games like ConquerOnline and
                  RuneScape, which were my gaming staples at the time.
                </p>
                <p className='text-md leading-8 text-gray-600  dark:text-gray-300'>
                  This passion drove me deeper into the world of computers.
                  Building them was just the beginning; I ventured into creating
                  things on the computer using HTML/CSS. Although a chapter of
                  my life led me to pursue a degree in Biology, my love for tech
                  ultimately beckoned me back to the captivating world of
                  software engineering.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <Image
                src={Vardan}
                alt='Creaters Image'
                className='mt-10 aspect-[9/10]  rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-15'
                width={500}
                height={500}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
