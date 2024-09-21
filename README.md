# Vue.js Testing Playground

![Laravel](https://img.shields.io/badge/Laravel-^11.23.5-blue)
![Vue](https://img.shields.io/badge/Vue-^3.5.7-yellow)
![Vitest](https://img.shields.io/badge/Vitest-^3.5.7-purple)
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
- User authentication and authorization
- Todo item categorization and filtering
- Due date and priority setting for todo items

## Testing with Vitest

This project uses Vitest for unit and component testing of Vue applications.

### Why Vitest?

Vitest is a blazing fast unit test framework powered by Vite. It's designed to be easy to use with Vue.js components and applications. Some key features include:

- Fast execution and hot module replacement (HMR) support
- Vue Test Utils integration for component testing
- Jest-compatible API
- Built-in code coverage
- ESM, TypeScript and JSX support out of the box

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

To run PHP tests:

    ```
    php artisan test
    ```
To run Vitest:

    ```
    npm run test
    ```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).