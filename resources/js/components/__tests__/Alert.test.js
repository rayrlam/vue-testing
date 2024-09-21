import Alert from "../Alert.vue";

import { shallowMount } from "@vue/test-utils"

describe('Alert', () => {

    it('is a component', () => {
        const wrapper = shallowMount(Alert);
        expect(wrapper).toBeTruthy();
    });
})