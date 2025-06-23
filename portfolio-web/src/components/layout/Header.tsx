import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

interface HeaderProps {
  profile: {
    name: string;
    title: string;
    photo_url: string;
    github?: string;
    linkedin?: string;
  };
}

export default function Header({ profile }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-white flex items-center justify-center text-center"
    >
      <div className="container mx-auto px-6 py-12">
        <motion.img
          src={profile.photo_url || 'https://i.pravatar.cc/150'}
          alt={profile.name}
          className="w-40 h-40 rounded-full mx-auto mb-6 border-8 border-white shadow-2xl ring-4 ring-indigo-500/50"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <h1 className="text-5xl md:text-7xl font-bold text-slate-800 leading-tight">
          {profile.name}
        </h1>
        <p className="text-2xl mt-3 text-indigo-600 font-light tracking-wide">{profile.title}</p>
        <motion.div
          className="flex justify-center gap-5 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-800 text-white font-semibold py-3 px-6 rounded-full hover:bg-slate-700 transition duration-300 shadow-lg transform hover:scale-105"
          >
            <Github size={20} /> GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-indigo-700 transition duration-300 shadow-lg transform hover:scale-105"
          >
            <Linkedin size={20} /> LinkedIn
          </a>
        </motion.div>
      </div>
    </motion.header>
  );
}