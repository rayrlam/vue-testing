import { describe, it, expect } from 'vitest';
import { mount } from "@vue/test-utils";
import AlertModal from '../AlertModal.vue'
 
describe('AlertModal', () => {
    it('renders the component', () => {
        const wrapper = mount(AlertModal, {
            props: {
                message: 'Test message'
            }
        })
        expect(wrapper.exists()).toBe(true)
    })
  
    it('does not show the modal by default', () => {
        const wrapper = mount(AlertModal, {
            props: {
                message: 'Test message'
            }
        })
        expect(wrapper.find('.modal-overlay').exists()).toBe(false);
    })
  
    it('shows the modal when show method is called', async () => {
        const wrapper = mount(AlertModal, {
            props: {
                message: 'Test message'
            }
        })
        await wrapper.vm.show();
        expect(wrapper.find('.modal-overlay').exists()).toBe(true);
    })
  
    it('hides the modal when close method is called', async () => {
        const wrapper = mount(AlertModal, {
            props: {
                message: 'Test message'
            }
        })
        await wrapper.vm.show()
        expect(wrapper.find('.modal-overlay').exists()).toBe(true);
        await wrapper.vm.close();
        expect(wrapper.find('.modal-overlay').exists()).toBe(false);
    })
  
    it('displays the correct message', async () => {
        const testMessage = 'Custom test message'
        const wrapper = mount(AlertModal, {
            props: {
                message: testMessage
            }
        })
        await wrapper.vm.show();
        expect(wrapper.find('.modal-content p').text()).toBe(testMessage);
    })
  
    it('closes the modal when close button is clicked', async () => {
        const wrapper = mount(AlertModal, {
            props: {
                message: 'Test message'
            }
        })
        await wrapper.vm.show();
        expect(wrapper.find('.modal-overlay').exists()).toBe(true);
        await wrapper.find('button').trigger('click');
        expect(wrapper.find('.modal-overlay').exists()).toBe(false);
    })
})