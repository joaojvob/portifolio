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
        $projects = Project::with('technologies')->orderBy('created_at', 'desc')->get();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'          => 'required|string|max:255',
            'subtitle'       => 'nullable|string|max:255',
            'description'    => 'required|string',
            'image_url'      => 'required|string',
            'project_url'    => 'nullable|string',
            'repo_url'       => 'nullable|string',
            'is_tcc'         => 'boolean',
            'technologies'   => 'sometimes|array',
            'technologies.*' => 'string|max:50',  
        ]);

        $projectData = collect($data)->except('technologies')->toArray();
        $project     = Project::create($projectData);

        if (!empty($data['technologies'])) {
            $techIds = [];

            foreach ($data['technologies'] as $techName) {
                $technology = Technology::firstOrCreate(['name' => trim($techName)]);
                $techIds[]  = $technology->id;
            }

            $project->technologies()->sync($techIds);
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
        $data = $request->validate([
            'title'          => 'required|string|max:255',
            'subtitle'       => 'nullable|string|max:255',
            'description'    => 'required|string',
            'image_url'      => 'required|string',
            'project_url'    => 'nullable|string',
            'repo_url'       => 'nullable|string',
            'is_tcc'         => 'boolean',
            'technologies'   => 'sometimes|array',
            'technologies.*' => 'string|max:50',
        ]);

        $projectData = collect($data)->except('technologies')->toArray();
        $project->update($projectData);

        if (isset($data['technologies'])) {
            $techIds = [];

            foreach ($data['technologies'] as $techName) {
                $technology = Technology::firstOrCreate(['name' => trim($techName)]);
                $techIds[]  = $technology->id;
            }
            
            $project->technologies()->sync($techIds);
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

        return response()->json(null, 204);
    }
}