<?php

namespace App\Http\Controllers;

use App\Models\UserLeave;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LeaveRequestController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function addleaverequest(Request $request)
    {

        $validate =   Validator::make($request->all(), [
            'reasonforleave' => ['required', 'string', 'max:255'],
            'leavestartdate' => ['required', 'after:today'],
            'leaveenddate' => ['required', 'after:leavestartdate'],
            'leavesubject' => ['required']
        ]);

        if ($validate->fails()) {
            $output = [
                'status' => 422,
                'validation_error' => $validate->errors(),
            ];
            return  response()->json($output);
        }
        $leave = UserLeave::create([
            'EmployeeId' => auth()->id(),
            "Subject" => $request->leavesubject,
            "Reason" => $request->reasonforleave,
            "StartDate" => $request->leavestartdate,
            "EndDate" => $request->leaveenddate,
            "IsAprooved" => 0,
        ]);

        $output = [
            'status' => 200,
            'message' => 'Leave Request Added Successfully',
        ];

        return  response()->json($output);
    }



    public function countallleaves()
    {
        $pending =   UserLeave::where(['IsAprooved' => 0])->count();
        $allleave =   UserLeave::count();
        $Approoved =   UserLeave::where(['IsAprooved' => 1])->count();
        $reject =   UserLeave::where(['IsAprooved' => 2])->count();
        $output = [
            'status' => 200,
            'pending' => $pending,
            'Approoved' => $Approoved,
            'Reject' => $reject,
            'allleave' => $allleave
        ];
        return  response()->json($output);
    }

    public function countleaves()
    {
        $pending =   UserLeave::where(['EmployeeId' => auth()->id(), 'IsAprooved' => 0])->count();
        $allleave =   UserLeave::where(['EmployeeId' => auth()->id()])->count();
        $Approoved =   UserLeave::where(['EmployeeId' => auth()->id(), 'IsAprooved' => 1])->count();
        $reject =   UserLeave::where(['EmployeeId' => auth()->id(), 'IsAprooved' => 2])->count();
        $output = [
            'status' => 200,
            'pending' => $pending,
            'Approoved' => $Approoved,
            'Reject' => $reject,
            'allleave' => $allleave
        ];
        return  response()->json($output);
    }

    public function getuserleave()
    {
        $leaves =   UserLeave::where('EmployeeId', auth()->id())->get();

        if (!count($leaves)) {
            $output = [
                'status' => 422,
                'leave' => "No Data Found",
            ];
            return  response()->json($output);
        }
        $output = [
            'status' => 200,
            'leave' => $leaves,
        ];

        return  response()->json($output);
    }

    public function getspecificleave(Request $request)
    {
        $leaves =   UserLeave::where('id', $request->id)->with('user')->get();

        if (!count($leaves)) {
            $output = [
                'status' => 422,
                'leave' => "No Data Found",
            ];
            return  response()->json($output);
        }
        $output = [
            'status' => 200,
            'leave' => $leaves,
        ];

        return  response()->json($output);
    }

    public function getapproovedleave(Request $request)
    {
        $leaves =   UserLeave::where(['EmployeeId' => auth()->id(), 'IsAprooved' => $request->approove])->get();
        if (!count($leaves)) {
            $output = [
                'status' => 422,
                'leave' => "No Data Found",
            ];
            return  response()->json($output);
        }
        $output = [
            'status' => 200,
            'leave' => $leaves,
        ];

        return  response()->json($output);
    }

    public function getallrequest(Request $request)
    {
        $leaves =   UserLeave::where(['IsAprooved' => $request->approove])->with('user')->get();
        if (!count($leaves)) {
            $output = [
                'status' => 422,
                'leave' => "No Data Found",
            ];
            return  response()->json($output);
        }
        $output = [
            'status' => 200,
            'leave' => $leaves,
        ];

        return  response()->json($output);
    }

    public function deleteleave(Request $request)
    {
        UserLeave::where('id', $request->id)->delete();
        $output = [
            'status' => 200,
            'message' => "Your Leave Has Been Deleted Successfully",
        ];

        return  response()->json($output);
    }

    public function editleave(Request $request)
    {
        $validate =   Validator::make($request->all(), [
            'reasonforleave' => ['required', 'string', 'max:255'],
            'leavestartdate' => ['required'],
            'leaveenddate' => ['required', 'after:leavestartdate'],
            'leavesubject' => ['required']
        ]);

        if ($validate->fails()) {
            $output = [
                'status' => 422,
                'validation_error' => $validate->errors(),
            ];
            return  response()->json($output);
        }

        UserLeave::where('id', $request->id)->update([
            'Subject' => $request->leavesubject,
            'Reason' => $request->reasonforleave,
            'StartDate' => $request->leavestartdate,
            'EndDate' => $request->leaveenddate,
            'IsAprooved' => $request->approoved
        ]);
        $output = [
            'status' => 200,
            'message' => "Leave Request Has Been Updated Successfully",
            'leaveid' => $request->id
        ];
        return  response()->json($output);
    }
}
