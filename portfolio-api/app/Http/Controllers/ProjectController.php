<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Technology;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::orderBy('is_tcc', 'desc')->orderBy('created_at', 'desc')->get();
        
        return response()->json($projects);
    }
 
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'subtitle'       => 'nullable|string|max:255',
            'description'    => 'required|string',
            'image_url'      => 'required|url',
            'project_url'    => 'nullable|url',
            'repo_url'       => 'nullable|url',
            'is_tcc'         => 'boolean',
            'technologies'   => 'array',  
            'technologies.*' => 'string'
        ]);

        $project = Project::create($validated);

        $technologyIds = [];
        
        if (!empty($validated['technologies'])) {
            foreach ($validated['technologies'] as $techName) {
                $technology      = Technology::firstOrCreate(['name' => $techName]);
                $technologyIds[] = $technology->id;
            }

            $project->technologies()->sync($technologyIds);
        }

        return response()->json($project->load('technologies'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return response()->json($project->load('technologies'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title'          => 'string|max:255',
            'subtitle'       => 'nullable|string|max:255',
            'description'    => 'string',
            'image_url'      => 'url',
            'project_url'    => 'nullable|url',
            'repo_url'       => 'nullable|url',
            'is_tcc'         => 'boolean',
            'technologies'   => 'array',
            'technologies.*' => 'string'
        ]);

        $project->update($validated);

        if (isset($validated['technologies'])) {
            $technologyIds = [];

            foreach ($validated['technologies'] as $techName) {
                $technology      = Technology::firstOrCreate(['name' => $techName]);
                $technologyIds[] = $technology->id;
            }

            $project->technologies()->sync($technologyIds);
        }

        return response()->json($project->load('technologies'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->technologies()->detach();
        $project->delete();

        return response()->json(['message' => 'Projeto deletado com sucesso.']);
    }
}
