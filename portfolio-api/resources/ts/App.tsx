import { useEffect, useState } from 'react';
import api from './api';

interface Project {
  id: number;
  name: string;
  is_tcc: boolean;
  created_at: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Meu Portfólio</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {project.name} - {project.is_tcc ? 'TCC' : 'Projeto'} - {project.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
