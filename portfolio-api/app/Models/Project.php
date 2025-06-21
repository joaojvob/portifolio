<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'description',
        'image_url',
        'project_url',
        'repo_url',
        'is_tcc',
    ];

    protected $casts = [
        'is_tcc' => 'boolean',
    ];

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }
}
