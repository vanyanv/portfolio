import Image from 'next/image';
import Reveal from './Reveal';
const techStack = [
  { id: 1, name: 'HTML', value: '/Icons/HTML.svg' },
  { id: 2, name: 'CSS', value: '/Icons/CSS.svg' },
  {
    id: 3,
    name: 'JavaScript',
    value:
      'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
  },
  {
    id: 4,
    name: 'TypeScript',
    value: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Typescript.svg',
  },
  { id: 5, name: 'React', value: '/Icons/React.svg' },
  { id: 6, name: 'Redux', value: '/Icons/Redux.svg' },
  { id: 7, name: 'Tanstack Query', value: '/Icons/Tanstack.svg' },
  { id: 8, name: 'Next.js', value: '/Icons/Nextjs.svg' },
  { id: 9, name: 'Node.js', value: '/Icons/Node.svg' },
  { id: 10, name: 'PostgreSQL', value: '/Icons/Postgres.svg' },
  { id: 11, name: 'MongoDB', value: '/Icons/MongoDB.svg' },
  { id: 12, name: 'Tailwind CSS', value: '/Icons/Tailwindcss.svg' },
  { id: 13, name: 'Material UI', value: '/Icons/MaterialUI.svg' },
  { id: 14, name: 'Jest', value: '/Icons/Jest.svg' },
  { id: 15, name: 'Webpack', value: '/Icons/Webpack.svg' },
  { id: 16, name: 'GraphQL', value: '/Icons/GraphQL.svg' },
];

export default function TechStack() {
  return (
    <div id='technologies' className='py-24 sm:py-32 min-h-screen'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8 '>
        <div className='mx-auto  max-w-2xl lg:max-w-none'>
          <div className='text-center'>
            <h2 className='text-xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {'<Technologies/>'}
            </h2>
          </div>

          <dl className='mt-16 grid grid-cols-2 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4'>
            {techStack.map((tech) => (
              <Reveal key={tech.id}>
                <div
                  key={tech.id}
                  className='flex flex-col items-center bg-gray-400/5 p-8 hover:bg-gray-400/10 transition duration-300 ease-in-out rounded-2xl'
                >
                  <dt className='text-sm font-semibold leading-6 text-gray-600'>
                    {tech.name}
                  </dt>
                  <Image
                    className='order-first text-3xl font-semibold tracking-tight text-gray-900'
                    src={tech.value}
                    alt={tech.name}
                    width={50}
                    height={50}
                  />
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
