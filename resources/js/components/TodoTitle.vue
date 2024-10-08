<template>
    <div class="flex mt-2 mb-2 border-b border-1 pb-2 m-auto">
        <button 
            :class="['cursor-pointer ml-2 mr-4 w-32 text-xs text-white py-1', buttonColor]"
            @click="updateProgress(props.id)"
        >
            <div class="text-xs">
                {{ buttonText }}
            </div>
        </button>
 
        <input 
            type="text" 
            class="flex w-full p-2 text-ellipsis" 
            v-model="title" 
            data-testid="todo-title-input"
            @blur="$event => updateTitle(props.id, title)"
        />

        <div class="pr-14">
            <div class="ml-6 mt-2 cursor-pointer" @click="$event => showActions = true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
                    <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
                </svg>
            </div>
            <Flyout
                v-model:is-open="showActions"  
                class="bg-stone-200 p-2"  
            >
                <button 
                    class="text-xs px-4 py-2 bg-stone-200  hover:bg-stone-300 w-full"
                    @click="$event => archive(props.id)"
                >Archive</button>
            </Flyout>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed, watch } from "vue";
import {TodoProgress} from "../types/Todo.d";
import { useTodoStore } from "../stores/TodoStore";
import Flyout from "./Flyout.vue";

const { updateProgress, updateTitle, archive } = useTodoStore();

const props = defineProps<{
    id: number;
    title:string;
    progress: TodoProgress;
}>();

const title = ref('');
const showActions = ref(false);

const buttonColor = computed(() => {
  switch (props.progress) {
    case 'todo':
      return 'bg-orange-500';
    case 'in-progress':
      return 'bg-purple-500';
    case 'completed':
      return 'bg-green-500';
  }
});

const buttonText = computed(() => {
  switch (props.progress) {
    case 'todo':
      return 'Todo';
    case 'in-progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
  }
});

onBeforeMount(() => {
    title.value = props.title
});

</script>