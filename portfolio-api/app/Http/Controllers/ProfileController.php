<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show()
    {
        return response()->json(Profile::firstOrFail());
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'name'      => 'required|string|max:255',
            'title'     => 'required|string|max:255',
            'bio'       => 'required|string',
            'photo'     => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',  
            'linkedin'  => 'nullable|string',
            'github'    => 'nullable|string',
            'email'     => 'nullable|email',
        ]);

        $profile = Profile::firstOrFail();

        if ($request->hasFile('photo')) {
            if ($profile->photo_url) {
                Storage::disk('public')->delete($profile->photo_url);
            }
            
            $path = $request->file('photo')->store('profile', 'public');
            $data['photo_url'] = $path;
        }

        $profile->update($data);
        return response()->json($profile);
    }
}