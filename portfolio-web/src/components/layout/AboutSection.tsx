import React from 'react';
import { motion } from 'framer-motion';

interface AboutProps {
  bio: string;
}

export default function AboutSection({ bio }: AboutProps) {
  return (
    <motion.section
      id="about"
      className="py-24 bg-slate-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">Sobre Mim</h2>
        <p className="text-lg text-slate-600 whitespace-pre-line leading-relaxed text-justify">
          {bio}
        </p>
      </div>
    </motion.section>
  );
}