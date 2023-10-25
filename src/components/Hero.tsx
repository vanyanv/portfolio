'use client';
import Navbar from './Navbar';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <div className='bg-white h-screen'>
      {/* <Navbar /> */}

      <div className='relative isolate px-6 pt-14 lg:px-8'>
        <div
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3cddef] to-[#322ff0] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
          <Reveal>
            <div className='text-center'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl'>
                Hi, I&rsquo;m Vardan
              </h1>

              <h2 className='text-xl mt-4 font-bold leading-8 text-gray-600'>
                Software Engineer
              </h2>

              <h2 className='mt-8 text-m leading-8 text-gray-600 m:text-xs s:text-xs'>
                I really love making awesome products, especially when it comes
                to Front-end development. I&apos;m a self-taught developer, and
                creating beautiful UIs is my thing.
              </h2>

              <h2 className='mt-0 text-m leading-8 text-gray-600'>
                When I am not coding, I enjoy playing tennis 🎾, cycling 🚴‍♂️, and
                trying new food 🍣.
              </h2>

              <h2 className='mt-0 text-m leading-8 text-gray-600'>
                I am based In Los Angeles📍
              </h2>
            </div>
          </Reveal>
        </div>
        {/* below is for background polygons */}
        <div
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'
        >
          <div
            className='relative right-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#3cddef] to-[#322ff0] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 95.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
