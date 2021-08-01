<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Collection|Task[]
     */
    public function index(): Collection|array {
        return Task::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request): mixed {
        return Task::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return array
     */
    public function show($id): array {
        return Task::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Task $task
     * @return Response
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request                  $request
     * @param                          $id
     * @return Response|int
     */
    public function update(Request $request, $id): Response|int {
        return Task::findOrFail($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return int
     */
    public function destroy($id): int {
        return Task::destroy($id);
    }
}
