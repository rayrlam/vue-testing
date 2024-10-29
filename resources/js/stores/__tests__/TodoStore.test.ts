import axios, { AxiosStatic } from "axios";
import { createPinia, setActivePinia } from "pinia";
import { useTodoStore } from "../TodoStore";
import { describe,  expect, vi, beforeEach, afterEach, test } from 'vitest';
import type { MockInstance } from 'vitest';

// Define a type for mocked axios
type MockedAxios = {
    [K in keyof AxiosStatic]: MockInstance;
};

vi.mock('axios');

// Cast axios as MockedAxios
const mockedAxios = axios as unknown as MockedAxios;

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

describe('TodoStore',() => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.useFakeTimers();
        mockedAxios.get.mockResolvedValue(expectedResponse);
    })

    afterEach(() => {
        vi.useRealTimers();
        vi.resetAllMocks();
    })

    describe('actions', () => {
        test('fetch can only be called 60 seconds after previous call', async () => {
            const store = useTodoStore();
            await store.fetch();
            expect(mockedAxios.get).toBeCalledTimes(1);
            
            // After 59 seconds 
            vi.advanceTimersByTime(59000);
            await store.fetch();
            expect(mockedAxios.get).toBeCalledTimes(1);

            // now after 60 seconds, should called 2 times
            vi.advanceTimersByTime(1000);
            await store.fetch();
            expect(mockedAxios.get).toBeCalledTimes(2);

            // After 59 seconds again, should only called 2 times
            vi.advanceTimersByTime(59000);
            await store.fetch();
            expect(mockedAxios.get).toBeCalledTimes(2);

            // After 1 more seconds, should called 3 times
            vi.advanceTimersByTime(1000);
            await store.fetch();
            expect(mockedAxios.get).toBeCalledTimes(3);

        })
    })

    describe('progress', () => {
        test('can be updated its',  async () => {
            const store = useTodoStore();
            store.todos.push({id: 1, title: 'My first test', progress: 'todo'});
            expect(store.todos[0].progress).to.equal('todo');

            await store.updateProgress(1);
            vi.advanceTimersByTime(499);
            expect(store.todos[0].progress).to.equal('in-progress');

            await store.updateProgress(1);
            vi.advanceTimersByTime(499);
            expect(store.todos[0].progress).to.equal('completed');

            await store.updateProgress(1);
            vi.advanceTimersByTime(500);
            expect(store.todos[0].progress).to.equal('todo');

            expect(axios.patch).toHaveBeenCalledTimes(1);
        })
    })
});