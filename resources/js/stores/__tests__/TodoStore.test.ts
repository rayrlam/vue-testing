import axios from "axios";
import { createPinia, setActivePinia } from "pinia";
import { useTodoStore } from "../TodoStore";

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

describe('TodoStore',() => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.useFakeTimers();
        axios.get.mockResolvedValue(expectedResponse);
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    describe('actions', () => {
        test('fetch can only be called 60 seconds after previous call', async () => {
            const store = useTodoStore();
            await store.fetch();
            expect(axios.get).toBeCalledTimes(1);
            
            // After 59 seconds 
            vi.advanceTimersByTime(59000);
            await store.fetch();
            expect(axios.get).toBeCalledTimes(1);

            // now after 60 seconds, should called 2 times
            vi.advanceTimersByTime(1000);
            await store.fetch();
            expect(axios.get).toBeCalledTimes(2);

            // After 59 seconds again, should only called 2 times
            vi.advanceTimersByTime(59000);
            await store.fetch();
            expect(axios.get).toBeCalledTimes(2);

            // After 1 more seconds, should called 3 times
            vi.advanceTimersByTime(1000);
            await store.fetch();
            expect(axios.get).toBeCalledTimes(3);

        })
    })
});