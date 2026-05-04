import { OS } from '@/components/os/OS';
import { AboutWindowContent } from '@/components/os/windows/AboutWindow';
import { ContactWindowContent } from '@/components/os/windows/ContactWindow';
import { ProjectsWindowContent } from '@/components/os/windows/ProjectsWindow';
import { ReadmeWindowContent } from '@/components/os/windows/ReadmeWindow';
import { ResumeWindowContent } from '@/components/os/windows/ResumeWindow';
import { TechWindowContent } from '@/components/os/windows/TechWindow';

export default function Home() {
  return (
    <OS
      contents={{
        readme: <ReadmeWindowContent />,
        about: <AboutWindowContent />,
        projects: <ProjectsWindowContent />,
        tech: <TechWindowContent />,
        resume: <ResumeWindowContent />,
        contact: <ContactWindowContent />,
      }}
    />
  );
}
