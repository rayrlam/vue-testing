import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the home page before each test
        await page.goto('/');

        // Wait for the page to load
        await page.waitForSelector('body');
    });

    test('should display Todo link', async ({ page }) => {
        // Check if the text 'Todo' is visible on the page
        const todoLink = await page.getByRole('link', { name: 'Todo' });
        await expect(todoLink).toBeVisible();

        // Verify that the link points to the root URL, accounting for hash-based routing
        const href = await todoLink.getAttribute('href');
        expect(href === '/' || href === '#/').toBe(true);
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

    test('can create a new todo', async({page}) => {

        // Get the input field and the create button
        const inputField = page.getByPlaceholder('New Todo');
        const createButton = page.getByTestId('create-todo-btn');

        // Check if the input field and create button are visible
        await expect(inputField).toBeVisible();
        await expect(createButton).toBeVisible();

        // Count the initial number of todo items
        const initialTodoCount = await page.getByTestId('todo-list-item').count();

        // Type a new todo into the input field
        const newTodoText = 'New test todo';
        await inputField.fill(newTodoText);

        // Click the create button
        await createButton.click();

        // Wait for the todo list to update
        await page.waitForFunction((initialCount) => {
            return document.querySelectorAll('[data-testid="todo-list-item"]').length > initialCount;
        }, initialTodoCount);

        // Check if the number of todo items has increased
        const newTodoCount = await page.getByTestId('todo-list-item').count();
        expect(newTodoCount).toBe(initialTodoCount + 1);

        // Get the last todo item
        const lastTodoItem = page.getByTestId('todo-list-item').last();

        // Find the input element within the last todo item
        const todoTitleInput = lastTodoItem.getByTestId('todo-title-input');

        // Check if the new todo text is in the input
        await expect(todoTitleInput).toHaveValue(newTodoText);

        // Check if the main input field is cleared after creating the todo
        await expect(inputField).toHaveValue('');
    });
});