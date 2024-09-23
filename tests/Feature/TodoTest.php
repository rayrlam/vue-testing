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
        $response = $this->post(route('todo.store'), [
            'title' => 'My First TODO'
        ]);

        $this->assertEquals('My First TODO', $response['title']);
    }

    /**
     * Test two Todos can be created.
     */
    public function test_two_todos_can_be_created(): void
    {
        $this->post(route('todo.store'), [
            'title' => 'My First TODO'
        ]);

        $this->post(route('todo.store'), [
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

        // !! to change the value of completed from 1 to true 
        $this->assertTrue(!!$todo->fresh()->completed);
    }

    /**
     * Test a mark completed
     */
    public function test_mark_completed(): void
    {
        $todo = Todo::factory()->create(['title' => 'Test Mark Completed']);

        $response = $this->patch(route('todo.completed', $todo->id));

        $response->assertOk();

        $this->assertEquals(1, $todo->fresh()->completed);
    }

    /**
     * Test todo title cannot be empty
     */
    public function test_todo_title_cannot_be_empty(): void
    {

        $response = $this->postJson(route('todo.store'), ['title' => '']);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors('title');
    }

    /**
     * Test can create todo with valid title
     */
    public function test_can_create_todo_with_valid_title(): void
    {
        $response = $this->postJson(route('todo.store'), ['title' => 'Test Todo']);

        $response->assertStatus(201)
                 ->assertJson(['title' => 'Test Todo']);

        $this->assertDatabaseHas('todos', ['title' => 'Test Todo']);
    }
    
    /**
     * Test todo error message for missing title
     */
    public function test_todo_error_message_for_missing_title(): void
    {
        $response = $this->postJson(route('todo.store'), []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors('title')
                 ->assertJson(['message' => 'The title is required.']);
    }

    /**
     * Test error message for title min length
     */
    public function test_error_message_for_title_min_length(): void
    {
        $response = $this->postJson(route('todo.store'), ['title'=>'ab']);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors('title')
                 ->assertJson(['message' => 'The title should be at least 3 characters.']);
    }

    /**
     * Test error message for title max length
     */
    public function test_error_message_for_title_max_length()
    {
        $response = $this->postJson(route('todo.store'), ['title'=>str()->random(256)]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors('title')
                 ->assertJson(['message' => 'The title should not more than 255 characters.']);
    }
}