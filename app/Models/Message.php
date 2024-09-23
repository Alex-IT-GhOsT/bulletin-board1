<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'sub_category_id',
        'text'
    ];

    public function subcategory():BelongsTo
    {
        return $this->belongsTo(SubCategory::class, 'sub_category_id', 'id');
    }

    public function category():BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
