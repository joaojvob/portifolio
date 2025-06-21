<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle');
            $table->text('description');
            $table->string('image_url'); // URL da imagem do projeto
            $table->string('project_url')->nullable(); // Link para o projeto online
            $table->string('repo_url')->nullable(); // Link para o repositório
            $table->json('technologies'); // Lista de tecnologias usadas
            $table->boolean('is_tcc')->default(false); // Para identificar o TCC
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
