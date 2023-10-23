import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Projects from '../components/Projects';

test('Displays Projects', () => {
  const projectsData = [
    {
      name: 'MicrObserv',
      description: 'Observability for Microservices',
      imageUrl: {
        src: '/Images/microbserv.png',
        width: 300,
        height: 200,
      },

      twitterUrl: '#',
      linkedinUrl: '#',
      react: '#',
      electron: '#',
    },
  ];
  const projects = render(<Projects />);

  
});
