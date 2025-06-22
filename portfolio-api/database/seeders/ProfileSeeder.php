<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profile;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Profile::truncate(); 

        Profile::create([
            'name'      => 'João Júlio Veriato Oliveira Benigno',
            'title'     => 'Desenvolvedor Fullstack',
            'bio'       => 'Procuro novas oportunidades como desenvolvedor de software, com foco no design, desenvolvimento e
                            manutenção de sistemas completos e inovadores. Possuo experiência em todas as fases do ciclo de
                            desenvolvimento de software, desde a análise e planeamento até à implementação de soluções de back-
                            end e front-end, gestão de bases de dados, bem como revisão e melhoria contínua de código.
                            Comprometo-me a entregar soluções tecnológicas de alta qualidade que atendam às metas
                            empresariais, melhorem a eficiência operacional e proporcionem uma experiência excepcional aos
                            utilizadores. O meu objetivo é contribuir para o sucesso de empresas e projetos desafiadores, enquanto
                            continuo a aperfeiçoar as minhas competências no setor tecnológico.',
            'photo_url' => '',
            'linkedin'  => 'https://linkedin.com/in/seu-perfil',
            'github'    => 'https://github.com/joaojvob',
            'email'     => 'joaojuliovob@gmail.com',
        ]);
    }
}
