// src/pages/CreateProject.tsx
import React, { useState } from 'react';
import api from '../services/api';

const CreateProject: React.FC = () => {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    project_url: '',
    repo_url: '',
    is_tcc: false,
    technologies: [] as string[],
  });

  const [techInput, setTechInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;

    const { name, value, type } = target;

    setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? target.checked : value,
    }));
  };

  const handleAddTech = () => {
    if (techInput.trim() && !form.technologies.includes(techInput.trim())) {
      setForm((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      await api.post('/projects', form);
      setSuccessMsg('Projeto criado com sucesso!');
      setForm({
        title: '',
        subtitle: '',
        description: '',
        image_url: '',
        project_url: '',
        repo_url: '',
        is_tcc: false,
        technologies: [],
      });
    } catch (error: any) {
      setErrorMsg('Erro ao criar projeto. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Adicionar Novo Projeto</h1>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow-md p-6 rounded-xl border">
        <div>
          <label className="block font-medium">Título *</label>
          <input name="title" value={form.title} onChange={handleChange} className="input" required />
        </div>

        <div>
          <label className="block font-medium">Subtítulo</label>
          <input name="subtitle" value={form.subtitle} onChange={handleChange} className="input" />
        </div>

        <div>
          <label className="block font-medium">Descrição *</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="input" required />
        </div>

        <div>
          <label className="block font-medium">URL da Imagem *</label>
          <input name="image_url" value={form.image_url} onChange={handleChange} className="input" required />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Link do Projeto</label>
            <input name="project_url" value={form.project_url} onChange={handleChange} className="input" />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Link do Repositório</label>
            <input name="repo_url" value={form.repo_url} onChange={handleChange} className="input" />
          </div>
        </div>

        <div>
          <label className="block font-medium">Tecnologias</label>
          <div className="flex gap-2">
            <input value={techInput} onChange={(e) => setTechInput(e.target.value)} className="input flex-1" placeholder="Digite e adicione com Enter ou botão" />
            <button type="button" onClick={handleAddTech} className="btn">Adicionar</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.technologies.map((tech) => (
              <span key={tech} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                {tech}
                <button onClick={() => handleRemoveTech(tech)} className="ml-2 text-red-500 font-bold">&times;</button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="inline-flex items-center">
            <input type="checkbox" name="is_tcc" checked={form.is_tcc} onChange={handleChange} />
            <span className="ml-2">Esse projeto é um TCC/artigo científico</span>
          </label>
        </div>

        <div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Projeto'}
          </button>
        </div>

        {successMsg && <p className="text-green-600 font-medium">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 font-medium">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default CreateProject;
