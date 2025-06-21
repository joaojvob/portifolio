<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show()
    {
        $profile = ProfileController::first();

        return response()->json($profile);
    }
}
