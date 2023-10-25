import Image from 'next/image';
import githubIcon from '../../public/Icons/Github.svg';
import chromeIcon from '../../public/Icons/Chrome.svg';
import { Project } from '../types';
import projects from '../data';
import Reveal from './Reveal';
import MiniTechStack from './MiniTechStack';

const projectData: Project[] = projects;

export default function Projects() {
  return (
    <div id='projects' className='bg-white py-2 sm:py-20 min-h-screen'>
      <div className=' mx-auto max-w-7xl px-6 lg:px-8 pb-8 '>
        <div className=' flex justify-center text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            {'<Projects/>'}
          </h2>
        </div>
        <ul
          role='list'
          className='mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-3'
        >
          {projectData.map((project: Project) => (
            <Reveal key={project.name}>
              <li key={project.name}>
                <Image
                  className='aspect-[3/2] w-full rounded-2xl object-fit'
                  src={project.imageUrl.src}
                  alt=''
                  width={project.imageUrl.width}
                  height={project.imageUrl.height}
                />
                <h3 className='mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900'>
                  {project.name}
                </h3>
                <p className='text-base leading-7 text-gray-600'>
                  {project.description}
                </p>
                {/* displays tech stack used in project */}
                <MiniTechStack techs={project.tech}/>
                <ul role='list' className='mt-6 flex gap-x-6'>
                  <li>
                    <a href={project.githubUrl}>
                      <span className='sr-only'>GitHub</span>
                      <Image
                        src={githubIcon}
                        alt={'GitHub Icon'}
                        width={25}
                        height={25}
                      />
                    </a>
                  </li>
                  <li>
                    <a href={project.linkUrl}>
                      <span className='sr-only'>Link</span>
                      <Image
                        className='hover:animate-spin '
                        src={chromeIcon}
                        alt={'website link'}
                        width={25}
                        height={25}
                      />
                    </a>
                  </li>
                </ul>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
