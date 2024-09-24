import Home from "../Home.vue";
import {mount} from '@vue/test-utils';

describe('Home', () => {
    it('can fetch all the todos', async () => {
        const wrapper = mount(Home);
        await wrapper.get('button').trigger('click');
        await wrapper.vm.$nextTick();
        const todoList = wrapper.findAll('[data-testid="todo-list-item"]');

        expect(todoList).toHaveLength(2);
    });
})