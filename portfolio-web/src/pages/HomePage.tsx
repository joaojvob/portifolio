import React, { useEffect, useState } from 'react';
import api from '../services/api';

// Interfaces de dados
interface Profile {
    name:      string;
    title:     string;
    bio:       string;
    photo_url: string;
    linkedin?: string;
    github?:   string;
    email?:    string;
}

interface Project {
    id:           number;
    title:        string;
    subtitle?:    string;
    description:  string;
    image_url:    string;
    project_url?: string;
    repo_url?:    string;
    is_tcc:       boolean;
    technologies: { id: number; name: string }[];
}

export default function HomePage() {

    debugger

    const [profile, setProfile] = useState<Profile | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        debugger

        try {
            const [profileRes, projectsRes] = await Promise.all([
              api.get('/profile'),
              api.get('/projects'),
            ]);

            setProfile(profileRes.data);
            setProjects(projectsRes.data);
        } catch (error) {
            debugger
            console.error('Erro ao carregar dados', error);
        }
      };
      fetchData();
    }, []);

    if (!profile) {
      return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <p className="text-xl text-gray-600 animate-pulse">Carregando Portfólio...</p>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 text-gray-800 font-sans">
        <header className="min-h-screen bg-white flex items-center">
          <div className="container mx-auto px-6 py-12 text-center">
            <img
              src={profile.photo_url || 'https://i.pravatar.cc/150?u=a042581f4e29026704d'}
              alt={profile.name}
              className="w-40 h-40 rounded-full mx-auto mb-6 border-8 border-white shadow-xl ring-2 ring-blue-500"
            />
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              {profile.name}
            </h1>
            <p className="text-2xl mt-2 text-blue-600 font-light">{profile.title}</p>
            <div className="flex justify-center gap-6 mt-8">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition duration-300 shadow-lg">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300 shadow-lg">
                LinkedIn
              </a>
            </div>
          </div>
        </header>

        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-4xl font-bold text-center mb-10">Sobre Mim</h2>
            <p className="text-lg text-gray-700 whitespace-pre-line leading-relaxed text-justify">
              {profile.bio}
            </p>
          </div>
        </section>

        <section id="projects" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Meus Projetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map(project => (
                <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300 border">
                  <img src={project.image_url} alt={project.title} className="w-full h-56 object-cover"/>
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                    <p className="text-gray-600 italic mb-3">{project.subtitle}</p>
                    <p className="text-gray-700 mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map(tech => (
                        <span key={tech.id} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {tech.name}
                        </span>
                      ))}
                    </div>
                     <div className="mt-auto pt-4 border-t flex items-center justify-between font-semibold">
                        <div className="flex gap-4">
                          {project.repo_url && <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-600">Repositório</a>}
                          {project.project_url && <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-500">Ver Online</a>}
                        </div>
                        {project.is_tcc && <span className="text-xs bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full font-semibold">TCC</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-gray-800 text-white py-10">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Vamos conversar?</h2>
              <p className="mb-6">Estou aberto a novas oportunidades e colaborações.</p>
              <a href={`mailto:${profile.email}`} className="text-xl text-blue-400 hover:underline">
                  {profile.email}
              </a>
          </div>
        </footer>
      </div>
    );
}   

export type { Project };