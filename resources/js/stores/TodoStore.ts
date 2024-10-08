import { defineStore } from 'pinia';
import { computed, ref, Ref } from 'vue';
import axios from "axios";
import { DateTime } from 'luxon';
import { Todo } from "../types/Todo";

export const useTodoStore = defineStore('todoList', () => {
    const todos = <Ref<Todo[]>>ref([]);
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

    const updateProgress = (id: number) => {
        const todo =  todos.value.find((todo)=>todo.id === id);

        if(todo.progress === 'todo') return (todo.progress = "in-progress");
        if(todo.progress === 'in-progress') return (todo.progress = "completed");
        if(todo.progress === 'completed') return (todo.progress = "todo");
    }

    const updateTitle = async (id: number, title: string) => {
        const response = await axios.patch(`/todo/${id}`, {title});
        return response;
    }

    const archive = async (id: number) => {
        const response = await axios.delete(`/todo/${id}`);    
        const todo = todos.value.find((todo) => todo.id === id);
        todo.meta = {archived: true};
        return response;
    }

    return {
        todos,
        lastFetch,
        list,
        fetchLatest,
        fetch,
        create,
        updateProgress,
        updateTitle,
        archive,
    };
});