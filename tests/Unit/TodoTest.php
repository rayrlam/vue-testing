<?php

namespace Tests\Unit;

use App\Models\Todo;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TodoTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_default_value_of_completed_is_0(): void
    {
        $todo = Todo::factory()->create();
        $this->assertEquals(0, $todo->completed);
    }

    public function test_todo_can_update_status(): void
    {
        $todo = Todo::factory()->create();
        $this->assertEquals($todo->progress, 'todo');
        
        $todo->markProgress('in-progress');
        $this->assertEquals($todo->progress, 'in-progress');

        $todo->markProgress('completed');
        $this->assertEquals($todo->progress, 'completed');

        $todo->markProgress('todo');
        $this->assertEquals($todo->progress, 'todo');
    }

    public function test_can_get_completed_by_attribute(): void
    {
        $todo = Todo::factory()->create();
        $this->assertFalse($todo->isCompleted);

        $todo->markCompleted();
        $this->assertTrue($todo->isCompleted);
    }

    public function test_todo_can_be_archived(): void
    {
        $todo = Todo::factory()->create();
        $this->assertNull($todo->archived_at);

        $todo->archive();
        $this->assertNotNull($todo->archived_at);
    }
}