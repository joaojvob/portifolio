import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import ProjectForm from '../../components/ProjectForm';
import ProjectList from '../../components/ProjectList';
import ProfileForm from '../../components/ProfileForm';
import { Project } from '../HomePage'; // Importando o tipo do HomePage

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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <nav className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Painel de Administração</h1>
          <a href="/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Ver Site
          </a>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Adicionar/Editar Projetos</h2>
              <ProjectForm onProjectSubmitted={fetchData} />
            </section>
            
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Gerenciar Projetos</h2>
              {loading ? <p>Carregando projetos...</p> : <ProjectList projects={projects} onProjectDeleted={fetchData} />}
            </section>
          </div>
          
          <aside className="lg:col-span-1">
            <section className="bg-white p-6 rounded-lg shadow sticky top-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Editar Perfil</h2>
              <ProfileForm />
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}