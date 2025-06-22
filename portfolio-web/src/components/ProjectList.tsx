import React from 'react';
import api from '../services/api';
import { Project } from '../pages/HomePage';

interface ProjectListProps {
  projects: Project[];
  onProjectDeleted: () => void;
}

export default function ProjectList({ projects, onProjectDeleted }: ProjectListProps) {
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.')) {
      try {
        await api.delete(`/projects/${id}`);
        alert('Projeto excluído com sucesso!');
        onProjectDeleted();
      } catch (err) {
        console.error('Erro ao excluir projeto', err);
        alert('Não foi possível excluir o projeto.');
      }
    }
  };

  if (!projects.length) {
    return <p className="text-gray-500 text-center py-4">Nenhum projeto cadastrado ainda.</p>;
  }

  return (
    <div className="space-y-3">
      {projects.map(project => (
        <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
          <div>
            <h3 className="font-bold text-lg text-gray-800">{project.title}</h3>
            <p className="text-sm text-gray-500">{project.subtitle}</p>
          </div>
          <div className="flex gap-4">
            {/* <button className="text-sm text-blue-600 hover:underline">Editar</button> */}
            <button onClick={() => handleDelete(project.id)} className="text-sm font-semibold text-red-600 hover:underline">
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}