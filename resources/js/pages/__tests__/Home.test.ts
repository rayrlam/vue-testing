import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useTodoStore } from "../../stores/TodoStore";
import TodoList from "../Home.vue";
import axios from "axios";
import sinon from 'sinon';

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
    let axiosStub;

    beforeEach(() => {
        const pinia = createTestingPinia({
            createSpy: sinon.spy,
            stubActions: false
        });

        axiosStub = sinon.stub(axios, "get").resolves(expectedResponse);

        wrapper = mount(TodoList, {
            global: {
                plugins: [pinia],
            },
        });

        store = useTodoStore();
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
        sinon.restore();
    });
});