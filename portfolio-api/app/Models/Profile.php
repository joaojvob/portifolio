<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name',
        'title',
        'bio',
        'photo_url',
        'linkedin',
        'github',
        'email',
    ];
    public $timestamps = false;
}