import React, { useState } from 'react';
import api from '../services/api';

interface ProjectFormProps {
  onProjectSubmitted: () => void;
}

const initialFormState = {
  title: '',
  subtitle: '',
  description: '',
  image_url: '',
  project_url: '',
  repo_url: '',
  is_tcc: false,
  technologies: '',
};

export default function ProjectForm({ onProjectSubmitted }: ProjectFormProps) {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox' && 'checked' in e.target;
    const newValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;
    setForm(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Salvando projeto...');
    try {
      const techArray = form.technologies.split(',').map(t => t.trim()).filter(Boolean);
      await api.post('/projects', { ...form, technologies: techArray });
      setStatus('Projeto criado com sucesso!');
      setForm(initialFormState);
      onProjectSubmitted();
    } catch (err) {
      console.error(err);
      setStatus('Erro ao criar projeto.');
    } finally {
        setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Título do Projeto" className="w-full p-2 border rounded-md" required />
      <input type="text" name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Subtítulo (opcional)" className="w-full p-2 border rounded-md" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" rows={4} className="w-full p-2 border rounded-md" required />
      <input type="url" name="image_url" value={form.image_url} onChange={handleChange} placeholder="URL da Imagem do Projeto" className="w-full p-2 border rounded-md" required />
      <input type="url" name="project_url" value={form.project_url} onChange={handleChange} placeholder="URL do Projeto Online (opcional)" className="w-full p-2 border rounded-md" />
      <input type="url" name="repo_url" value={form.repo_url} onChange={handleChange} placeholder="URL do Repositório (opcional)" className="w-full p-2 border rounded-md" />
      <input type="text" name="technologies" value={form.technologies} onChange={handleChange} placeholder="Tecnologias (separadas por vírgula: React, Laravel, etc)" className="w-full p-2 border rounded-md" />
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" name="is_tcc" checked={form.is_tcc} onChange={handleChange} className="h-4 w-4 rounded" />
        Este projeto é um TCC?
      </label>
      <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 transition">Criar Novo Projeto</button>
      {status && <p className="mt-2 text-sm text-center text-gray-600">{status}</p>}
    </form>
  );
}