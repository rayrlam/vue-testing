<template>
    <TodoTitle 
        :id="props.todo.id"
        :title="props.todo.title"
        :progress="props.todo.progress"
    >
    </TodoTitle>

    <SubTask :tasks="props.todo.subtasks" />
</template>

<script setup lang="ts">
    import {Todo} from '../types/Todo.d';
    import SubTask from './SubTask.vue';
    import TodoTitle from './TodoTitle.vue';

    const props = defineProps<{
        todo: Todo;
    }>();
</script>