<template>
    <TodoTitle 
        status="todo" 
        :title="props.todo.title"
        :id="props.todo.id"
    >
    </TodoTitle>

    <SubTask :tasks="props.todo.subtasks" />
</template>

<script setup lang="ts">
    import {Todo} from '../types/Todo';
    import SubTask from './SubTask.vue';
    import TodoTitle from './TodoTitle.vue';

    const props = defineProps<{
        todo: Todo;
    }>();
</script>