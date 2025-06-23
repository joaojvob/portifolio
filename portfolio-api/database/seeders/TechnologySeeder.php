<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Technology;

class TechnologySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $technologies = [
            'HTML',
            'CSS',
            'JavaScript',
            'TypeScript',
            'PHP',
            'Laravel',
            'Vue.js',
            'React',
            'Next.js',
            'Node.js',
            'Express.js',
            'MySQL',
            'PostgreSQL',
            'MongoDB',
            'Tailwind CSS',
            'Bootstrap',
            'SASS',
            'Git',
            'Docker',
            'Vite',
            'Webpack',
            'Nginx',
        ];

        foreach ($technologies as $name) {
            Technology::firstOrCreate(['name' => $name]);
        }
    }
}