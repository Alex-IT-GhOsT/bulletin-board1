<?php


use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckUser;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Category;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'categories' => Category::with('subcategories:id,category_id,name')->get(),
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth',CheckUser::class])->group(function() {
    Route::get('/admin', [MessageController::class, 'index'])->name('admin.dashboard');
    Route::patch('/admin/update', [UserController::class, 'update'])->name('admin.update');
    Route::get('/admin/show/message', [MessageController::class, 'show'])->name('show.message');
    Route::delete('/admin/delete', [MessageController::class, 'destroy'])->name('admin.delete');
    Route::patch('/admin/message/',[MessageController::class, 'update'])->name('admin.message.update');
});

Route::resource('category',CategoryController::class);

Route::resource('message', MessageController::class);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
