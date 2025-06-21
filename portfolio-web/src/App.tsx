import React, { useEffect, useState } from 'react';
import './App.css';

import api from './services/api';

interface Project {
  id: number;
  title: string;
  description: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      
      console.log('Dados recebidos da API:', response.data); 

      setProjects(response.data);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  };

  fetchProjects();
}, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meu Portfólio</h1>
        <h2>Projetos Carregados da API:</h2>
        <div style={{ textAlign: 'left', marginTop: '20px' }}>
          {projects.length > 0 ? (
            <ul>
              {projects.map(project => (
                <li key={project.id}>
                  <strong>{project.title}</strong>: {project.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum projeto encontrado ou a API não está rodando...</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;