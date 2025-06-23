import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Star } from 'lucide-react';
import { Project } from '../../pages/HomePage';

interface ProjectsProps {
  projects: Project[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectsSection({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-800">Projetos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
                <motion.div
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200/80 flex flex-col group cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                >
                {}
                <div className="overflow-hidden relative">
                    <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{project.title}</h3>
                    {}
                </div>
                </motion.div>
            ))}
</div>
      </div>
    </section>
  );
}