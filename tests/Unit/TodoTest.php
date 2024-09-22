<?php

namespace Tests\Unit;

use App\Models\Todo;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TodoTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the default value of completed is 0 
     */
    public function test_the_default_value_of_completed_is_0(): void
    {
        $todo = Todo::factory()->create();
        $this->assertEquals(0, $todo->completed);
    }

    /**
     * Test can set to completed by mark completed functions
     */
    public function test_can_set_to_completed_by_mark_completed_function(): void
    {
        $todo = Todo::factory()->create();
        $todo->markCompleted();
        $this->assertTrue(!!$todo->completed);
    }

     /**
     * Test can get completed by attribute
     */
    public function test_can_get_completed_by_attribute(): void
    {
        $todo = Todo::factory()->create();
        $this->assertFalse($todo->isCompleted);

        $todo->markCompleted();
        $this->assertTrue($todo->isCompleted);
    }
}