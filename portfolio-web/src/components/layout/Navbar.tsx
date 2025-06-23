import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg shadow-sm"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-6 py-4 flex justify-center items-center">
            <div className="flex space-x-8 font-semibold text-slate-600">
              <a href="#about" className="hover:text-indigo-600 transition-colors">Sobre</a>
              <a href="#projects" className="hover:text-indigo-600 transition-colors">Projetos</a>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}