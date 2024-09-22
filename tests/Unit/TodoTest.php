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
}
