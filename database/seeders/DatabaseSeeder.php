<?php

namespace Database\Seeders;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Todo;
use App\Models\SubTask;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $todo = Todo::factory()->create();
        $todo->subTasks()->create(SubTask::factory()->make()->toArray());
        SubTask::find(1)->subTasks()->create(SubTask::factory()->make()->toArray());
        SubTask::find(2)->subTasks()->create(SubTask::factory()->make()->toArray());
        SubTask::find(3)->subTasks()->create(SubTask::factory()->make()->toArray());
    }
}