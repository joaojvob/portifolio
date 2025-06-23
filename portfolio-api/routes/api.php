<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\AuthController;

Route::get('/profile', [ProfileController::class, 'show']);
Route::get('/projects', [ProjectController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {  
        return $request->user();
    });

    Route::post('/profile', [ProfileController::class, 'update']);  
    
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::post('/projects/{project}', [ProjectController::class, 'update']); 
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
});