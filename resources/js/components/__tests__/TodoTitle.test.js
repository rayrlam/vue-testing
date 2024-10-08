const { shallowMount } = require("@vue/test-utils");
import { createTestingPinia } from "@pinia/testing";
import axios from "axios";
import { useTodoStore } from "../../stores/TodoStore";
import TodoTitle from "../TodoTitle.vue";
import {nextTick} from "vue";

let wrapper;
let store;

vi.mock('axios');

describe('TodoTitle', () => {
    beforeEach(()=>{
        const pinia = createTestingPinia({ 
            createSpy: vi.fn,
            stubActions: false
        });
        wrapper = shallowMount(TodoTitle, {
            global: {
                plugins: [pinia]
            },
            props: {
                id: 1,
                progress: "todo",
                title: "New Todo",
            }
        });

        store = useTodoStore();
        store.todos = [{ id: 1, title: "New Todo" }];

        vi.mocked(axios.patch).mockResolvedValue({
            data: { id: 1, title: "Updated Title" }
        });
    });

    it('can update its own title', async () => {
        const input = wrapper.find('[data-testid="todo-title-input"]');
        await input.setValue('Updated Title');
        await input.trigger("blur");

        // Store Action Verification
        expect(store.updateTitle).toHaveBeenCalledWith(1, 'Updated Title');

        // Manual Store Update:
        store.todos[0].title = "Updated Title";

        await wrapper.vm.$nextTick();

        // Component State Check. The prop doesn't change
        expect(wrapper.props('title')).toBe('New Todo'); 

        // But the internal ref does
        expect(wrapper.vm.title).toBe('Updated Title'); 

        // Store State Check
        expect(store.todos[0].title).toBe('Updated Title');
    })
})