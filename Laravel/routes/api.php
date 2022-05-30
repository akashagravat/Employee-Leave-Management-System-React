<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\RegisterController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register',  [RegisteredUserController::class, 'store']);

Route::group([
    'middleware' => ['user.employee', 'api'],
], function ($router) {
    Route::post('/getleave/{approove}', [LeaveRequestController::class, 'getapproovedleave']);
    Route::post('getuserleave', [LeaveRequestController::class, 'getuserleave']);
    Route::post('addleaaverequest', [LeaveRequestController::class, 'addleaverequest']);
});

Route::group([
    'middleware' => ['user.admin', 'api'],
], function ($router) {
    Route::post('getallrequest/{approove}', [LeaveRequestController::class, 'getallrequest']);
});

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::post('login',  [AuthController::class, 'login']);
    Route::post('logout',  [AuthController::class, 'logout']);
    Route::post('refresh',  [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::post('/leaverequest/show/{id}', [LeaveRequestController::class, 'getspecificleave']);
    Route::post('countleave', [LeaveRequestController::class, 'countleaves']);
    Route::post('/leave/delete/{id}', [LeaveRequestController::class, 'deleteleave']);
    Route::post('leave/edit/{id}', [LeaveRequestController::class, 'editleave']);
    Route::post('updateuser', [RegisterController::class, 'updateuser']);
    Route::post('countallleaves', [LeaveRequestController::class, 'countallleaves']);
    Route::post('updatepassword', [RegisterController::class, 'UpdatePassword']);
});