import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useTodoStore } from "../../stores/TodoStore";
import TodoList from "../HomePage.vue";
import axios from "axios";
import sinon from 'sinon';

const expectedResponse = {
    data: {
        todos: [
            {
                "id": 1,
                "title": "First Todo"
            },
            {
                "id": 2,
                "title": "Second Todo"
            },
        ]
    }
};

describe( 'HomePage', () =>
{
    let wrapper;
    let store;
    let getStub;

    beforeEach( () =>
    {
        const pinia = createTestingPinia( {
            createSpy: sinon.spy,
            // We want the actual fetch and create to run
            stubActions: false
        } );

        // Stub axios.get initially with the default response
        getStub = sinon.stub( axios, "get" ).resolves( expectedResponse );

        // Stub axios.post to simulate creating a new todo
        sinon.stub( axios, "post" ).resolves( {
            data: { todo: { id: 3, title: 'Third Todo' } }
        } );

        wrapper = mount( TodoList, {
            global: {
                plugins: [ pinia ],
            },
        } );

        store = useTodoStore();
    } );

    it( 'can fetch all the todos', async () =>
    {
        // Wait for the component to mount and fetch todos
        await store.fetch();

        // Check if todos are fetched correctly
        expect( store.todos ).toEqual( expectedResponse.data.todos );

        // Check if the correct number of todo items are rendered
        await wrapper.vm.$nextTick(); // Ensure reactivity is updated
        const todoList = wrapper.findAll( '[data-testid="todo-list-item"]' );
        expect( todoList ).toHaveLength( 2 );
    } );

    it( 'can create a new todo and fetch the updated list', async () =>
    {
        // Initial state: Fetch the todos
        await store.fetch();
        expect( store.todos.length ).toBe( 2 ); // Start with 2 todos

        // Create a new todo and check if the store is updated
        await store.create( 'Third Todo' );

        // Stub axios.get to include the new todo on the next fetch
        getStub.resolves( {
            data: {
                todos: [
                    { id: 1, title: 'First Todo' },
                    { id: 2, title: 'Second Todo' },
                    { id: 3, title: 'Third Todo' }
                ]
            }
        } );

        // Fetch the updated list after creating the new todo
        await store.fetchLatest(); // Now fetch the latest todos

        // The store should now have 3 todos
        expect( store.todos.length ).toBe( 3 );
        expect( store.todos[ 2 ].title ).toBe( 'Third Todo' ); // The new todo should be the third

        // Ensure the DOM reflects the new todo item
        await wrapper.vm.$nextTick(); // Ensure DOM updates after reactivity
        const todoList = wrapper.findAll( '[data-testid="todo-list-item"]' );
        expect( todoList ).toHaveLength( 3 ); // 3 todos should now be rendered in the DOM
    } );

    afterEach( () =>
    {
        sinon.restore();
        wrapper.unmount();
    } );
} );