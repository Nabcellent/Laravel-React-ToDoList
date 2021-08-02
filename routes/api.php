<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/tasks')->name('tasks.')->group(function() {
    Route::get('/', [TaskController::class, 'index'])->name('index');
    Route::get('/show/{id}', [TaskController::class, 'show'])->name('show');
    Route::post('/create', [TaskController::class, 'store'])->name('store');
    Route::put('/update/{id}', [TaskController::class, 'update'])->name('update');
    Route::delete('/remove/{id}', [TaskController::class, 'destroy'])->name('destroy');
});

Route::prefix('/students')->group(function() {
    Route::get('/', [StudentController::class, 'index']);
    Route::post('/create', [StudentController::class, 'store']);
    Route::get('/edit/{id}', [StudentController::class, 'edit']);
    Route::put('/update/{id}', [StudentController::class, 'update']);
    Route::delete('/delete/{id}', [StudentController::class, 'destroy']);
});
