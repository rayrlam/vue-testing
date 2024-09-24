import { createApp } from 'vue';

import {createRouter, createWebHashHistory} from 'vue-router';

import routes from './routes';

import {createPinia} from 'pinia';

import './bootstrap';

import App from './App.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");