import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const sectionVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after loading screen
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <LoadingScreen />
      
      <AnimatePresence>
        {showContent && (
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
          >
            <Navbar />
            <main>
              <motion.div variants={sectionVariants}>
                <HeroSection />
              </motion.div>
              <motion.div variants={sectionVariants}>
                <AboutSection />
              </motion.div>
              <motion.div variants={sectionVariants}>
                <SkillsSection />
              </motion.div>
              <motion.div variants={sectionVariants}>
                <ProjectsSection />
              </motion.div>
              <motion.div variants={sectionVariants}>
                <FAQSection />
              </motion.div>
              <motion.div variants={sectionVariants}>
                <ContactSection />
              </motion.div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
