<?php

namespace Tests\Feature;

use App\Models\Todo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TodoTest extends TestCase
{

    use RefreshDatabase;

    /**
     * Test a Todo can be created.
     */
    public function test_a_todo_can_be_created(): void
    {
        $response = $this->post('/todo', [
            'title' => 'My First TODO'
        ]);

        $this->assertEquals('My First TODO', $response['title']);
    }

    /**
     * Test two Todos can be created.
     */
    public function test_two_todos_can_be_created(): void
    {
        $this->post('/todo', [
            'title' => 'My First TODO'
        ]);

        $this->post('/todo', [
            'title' => 'My Second TODO'
        ]);

        $todo = Todo::latest('id')->first();

        $this->assertEquals('My Second TODO', $todo->title);
    }

     /**
     * Test a Todo can be completed.
     */
    public function test_a_todo_can_be_completed(): void
    {
        $todo = Todo::factory()->create(['title' => 'Another Todo']);

        $response = $this->patch(route('todo.update', $todo), ['completed' => true]);

        $response->assertOk();
        
        $this->assertTrue(!!$todo->fresh()->completed);
    }
}
