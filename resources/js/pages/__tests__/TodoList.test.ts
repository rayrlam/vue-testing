import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useTodoListStore } from "../../stores/TodoListStore";
import TodoList from "../TodoList.vue"
import axios from "axios";

vi.mock('axios');

const expectedResponse = {
    data: {
        todos: [
            {
                "id": 1,
                "title": "Unde molestiae iste libero saepe."
            },
            {
                "id": 2,
                "title": "Ut illum tempora similique officia reiciendis corrupti et facere."
            },
        ]
    }
};

describe('TodoList', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        const pinia = createTestingPinia({
            createSpy: vi.fn,
            stubActions: false
        });

        vi.mocked(axios.get).mockResolvedValue(expectedResponse);

        wrapper = mount(TodoList, {
            global: {
                plugins: [pinia],
            },
        });

        store = useTodoListStore();
    });

    it('can fetch all the todos', async () => {
 
        // Check if todos are fetched correctly
        expect(store.todos).toEqual(expectedResponse.data.todos);

        // Check if the correct number of todo items are rendered
        const todoList = wrapper.findAll('[data-testid="todo-list-item"]');
        expect(todoList).toHaveLength(2);

    });

    afterEach(() => {
        wrapper.unmount();
        vi.restoreAllMocks();
    });
});