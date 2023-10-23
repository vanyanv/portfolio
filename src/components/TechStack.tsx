import Image from 'next/image';
const stats = [
  { id: 1, name: 'HTML', value: `/Icons/HTML.svg` },
  { id: 2, name: 'CSS', value: '/Icons/CSS.svg' },
  {
    id: 3,
    name: 'Javascript',
    value:
      'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
  },
  {
    id: 4,
    name: 'Typescript',
    value: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Typescript.svg',
  },
  { id: 4, name: 'React', value: '/Icons/React.svg' },
  { id: 5, name: 'Redux', value: '/Icons/Redux.svg' },
  { id: 6, name: 'Nextjs', value: '/Icons/Nextjs.svg' },
  { id: 7, name: 'Node', value: '/Icons/Node.svg' },
  { id: 8, name: 'Postgres', value: '/Icons/Postgres.svg' },
  { id: 9, name: 'MongoDB', value: '/Icons/MongoDB.svg' },
  { id: 10, name: 'TailwindCss', value: '/Icons/Tailwindcss.svg' },
  { id: 11, name: 'Jest', value: '/Icons/Jest.svg' },
];

export default function TechStack() {
  return (
    <div id='technologies' className='py-24 sm:py-32 h-screen'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8 '>
        <div className='mx-auto max-w-2xl lg:max-w-none'>
          <div className='text-center'>
            <h2 className='text-xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {'<Technologies/>'}
            </h2>
          </div>
          <dl className='mt-16 grid grid-cols-2 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => (
              <div
                key={stat.id}
                className='flex flex-col items-center bg-gray-400/5 p-8 hover:bg-gray-400/10 transition duration-300 ease-in-out rounded-2xl'
              >
                <dt className='text-sm font-semibold leading-6 text-gray-600'>
                  {stat.name}
                </dt>
                <Image
                  className='order-first text-3xl font-semibold tracking-tight text-gray-900'
                  src={stat.value}
                  alt={stat.name}
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
