export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  project_url?: string;
  repo_url?: string;
  technologies: string[];
  is_tcc: boolean;
}