import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import AiGuide from './components/AiGuide';
import Footer from './components/Footer';
import BootScreen from './components/BootScreen';
import NeuralBackground from './components/NeuralBackground';
import Pipeline from './components/Pipeline';
import GithubDashboard from './components/GithubDashboard';
import ScrollSystem from './components/ScrollSystem';
import { fetchProjects, fetchSkills, fetchExperiences } from './services/api';

const HERO_RESUME_HREF = '/api/resume';

/**
 * Main Application Component
 * ===========================
 * Root component that orchestrates all sections and manages global data fetching.
 */
function App() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all portfolio data on mount
  const loadData = useCallback(async () => {
    try {
      const [projectsRes, skillsRes, experiencesRes] = await Promise.allSettled([
        fetchProjects(),
        fetchSkills(),
        fetchExperiences(),
      ]);

      if (projectsRes.status === 'fulfilled') setProjects(projectsRes.value.data);
      if (skillsRes.status === 'fulfilled') setSkills(skillsRes.value.data);
      if (experiencesRes.status === 'fulfilled') setExperiences(experiencesRes.value.data);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="app-shell min-h-screen selection:bg-cyan-400/30">
      <BootScreen />
      <NeuralBackground />
      <ScrollSystem />
      <Navbar />
      <main>
        <Hero resumeHref={HERO_RESUME_HREF} />
        <About />
        <Pipeline />
        <Skills skills={skills} loading={loading} />
        <Projects projects={projects} loading={loading} />
        <Experience experiences={experiences} loading={loading} />
        <GithubDashboard />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <AiGuide />
    </div>
  );
}

export default App;