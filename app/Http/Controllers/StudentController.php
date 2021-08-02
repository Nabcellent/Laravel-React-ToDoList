<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse {
        return response()->json(['status' => 200, 'students' => Student::latest()->get()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse {
        $validation = $this->validateStudent($request);

        if($validation->fails()) {
            return response()->json(['status' => false, 'inputError' => $validation->messages()]);
        }

        Student::create($request->all());

        return response()->json(['status' => true, 'message' => 'Student Created Successfully!']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function edit(int $id): JsonResponse {
        try {
            return response()->json(['status' => 200, 'student' => Student::findOrFail($id)]);
        } catch(Exception) {
            return response()->json(['status' => 404, 'message' => 'Unable to find student']);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int     $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse {
        $validation = $this->validateStudent($request);

        if($validation->fails()) {
            return response()->json(['status' => false, 'inputError' => $validation->messages()]);
        }

        try {
            Student::find($id)->update($request->all());

            return response()->json(['status' => true, 'message' => 'Student updated successfully!']);
        } catch(Exception) {
            return response()->json(['status' => false, 'message' => 'Unable to update student.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse {
        return response()->json(['status' => Student::destroy($id), 'message' => "student deleted!"]);
    }



    public function validateStudent($request): \Illuminate\Contracts\Validation\Validator {
        return Validator::make($request->all(), [
            'name' => 'required',
            'course' => 'required',
            'email' => 'required|email',
            'phone' => 'required|numeric|digits_between:9,10',
        ]);
    }
}
