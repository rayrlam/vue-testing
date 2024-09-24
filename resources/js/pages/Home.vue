<template>
    <h1>Todos</h1>
    <div>
        <ul>
            <li 
                v-for="todo in list" 
                :key="todo.id" 
                class="todo-list-item"
                data-testid="todo-list-item"
            >{{ todo.title }}</li>
        </ul>

        <button @click="fetch">Fetch Todos</button>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { ref } from 'vue';
    import sinon from "sinon";
    const list = ref([]);

    const expectedResponse = {
        data: {
            todos:[
                {
                    "id": 1,
                    "title":"Unde molestiae iste libero saepe."
                },
                {
                    "id": 2,
                    "title":"Ut illum tempora similique officia reiciendis corrupti et facere."
                },
            ]
        }
    }

    const fetch = () => {
        sinon.stub(axios, "get").resolves(expectedResponse)
        axios.get('todos').then(response => {
            console.log(response);
            list.value = response.data.todos;
        })
    }
</script>

<style scoped>

</style>