<template>
    <TodoTitle 
        status="todo" 
        :title="props.todo.title"
        :id="props.todo.id"
    >
    </TodoTitle>
</template>

<script setup lang="ts">
    import {Todo} from '../types/Todo';
    import TodoTitle from './TodoTitle.vue';

    const props = defineProps<{
        todo: Todo;
    }>();
</script>