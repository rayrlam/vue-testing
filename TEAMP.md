    describe('Close Button', () => {
        it('closese when the user clicks the close button.', () => {
            const wrapper = shallowMount(Alert);

            const alert = wrapper.find('[data-testid="alert"]')

            expect(alert.inVisible()).toBeTruthy();

            
        })
    })