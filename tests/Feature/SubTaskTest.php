<?php

namespace Tests\Feature;

use App\Models\SubTask;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class SubTaskTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test subtask can be created.
     */
    public function test_subtask_can_be_created(): void
    {
        $response = $this->post(route('subtask.store'), [
            'body' => 'My First SubTask',
            'is_task' => false
        ]);
        
        $response->assertStatus(201);

        tap(SubTask::first(), function($subtask){
            $this->assertEquals('My First SubTask', $subtask->body);
            $this->assertFalse($subtask->is_task);
        });
    }
}
