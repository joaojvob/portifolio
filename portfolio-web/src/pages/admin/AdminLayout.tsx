import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import ProjectForm from '../../components/ProjectForm';
import ProjectList from '../../components/ProjectList';
import ProfileForm from '../../components/ProfileForm';
import { Project } from '../HomePage';
import { ExternalLink } from 'lucide-react';

export default function AdminLayout() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const projectsRes = await api.get('/projects');
      setProjects(projectsRes.data);
    } catch (error) {
      console.error('Erro ao carregar projetos', error);
      alert('Não foi possível carregar os projetos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-slate-300">
          <h1 className="text-4xl font-bold text-slate-800">Painel de Administração</h1>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105"
          >
            <ExternalLink size={18} />
            Ver Site Público
          </a>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-slate-700">Adicionar Novo Projeto</h2>
              <ProjectForm onProjectSubmitted={fetchData} />
            </section>
            
            <section className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-slate-700">Gerenciar Projetos Existentes</h2>
              {loading ? <p className="text-slate-500">Carregando projetos...</p> : <ProjectList projects={projects} onProjectDeleted={fetchData} />}
            </section>
          </div>
          
          <aside className="lg:col-span-1">
            <section className="bg-white p-8 rounded-xl shadow-md sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-slate-700">Editar Perfil</h2>
              <ProfileForm />
            </section>
          </aside>
        </main>
      </div>
    </div>
  );
}