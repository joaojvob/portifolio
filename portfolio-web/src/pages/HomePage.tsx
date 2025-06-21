import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Project } from '../types/Project';

const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tcc, setTcc] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get<Project[]>('/projects');

        // Separa o TCC dos outros projetos
        const tccProject = response.data.find(p => p.is_tcc) || null;
        const otherProjects = response.data.filter(p => !p.is_tcc);

        setTcc(tccProject);
        setProjects(otherProjects);

      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // O array vazio faz com que o useEffect execute apenas uma vez

  if (loading) {
    return <div>Carregando portfólio...</div>;
  }

  return (
    <div>
      <header>
        {/* Seu componente de Header/Sobre Mim aqui */}
        <h1>Meu Nome</h1>
        <p>Desenvolvedor Full-Stack</p>
      </header>

      <main>
        {/* Seção do TCC */}
        {tcc && (
          <section id="tcc">
            <h2>Projeto de Conclusão de Curso</h2>
            {/* Criar um componente ProjectCard para reutilizar */}
            <div key={tcc.id}>
              <h3>{tcc.title}</h3>
              <p>{tcc.description}</p>
            </div>
          </section>
        )}

        {/* Seção dos Outros Projetos */}
        <section id="projects">
          <h2>Meus Projetos</h2>
          {projects.map(project => (
            <div key={project.id}>
               <h3>{project.title}</h3>
               <p>{project.description}</p>
               {/* ...demais informações */}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default HomePage;