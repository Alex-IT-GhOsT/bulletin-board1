<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create(['name' => 'Автомобили']);
        Category::create(['name' => 'Недвижимость']);
        Category::create(['name' => 'Электроника']);
        Category::create(['name' => 'Работа']);
        Category::create(['name' => 'Услуги']);
    }
}
