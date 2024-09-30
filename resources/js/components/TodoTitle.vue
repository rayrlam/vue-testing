<template>
    <div class="flex mt-2 mb-2 border-b border-1 pb-2 m-auto">
        <div class="cursor-pointer ml-2 mr-4 bg-green-500 text-xs text-white rounded-full px-4 py-2">
            {{ props.status }}
        </div>
 
        <input 
            type="text" 
            class="flex w-full p-2 text-ellipsis" 
            v-model="title" 
            data-testid="todo-title-input"
            @blur="$event => updateTitle(props.id, title)"
        />

        <div class="pr-12 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onBeforeMount } from "vue";
    import {TodoType} from "../types/Todo";
    import { useTodoStore } from "../stores/TodoStore";

    const {updateTitle} = useTodoStore();

    const props = defineProps<{
        id: number;
        title:string;
        status: TodoType;
    }>();

    const title = ref('');

    onBeforeMount(() => {
        title.value = props.title
    });

</script>

<style scoped>

</style>