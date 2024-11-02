import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the home page before each test
        await page.goto('/');

        // Wait for the page to load
        await page.waitForSelector('body');
    });

    test('should display Todo text', async ({ page }) => {
        // Check if the text 'Todo' is visible on the page
        const todoText = await page.getByText('Todo', { exact: true });
        await expect(todoText).toBeVisible();
    });

    test('should have an input with placeholder "New Todo"', async ({ page }) => {
        // Find the input element with the placeholder "New Todo"
        const newTodoInput = page.getByPlaceholder(/New Todo/);

        // Assert that the input exists and is visible
        await expect(newTodoInput).toBeVisible();

        // Check if it's an input element
        await expect(newTodoInput).toHaveAttribute('type', 'text');

        // Ensure the input is empty by default
        await expect(newTodoInput).toHaveValue('');
    });

    test('should have a create todo button', async ({ page }) => {
        const createTodoButton = page.getByTestId('create-todo-btn');
  
        // Assert that the button exists and is visible
        await expect(createTodoButton).toBeVisible();
    });

    test('should show modal when create button is clicked without content & close modal when close button is clicked', async ({ page }) => {
        // Find the create todo button and click it
        const createTodoButton = page.getByTestId('create-todo-btn');
        await createTodoButton.click();


        // Wait for the modal to appear using the class "modal-content"
        const modal = page.locator('.modal-content');
        await expect(modal).toBeVisible();

        // Check if the error message is displayed in the modal
        const errorMessage = modal.getByText('Todo content cannot be empty!');
        await expect(errorMessage).toBeVisible();

        // Check if there's a close button in the modal
        const closeButton = modal.getByRole('button', { name: /close/i });
        await expect(closeButton).toBeVisible();

        // Test closing the modal
        await closeButton.click();
        await expect(modal).not.toBeVisible();
    });
});