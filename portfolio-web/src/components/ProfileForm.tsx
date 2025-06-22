import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  photo_url: string;
  linkedin: string;
  github: string;
  email: string;
}

export default function ProfileForm() {
  const [profile, setProfile] = useState<ProfileData>({
    name: '', title: '', bio: '', photo_url: '', linkedin: '', github: '', email: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get('/profile')
      .then(res => setProfile(res.data))
      .catch(err => console.error("Erro ao carregar perfil", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Salvando...');
    try {
      await api.put('/profile', profile);
      setStatus('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error(err);
      setStatus('Erro ao salvar. Verifique os campos.');
    } finally {
        setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Nome Completo" className="w-full p-2 border rounded-md" required />
        <input type="text" name="title" value={profile.title} onChange={handleChange} placeholder="Seu Título (Ex: Desenvolvedor Fullstack)" className="w-full p-2 border rounded-md" required />
        <textarea name="bio" value={profile.bio} onChange={handleChange} placeholder="Sua Biografia" rows={6} className="w-full p-2 border rounded-md" required />
        <input type="url" name="photo_url" value={profile.photo_url} onChange={handleChange} placeholder="URL da sua Foto" className="w-full p-2 border rounded-md" />
        <input type="url" name="linkedin" value={profile.linkedin} onChange={handleChange} placeholder="URL do LinkedIn" className="w-full p-2 border rounded-md" />
        <input type="url" name="github" value={profile.github} onChange={handleChange} placeholder="URL do GitHub" className="w-full p-2 border rounded-md" />
        <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Seu Email" className="w-full p-2 border rounded-md" required />
        <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition">Salvar Perfil</button>
        {status && <p className="mt-2 text-sm text-center text-gray-600">{status}</p>}
    </form>
  );
}