<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Technology; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return response()->json($project->load('technologies'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'        => 'required|string|max:255',
            'subtitle'     => 'nullable|string|max:255',
            'description'  => 'required|string',
            'image'        => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',  
            'project_url'  => 'nullable|string',
            'repo_url'     => 'nullable|string',
            'is_tcc'       => 'boolean',
            'technologies' => 'sometimes|string',  
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $data['image_url'] = $path;
        }
        
        $project = Project::create($data);

        if (!empty($data['technologies'])) {
            $techIds   = [];
            $techNames = explode(',', $data['technologies']);

            foreach ($techNames as $techName) {
                if(trim($techName) !== '') {
                    $tech      = Technology::firstOrCreate(['name' => trim($techName)]);
                    $techIds[] = $tech->id;
                }
            }

            $project->technologies()->sync($techIds);
        }

        return response()->json($project->load('technologies'), 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'title'        => 'required|string|max:255',
            'subtitle'     => 'nullable|string|max:255',
            'description'  => 'required|string',
            'image'        => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',  
            'project_url'  => 'nullable|string',
            'repo_url'     => 'nullable|string',
            'is_tcc'       => 'boolean',
            'technologies' => 'sometimes|string',  
        ]);

        if ($request->hasFile('image')) {
            if ($project->image_url) {
                Storage::disk('public')->delete($project->image_url);
            }

            $path = $request->file('image')->store('projects', 'public');
            $data['image_url'] = $path;
        }

        // $projectData = collect($data)->except('technologies')->toArray();
        $project->update($data);
        
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