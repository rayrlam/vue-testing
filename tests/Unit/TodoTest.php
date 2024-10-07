<?php

namespace Tests\Unit;

use App\Models\Todo;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TodoTest extends TestCase
{
    use RefreshDatabase;
    
    private $progressList = ['todo','in-progress','completed'];

    public function test_the_default_value_of_progress_is_todo(): void
    {
        $todo = Todo::factory()->create();
        $this->assertEquals($todo->progress, 'todo');
    }

    public function test_progress_can_be_updated(): void
    {
        $todo = Todo::factory()->create();
        // default value of progress should be todo 
        $this->assertEquals($todo->progress, 'todo');
        
        $len = 10;
        for($i = 0; $i < $len; $i++){
            // test the index 0,1,2 from progressList then test it with the index of random_int 
            $progress = $i > 2 ? $this->progressList[random_int(0,2)] : $this->progressList[$i];
            $todo->markProgress($progress);
            $this->assertEquals($todo->progress, $progress);
        }    
    }

    public function test_can_get_completed_by_attribute(): void
    {
        $todo = Todo::factory()->create();
        $this->assertFalse($todo->isCompleted);

        $todo->markProgress('completed');
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