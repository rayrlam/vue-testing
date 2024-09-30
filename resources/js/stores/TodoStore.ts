import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from "axios";
import { DateTime } from 'luxon';

export const useTodoStore = defineStore('todoList', () => {
    const todos = ref([]);
    const lastFetch = ref(null);

    const list = computed(() => {
        return todos.value;
    });

    const fetchLatest = async () => {
        try {
            const response = await axios.get('todos');
            todos.value = response.data.todos;
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const fetch = async () => {
        const now = DateTime.now();
        if (!lastFetch.value || lastFetch.value.plus({ seconds: 60 }).toMillis() <= now.toMillis()) {
            const response = await axios.get('todos');
            todos.value = response.data.todos;
            lastFetch.value = now;
        }
    };

    const create = async (title: string) => {
        await axios.post('/todo', { title: title });
        lastFetch.value = DateTime.now();
    };

    const updateStatus = (id: number) => {
        const todo =  todos.value.find((todo)=>todo.id === id);

        if(todo.status === 'todo') return (todo.status = "in-progress");
        if(todo.status === 'in-progress') return (todo.status = "completed");
        if(todo.status === 'completed') return (todo.status = "todo");
    }

    const updateTitle = async (id: number, title: string) => {
        const response = await axios.patch(`/todo/${id}`, {title});
        return response;
    }

    return {
        todos,
        lastFetch,
        list,
        fetchLatest,
        fetch,
        create,
        updateStatus,
        updateTitle,
    };
});