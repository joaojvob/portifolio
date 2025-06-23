<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show()
    {
        return response()->json(Profile::firstOrFail());
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:255',
            'title'      => 'required|string|max:255',
            'bio'        => 'required|string',
            'photo_url'  => 'nullable|',
            'linkedin'   => 'nullable|string|url',
            'github'     => 'nullable|string|url',
            'email'      => 'nullable|email',
        ]);

        $profile = Profile::firstOrFail();
        $profile->update($data);

        return response()->json($profile);
    }
}