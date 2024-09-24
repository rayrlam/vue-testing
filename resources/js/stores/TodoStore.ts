import {defineStore} from 'pinia';
import {ref} from 'vue';
import axios from "axios";
import {DateTime} from 'luxon';

export const useTodoStore = defineStore('todos', () => {
    const todos = ref([]);

    const lastFetch = ref(null);

    const fetch = async() => {
        const now = DateTime.now();
        if(!lastFetch.value || lastFetch.value.plus({seconds:5}).toMillis() <= now.toMillis()){
            const response = await axios.get('todos');
            todos.value = response.data.todos;
            lastFetch.value = now;
        }
    };

    return {
        todos,
        lastFetch,
        fetch
    };
});