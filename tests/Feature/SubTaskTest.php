<?php

namespace Tests\Feature;

use App\Models\SubTask;
use App\Models\Todo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SubTaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_todo_can_have_a_subtask(): void
    {
        $todo = Todo::factory()->create();
        $response = $this->post(route('subtask.store',['type'=>'todo', 'type_id' => $todo->id]), [
            'body' => 'My First SubTask',
            'is_task' => false
        ]);
        
        $response->assertStatus(201);

        tap(SubTask::first(), function($subtask) use($todo){
            $this->assertEquals('My First SubTask', $subtask->body);
            $this->assertFalse($subtask->is_task);
            $this->assertEquals($todo->id, $subtask->taskable_id);
        });
    }

    public function test_subtask_can_have_a_subtask(): void
    {
        $todo = Todo::factory()->create();
        $todo->subTasks()->create(SubTask::factory()->make()->toArray());

        $response = $this->post(route('subtask.store', [
                'type'=>'subtask','type_id' =>$todo->subTasks()->first()->id
            ]), [
                'body' => 'My First SubTask subtask',
                'is_task' => false
            ]
        );

        $response->assertStatus(201);

        tap(SubTask::first()->subTasks()->first(), function($subtask) use ($todo){
            $this->assertEquals('My First SubTask subtask', $subtask->body);
            $this->assertFalse($subtask->is_task);
        }); 
    }
}