import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import TechStack from '@/components/TechStack';
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TechStack />
      <Projects />
      <ScrollToTopButton />
    </>
  );
}
