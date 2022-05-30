<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class RegisterController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function UpdateUser(Request $request)
    {
        $validate =   Validator::make($request->all(), [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string'],
        ]);

        if ($validate->fails()) {
            $output = [
                'status' => 422,
                'validation_error' => $validate->errors(),
            ];
            return  response()->json($output);
        } else {
            if ($request->hasFile('profile')) {
                $data = User::find(auth()->id());
                Storage::disk('public')->delete('images/' . $data->UserImage);
                $destination_path = 'public/images/';
                $image = $request->file('profile');
                $image_name =  uniqid() . $image->getClientOriginalName();
                $path = $request->file('profile')->storeAs($destination_path, $image_name);
            } else {
                $data = User::find(auth()->id());
                if (Storage::disk('public')->get('images/' . $data->UserImage) !== NULL) {
                    $image_name = $data->UserImage;
                } else {
                    $image_name = 'avatar-car.png';
                }
            }
            User::where('id', auth()->id())->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'UserImage' => $image_name,
            ]);
            $output = [
                'status' => 200,
                'message' => "Profile Updated Successfuly",
            ];
            return  response()->json($output);
        }
    }


    public function UpdatePassword(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'oldpassword' => [
                'required', function ($attribute, $value, $fail) {
                    if (!Hash::check($value, auth()->user()->password)) {
                        $fail('Current Password didn\'t match ');
                    }
                },
            ],
            'newpassword' => ['required', 'min:6', 'same:confirmpassword', 'different:oldpassword'],
            'confirmpassword' => ['required', 'min:6'],
        ]);

        if ($validate->fails()) {
            $output = [
                'status' => 422,
                'validation_error' => $validate->errors(),
            ];
            return  response()->json($output);
        }
        $res = User::where('id', auth()->id())->update([
            'password' => Hash::make($request->newpassword),
        ]);
        if ($res) {
            $output = [
                'status' => 200,
                'message' => "Password Updated Successfully",
            ];
        }
        return  response()->json($output);
    }
}