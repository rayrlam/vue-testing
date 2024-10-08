import { defineStore } from 'pinia';
import { computed, ref, Ref } from 'vue';
import axios from "axios";
import { DateTime } from 'luxon';
import { Todo, TodoProgress } from "../types/Todo.d";
import { debounce } from 'lodash';

export const useTodoStore = defineStore('todos', () => {
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

    const updateProgress = async (id: number) => {
        const todo = todos.value.find((todo) => todo.id === id);
        const progressArr = Object.values(TodoProgress).filter((v) => isNaN(Number(v))) as TodoProgress[];

        const progressIndex = progressArr.findIndex(progress => progress === todo.progress);

        todo.progress = progressArr[progressIndex + 1] ?? progressArr[0];

        await axios.patch(`/todo/${id}/mark/${todo.progress}`);

       //  debounce( axios.patch(`/todo/${id}/mark/${todo.progress}`), 500);
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