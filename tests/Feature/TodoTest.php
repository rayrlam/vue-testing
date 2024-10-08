<?php

namespace Tests\Feature;

use App\Models\Todo;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TodoTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_todo_can_be_created(): void
    {
        $response = $this->post(route('todo.store'), [
            'title' => 'My First TODO'
        ]);

        $this->assertEquals('My First TODO', $response['title']);
    }

    public function test_a_todo_title_can_be_edited(): void
    {
        $todo = Todo::factory()->create(['title' => 'Another Todo']);

        $response = $this->patch(route('todo.update', $todo), ['title' => 'Updated Todo Title']);

        $response->assertOk();

        $this->assertEquals('Updated Todo Title', $todo->fresh()->title);
    }
    
    public function test_todo_title_cannot_be_empty(): void
    {
        $response = $this->postJson(route('todo.store'), ['title' => '']);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors('title');
    }

    public function test_can_create_todo_with_valid_title(): void
    {
        $response = $this->postJson(route('todo.store'), ['title' => 'Test Todo']);

        $response->assertStatus(201)
                 ->assertJson(['title' => 'Test Todo']);

        $this->assertDatabaseHas('todos', ['title' => 'Test Todo']);
    }
    
    public function test_todo_error_message_for_missing_title(): void
    {
        $response = $this->postJson(route('todo.store'), []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors('title')
                 ->assertJson(['message' => 'The title is required.']);
    }

    public function test_error_message_for_title_min_length(): void
    {
        $response = $this->postJson(route('todo.store'), ['title'=>'ab']);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors('title')
                 ->assertJson(['message' => 'The title should be at least 3 characters.']);
    }

    public function test_error_message_for_title_max_length()
    {
        $response = $this->postJson(route('todo.store'), ['title'=>str()->random(256)]);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors('title')
                 ->assertJson(['message' => 'The title should not more than 255 characters.']);
    }

    public function test_can_be_archived()
    {
        $todo = Todo::factory()->create();
        $this->assertNull($todo->fresh()->archived_at);
        $response = $this->delete(route('todo.archive', ['todo' => $todo->id]));
        $this->assertNotNull($todo->fresh()->archived_at);
    }

    public function test_todo_can_update_its_progress(): void
    {
        $todo = Todo::factory()->create(['title' => 'Test Mark Completed']);

        $progressArr = collect(["todo","in-progress","completed"]);

        $progressArr->each(function ($progress) use($todo){
            $response = $this->patch(route('todo.progress.update', ['todo'=>$todo,'progress'=>$progress]));
            $response->assertOk();
    
            tap(Todo::first(), function($todo) use($progress){
                $this->assertEquals($todo->progress, $progress);
            });
        });
    }
}