<template>
    <div class="flex mt-2 mb-2 border-b border-1 pb-2">
        <div class="cursor-pointer ml-2 mr-4 bg-green-500 text-xs text-white rounded-full px-4 py-2">
            {{ props.status }}
        </div>
        <div class="text-gray-800">{{ props.title }}</div>
    </div>
</template>

<script setup lang="ts">
    import {TodoType} from "../types/Todo";

    const props = defineProps<{
        title:string;
        status: TodoType;
    }>();
</script>

<style scoped>

</style>