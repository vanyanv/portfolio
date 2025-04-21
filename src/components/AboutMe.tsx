import Image from 'next/image';
import Vardan from '/public/Images/Vardan.png';
import Reveal from './Reveal';
import HomeButton from './HomeButton';
export default function AboutMe() {
  return (
    <div className='bg-white dark:bg-black h-screen'>
      <div className='relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14 dark:bg-black'>
        <div
          className='absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96 dark:bg-black dark:shadow-black dark:ring-black dark:ring-opacity-10'
          aria-hidden='true'
        />
        <div className='mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8'>
            <div className='mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1'>
              <Reveal>
                <p className='text-md leading-8 text-gray-600 dark:text-gray-300'>
                  My journey into software engineering wasn't exactly a straight
                  line. While I'm now fully immersed in the world of TypeScript
                  and React, creating clean and intuitive interfaces that users
                  love, my path started elsewhere.
                </p>
              </Reveal>
              <br></br>
              <Reveal>
                <p className='text-md leading-8 text-gray-600  dark:text-gray-300'>
                  It all began when my mom handed me my first computer as a kid.
                  I was instantly captivated. Instead of just using it, I wanted
                  to understand how it worked. I spent countless nights
                  tinkering with software, learning the ins and outs of
                  operating systems, and navigating the shadowy corners of the
                  internet to find free games. The thrill of discovering how to
                  modify game files or finding workarounds for software
                  limitations taught me as much about problem-solving as the
                  hardware upgrades I'd tackle on weekends. I still remember the
                  sense of accomplishment after successfully installing my first
                  GPU upgrade — a small victory that felt monumental at the
                  time.
                </p>
              </Reveal>
              <br></br>
              <Reveal>
                <p className='text-md leading-8 text-gray-600  dark:text-gray-300'>
                  That curiosity never faded. I went from hardware tinkering to
                  crafting websites with HTML and CSS, watching code transform
                  into something functional before my eyes. Though I took a
                  detour through a Biology degree, technology pulled me back to
                  where I belonged. Today, I build seamless experiences with
                  Next.js and TypeScript while being equally comfortable with
                  backend technologies. As a lifelong learner, software
                  engineering perfectly aligns with my passion for continuous
                  growth. It's both my profession and hobby, challenging me to
                  learn something new every day.
                </p>
              </Reveal>
            </div>
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
      <HomeButton />
    </div>
  );
}
