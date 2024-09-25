<template>
    <h1>Todos</h1>
    <div>
        <ul>
            <li 
                v-for="todo in todoStore.todos" 
                :key="todo.id" 
                class="todo-list-item"
                data-testid="todo-list-item"
            >{{ todo.title }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useTodoListStore } from '../stores/TodoListStore';

const todoStore = useTodoListStore();

onBeforeMount(() => {
    todoStore.fetch()
});
</script>