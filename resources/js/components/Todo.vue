<template>
    <TodoTitle 
        status="todo" 
        :title="props.todo.title">
    </TodoTitle>
</template>

<script setup lang="ts">
    import {Todo} from '../types/Todo';
    import TodoTitle from './TodoTitle.vue';

    const props = defineProps<{
        todo: Todo;
        title: string;
    }>();
</script>