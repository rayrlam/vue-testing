import {defineStore} from 'pinia';
import {ref} from 'vue';
import axios from "axios";

export const useTodoStore = defineStore('todos', () => {
    const todos = ref([]);

    const fetch = async() => {
        const response = await axios.get('todos');
        todos.value = response.data.todos;
 
    };

    return {
        todos,
        fetch
    };
});