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

        <button @click="todoStore.fetch()">Fetch Todos</button>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { ref } from 'vue';
    import { useTodoStore } from '../stores/TodoStore';

    const todoStore = useTodoStore();
</script>

<style scoped>

</style>