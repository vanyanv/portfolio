import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TechStack />
      <Projects />
    </>
  );
}
