<?php

namespace Tests\Feature;

use App\Models\Todo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SubTaskTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test basic feature test example.
     */
    public function test_subtask_can_be_created(): void
    {
        $todo = Todo::factory()->create();

        $response = $this->post(route('subtask.store',['todo'=>$todo->id], [
            'body' => 'My first subtask',
            'is_task' => false 
        ]));

        $response->assertStatus(201);

        tap(SubTask::first(), function($subtask){
            $this->assertEquals('My first subtask', $subtask->body);
            $this->assertFalse($subtask->is_task, 'is_task was not false.');
        });
    }
}
