import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useKonamiCode } from '../hooks/useKonamiCode';

// Components
import Header from '../components/layout/Header';
import AboutSection from '../components/layout/AboutSection';
import ProjectsSection from '../components/layout/ProjectsSection';
import ContactSection from '../components/layout/ContactSection';
import Navbar from '../components/layout/Navbar';  

// Interfaces
export interface Profile {
  name: string;
  title: string;
  bio: string;
  photo_url: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image_url: string;
  project_url?: string;
  repo_url?: string;
  is_tcc: boolean;
  technologies: { id: number; name: string }[];
}

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useKonamiCode(() => navigate('/admin'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          api.get('/api/profile'),
          api.get('/api/projects'),
        ]);
        
        setProfile(profileRes.data);
        setProjects(projectsRes.data);
      } catch (error) {
        console.error('Erro ao carregar dados', error);
      }
    };
    fetchData();
  }, []);

  if (!profile) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-900 text-white">
        <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg text-slate-400 mt-4 tracking-widest animate-pulse">CARREGANDO...</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-800 font-sans antialiased">
      <Navbar /> {}
      <Header profile={profile} />
      <main>
        <AboutSection bio={profile.bio} />
        <ProjectsSection projects={projects} />
      </main>
      <ContactSection email={profile.email} />
    </div>
  );
}