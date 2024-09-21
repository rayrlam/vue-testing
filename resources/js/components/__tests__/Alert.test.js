import Alert from "../Alert.vue";

import { describe, it, expect } from 'vitest'

import { mount } from "@vue/test-utils"

describe('Alert', () => {

    it('is a component', () => {
        const wrapper = mount(Alert);
        expect(wrapper).toBeTruthy();
    });
})

describe('Close Button', () => {
    it('closes when the user clicks the close button', async () => {
        const wrapper = mount(Alert);

        const alert = wrapper.find('[data-testid="alert"]')
        expect(alert.exists()).toBeTruthy();

        await wrapper.find('[data-testid="close"]').trigger('click');

        // Wait for the next tick to ensure Vue has updated the DOM
        await wrapper.vm.$nextTick();

        // Check if the alert is no longer in the DOM
        expect(wrapper.find('[data-testid="alert"]').exists()).toBeFalsy();
    })
})