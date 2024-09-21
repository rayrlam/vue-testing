<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TodoTest extends TestCase
{
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
}
