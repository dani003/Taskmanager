<?php

namespace App\Http\Controllers;
use App\Task;

use Illuminate\Http\Request;

class TaskController extends Controller
{

    public function index(Request $request, Task $task)
    {
        // get all the tasks based on current user id
		$allTasks = $task->whereIn('user_id', $request->user())->with('user');
		$tasks = $allTasks->orderBy('created_at', 'desc')->take(20)->get();
		// return json response
		return response()->json([
			'tasks' => $tasks,
		]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //validation
        $this->validate($request, [
            'name' => 'required|max:255',
        ]);
        //create a new task on user task relationship
        $task = $request->user()->tasks()->create([
            'name' => $request->name,
        ]);
        //return task with user object
        return response()->json($task->with('user')->find($task->id));
    }

    

    public function show($id)
    {
        //
    }
    public function edit($id)
    {
        $task = Task::findOrFail($id);
        return response()->json([
            'task' => $task,
        ]);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        $task = Task::findOrFail($id);
        $task->update($input);
        return response()->json($task->with('user')->find($task->id));
    }

    public function destroy($id)
    {
        Task::findOrFail($id)->delete();
    }
}
