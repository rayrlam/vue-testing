# Vue.js Testing Playground

![Laravel](https://img.shields.io/badge/Laravel-^11.36.1-blue)
![Vue](https://img.shields.io/badge/Vue-^3.5.12-yellow)
![Vitest](https://img.shields.io/badge/Vitest-^2.1.2-purple)
![Playwright](https://img.shields.io/badge/Playwright-^1.48.2-yellow)
![PHPUnit](https://img.shields.io/badge/PHPUnit-^11.4.2-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

This repository is a submodule of the larger Testing Playground project. It focuses on building and testing a Todo application using Vue.js and Laravel. Our goal is to demonstrate best practices in Vue.js development and comprehensive testing strategies.

## Project Objectives

1. Develop a functional Todo application using Vue.js and Laravel.
2. Implement and showcase various testing methodologies for Vue.js applications.
3. Serve as a learning resource for developers interested in Vue.js testing.

## Features (Planned)

This Todo application is being developed using Test-Driven Development (TDD) principles. The main features include:

- Create, Read, Update, and Delete (CRUD) operations for todo items
- Todo item categorization and filtering
- Due date and priority setting for todo items

## Testing with PHPUnit

This project uses PHPUnit for unit testing. PHPUnit is a popular testing framework for PHP that allows you to write and run tests effectively.

### Running Tests

To run the PHPUnit tests, use the following command:

```bash
./vendor/bin/phpunit
```

This will execute all tests in the `tests` directory by default.

### Running Specific Tests

To run a specific test file, use:

```bash
./vendor/bin/phpunit tests/ExampleTest.php
```

To run a specific test method within a test class, use:

```bash
./vendor/bin/phpunit --filter testMethodName tests/ExampleTest.php
```

### Viewing Test Reports

By default, PHPUnit outputs the results in the console. To generate an HTML report, you can use the following command:

```bash
./vendor/bin/phpunit --report-html report.html
```

## Testing with Vitest

This project utilizes Vitest to conduct unit and component testing for Vue applications.

### Why Vitest?

Vitest is a blazing fast unit test framework powered by Vite. It's designed to be easy to use with Vue.js components and applications. Some key features include:

- Fast execution and hot module replacement (HMR) support
- Vue Test Utils integration for component testing
- Jest-compatible API
- Built-in code coverage
- ESM, TypeScript and JSX support out of the box

## Testing with Playwright

This project leverages Playwright to perform end-to-end testing, enabling us to write and execute tests across all modern web browsers.

### Running Tests

To run the Playwright tests, use the following command:

```bash
npx playwright test
```

This will run all tests in headless mode by default.

### Running Tests in UI Mode

For a better developer experience with time travel debugging and watch mode, you can run tests in UI mode:

```bash
npx playwright test --ui
```

### Running Specific Tests

To run a single test file:

```bash
npx playwright test tests/example.spec.ts
```

To run tests with a specific title:

```bash
npx playwright test -g "test title"
```

### Viewing Test Reports

After running tests, you can view the HTML report:

```bash
npx playwright show-report
```

### Debugging Tests

To debug tests, you can run them in headed mode:

```bash
npx playwright test --headed
```

Or use the debug mode with Playwright Inspector:

```bash
npx playwright test --debug
```

For more information on using Playwright, refer to the [official Playwright documentation](https://playwright.dev/docs/intro).

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or Yarn
- PHP (v7.4 or later)
- Composer

### Installation

1. Clone the main Testing Playground repository:

    ```
    git clone --recursive https://github.com/your-username/testing-playground.git
    ```

2. Navigate to the vue-testing directory:

    ```
    cd testing-playground/vue-testing
    ```

3. Install PHP dependencies:

    ```
    composer install
    ```

4. Install JavaScript dependencies:

    ```
    npm install
    ```
    
5. Set up your environment variables:

    ```
    cp .env.example .env
    php artisan key:generate
    ```
    
6. Run migrations:

    ```
    php artisan migrate
    ```

### Running the Application

1. Start the Laravel development server:

    ```
    php artisan serve
    ```

2. In a separate terminal, compile and hot-reload for development:

    ```
    npm run dev
    ```

3. Access the application at `http://localhost:8000`


## Running Tests

- To run PHPUnit:

    ```
    php artisan test
    ```
- To run Vitest:

    ```
    npm run test
    ```
- To run Playwright:
    ```
    npx playwright test
    ```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).