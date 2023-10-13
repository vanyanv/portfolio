import Image from 'next/image';
const stats = [
  { id: 1, name: 'HTML', value: '/Icons/HTML.svg' },
  // { id: 2, name: 'Javascript', value: '$119 trillion' },
  // { id: 2, name: 'HTML', value: '$119 trillion' },
  // { id: 2, name: 'CSS', value: '$119 trillion' },
  // { id: 4, name: 'React', value: '46,000' },
  // { id: 5, name: 'Redux', value: '46,000' },
  // { id: 6, name: 'Node', value: '46,000' },
  // { id: 7, name: 'React', value: '46,000' },
];

export default function TechStack() {
  return (
    <div className=' py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:max-w-none'>
          <div className='text-center'>
            <h2 className='text-xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Tech Stack
            </h2>
          </div>
          <dl className='mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => (
              <div
                key={stat.id}
                className='flex flex-col items-center bg-gray-400/5 p-8'
              >
                <dt className='text-sm font-semibold leading-6 text-gray-600'>
                  {stat.name}
                </dt>
                <Image
                  className='order-first text-3xl font-semibold tracking-tight text-gray-900'
                  src={stat.value}
                  alt={''}
                  width={50}
                  height={50}
                />
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
