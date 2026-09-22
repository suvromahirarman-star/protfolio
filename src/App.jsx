import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ScrollToTop } from './components/ScrollToTop';
import { Toast } from './components/Toast';
import { AdminModal } from './components/admin/AdminModal';

import { Hero } from './sections/Hero';
import { TrustStats } from './sections/TrustStats';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Services } from './sections/Services';
import { Projects } from './sections/Projects';
import { Process } from './sections/Process';
import { WhyMe } from './sections/WhyMe';
import { FreelanceJourney } from './sections/FreelanceJourney';
import { FreelancingCTA } from './sections/FreelancingCTA';
import { Contact } from './sections/Contact';

function PortfolioApp() {
  const { isAdminOpen, setIsAdminOpen } = usePortfolio();
  const [activeSection, setActiveSection] = useState('home');
  const [modalProject, setModalProject] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Scroll spy to highlight active section in Navbar
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'services', 'projects', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut (Ctrl + Shift + A) to open Admin Customizer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsAdminOpen]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'success' });
    }, 4000);
  };

  const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
  };

  return (
    <div className="relative min-h-screen bg-dark-950 text-slate-100 flex flex-col justify-between selection:bg-electric-500/30 selection:text-electric-300">
      {/* Sticky Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero />
        <TrustStats />
        <About />
        <Skills />
        <Services onSelectService={handleSelectService} />
        <Projects onOpenModal={setModalProject} />
        <Process />
        <WhyMe />
        <FreelanceJourney />
        <FreelancingCTA />
        <Contact selectedService={selectedService} onShowToast={showToast} />
      </main>

      {/* Footer with discrete Admin Mode trigger */}
      <Footer />

      {/* Project Detail Modal */}
      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}

      {/* Owner Customization Admin Modal (PIN Protected) */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onShowToast={showToast}
      />

      {/* Floating Scroll to Top */}
      <ScrollToTop />

      {/* Floating Toast Alerts */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'success' })}
        />
      )}
    </div>
  );
}

export function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}

export default App;
