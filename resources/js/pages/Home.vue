<template>
    <div class="p-4 w-full m-auto flex space-x-2">
        <input v-model="todoTitle" type="text" class="text-sm md:text-base px-2 py-1 w-64 md:w-96" placeholder="New Todo" />
        <button type="button" 
            title="Add a todo"
            class="w-10 h-10 p-2  bg-slate-200 text-slate-800 shadow rounded"
            data-testid="create-todo-btn"
            @click="createTodo"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
        </button>
    </div>
    <div v-for="todo in todoStore.todos" 
        :key="todo?.id" 
        data-testid="todo-list-item"
    >
        <transition>
            <Todo :todo="todo" v-if="!todo.meta?.archived" />
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount  } from 'vue';
import { useTodoStore } from '../stores/TodoStore';
import Todo from "../components/Todo.vue";

const todoStore = useTodoStore();

onBeforeMount(() => {
    todoStore.fetch();
});

const todoTitle = ref('');

const createTodo = async () => {
    try {
        await todoStore.create(todoTitle.value);
        todoTitle.value = ''; // Clear the input after creation
        await todoStore.fetchLatest(); // Fetch the latest todos after creation
    } catch (error) {
        console.error('Error creating todo:', error);
    }
};

</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>