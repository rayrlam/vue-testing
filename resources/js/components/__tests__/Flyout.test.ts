import { VueWrapper, mount } from "@vue/test-utils";
import Flyout from "../Flyout.vue";
import { createTestingPinia } from "@pinia/testing";

let wrapper: VueWrapper;
describe('Flyout', () => {
    beforeEach(()=>{
        const pinia = createTestingPinia({ 
            createSpy: vi.fn,
            stubActions: false
        });

        wrapper = mount(Flyout, {
            global: {
                plugins: [pinia]
            },
            props: {
                isOpen: false,
            }
        });
    });

    it('can be opened', async() => {
        const backer = wrapper.find('[data-testid="flyout-backer"]');
        
        // Check initial state
        expect(backer.exists()).toBe(true);
        expect((backer.element as HTMLElement).style.display).toBe('none');

        // Open the flyout
        await wrapper.setProps({ isOpen: true });
        // await wrapper.vm.$nextTick();

        // Check opened state
        expect((backer.element as HTMLElement).style.display).not.toBe('none');
    });

    it('can be closed', async () => {
        // Start with the flyout open
        await wrapper.setProps({ isOpen: true });
        // await wrapper.vm.$nextTick();

        const backer = wrapper.find('[data-testid="flyout-backer"]');

        // Check that it's initially visible
        expect((backer.element as HTMLElement).style.display).not.toBe('none');

        // Close the flyout
        await wrapper.setProps({ isOpen: false });
        // await wrapper.vm.$nextTick();

        // Check that it's now hidden
        expect((backer.element as HTMLElement).style.display).toBe('none');
    });

    it('emits update:is-open event when backer is clicked', async () => {
        await wrapper.setProps({ isOpen: true });
        const backer = wrapper.find('[data-testid="flyout-backer"]');
        
        await backer.trigger('click');

        expect(wrapper.emitted('update:is-open')).toBeTruthy();
        expect(wrapper.emitted('update:is-open')![0]).toEqual([false]);
    });
})