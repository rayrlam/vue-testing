<template>
    <h1 class="mt-2 mb-2">Todos</h1>
    <div v-for="todo in todoStore.todos" 
        :key="todo.id"  
        data-testid="todo-list-item"
    >
        <Todo :todo="todo" :title="todo.title" />
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useTodoStore } from '../stores/TodoStore';
import Todo from "../components/Todo.vue";

const todoStore = useTodoStore();

onBeforeMount(() => {
    todoStore.fetch()
});
</script>