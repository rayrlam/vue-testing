<template>
  <div class="router-view-content">
    <div class="p-4 w-full max-w-[36rem] m-auto flex items-center space-x-2">
      <input
        v-model="todoTitle"
        type="text"
        class="text-sm md:text-base px-2 py-1 flex-grow"
        placeholder="New Todo"
      >
      <button
        type="button"
        title="Add a todo"
        class="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs bg-green-800 text-white shadow rounded-md hover:bg-gray-700 transition-colors sm:w-8 sm:h-8"
        data-testid="create-todo-btn"
        @click="createTodo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4 sm:w-5 sm:h-5" 
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
            stroke="#ffffff" 
            stroke-width="2"  
          />
        </svg>
      </button>
    </div>
    <div class="space-y-2 w-full max-w-[36rem]">
      <div
        v-for="todo in todoStore.todos"
        :key="todo?.id"
        data-testid="todo-list-item"
        class="w-full"
      >
        <transition>
          <Todo
            :todo="todo"
            v-if="!todo.meta?.archived"
          />
        </transition>
      </div>
    </div>
    <AlertModal
      ref="alertModal"
      message="Todo content cannot be empty!"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useTodoStore } from '../stores/TodoStore';
import Todo from "../components/TodoContainer.vue";
import AlertModal from "../components/AlertModal.vue";

const todoStore = useTodoStore();
const alertModal = ref<InstanceType<typeof AlertModal> | null>(null);
const todoTitle = ref( '' );

onBeforeMount(() => {
  todoStore.fetch();
});

const createTodo = async () => {
  if (todoTitle.value.trim() === '') {
    // Show the alert modal if the todo content is empty
    alertModal.value?.show();
    return;
  }

  try {
    await todoStore.create( todoTitle.value );
    todoTitle.value = ''; // Clear the input after creation
    await todoStore.fetchLatest(); // Fetch the latest todos after creation
  } catch ( error ) {
    console.error( 'Error creating todo:', error );
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