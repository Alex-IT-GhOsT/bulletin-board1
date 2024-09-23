<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sub_categories')->insert([
            [
                'category_id' => 1,
                'name' => 'Легковые автомобили'
            ],
            [
                'category_id' => 1,
                'name' => 'Грузовики'
            ],
            [
                'category_id' => 1,
                'name' => 'Мотоциклы'
            ],
            [
                'category_id' => 1,
                'name' => 'Автозапчасти и аксессуары'
            ],
            [
                'category_id' => 1,
                'name' => 'Услуги по ремонту автомобилей'
            ],
            [
                'category_id' => 2,
                'name' => 'Квартиры'
            ],
            [
                'category_id' => 2,
                'name' => 'Дома и коттеджи'
            ],
            [
                'category_id' => 2,
                'name' => 'Коммерческая недвижимость'
            ],
            [
                'category_id' => 2,
                'name' => 'Земельные участки'
            ],
            [
                'category_id' => 2,
                'name' => 'Съем жилья'
            ],
            [
                'category_id' => 3,
                'name' => 'Смартфоны'
            ],
            [
                'category_id' => 3,
                'name' => 'Ноутбуки и ПК'
            ],
            [
                'category_id' => 3,
                'name' => 'Телевизоры и аудио техника'
            ],
            [
                'category_id' => 3,
                'name' => 'Фотоаппараты и видеокамеры'
            ],
            [
                'category_id' => 3,
                'name' => 'Гаджеты и аксессуары'
            ],
            [
                'category_id' => 4,
                'name' => 'Полная занятость'
            ],
            [
                'category_id' => 4,
                'name' => 'Частичная занятость'
            ],
            [
                'category_id' => 4,
                'name' => 'Стажировки'
            ],
            [
                'category_id' => 4,
                'name' => 'Фриланс'
            ],
            [
                'category_id' => 4,
                'name' => 'Услуги и консультации'
            ],
            [
                'category_id' => 5,
                'name' => 'Ремонт и строительство'
            ],
            [
                'category_id' => 5,
                'name' => 'Консультирование и обучение'
            ],
            [
                'category_id' => 5,
                'name' => 'Услуги по уборке'
            ],
            [
                'category_id' => 5,
                'name' => 'Доставка и транспорт'
            ],
            [
                'category_id' => 5,
                'name' => 'Ремонт бытовой техники'
            ],
        ]);
    }
}
