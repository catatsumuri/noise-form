<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $slug
 * @property string $title
 * @property string $description
 * @property string $category
 * @property list<string> $body
 * @property string|null $image_path
 * @property string|null $image_alt
 * @property Carbon|null $published_at
 */
class Update extends Model
{
    protected function casts(): array
    {
        return [
            'body' => 'array',
            'published_at' => 'datetime',
        ];
    }

    /** @param Builder<Update> $query */
    public function scopePublished(Builder $query): void
    {
        $query->whereNotNull('published_at')->where('published_at', '<=', now());
    }

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
