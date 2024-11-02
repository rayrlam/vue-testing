<template>
  <div class="flex flex-col items-center w-full">
    <div class="flex justify-center items-center space-x-6 px-4 py-3 bg-gray-100 w-full">
      <router-link to="/" class="text-blue-600 hover:text-blue-800 font-medium">
        Todo
      </router-link>
      <!-- <router-link to="/in-progress" class="text-blue-600 hover:text-blue-800 font-medium">
        In Progress
      </router-link> -->
    </div>
    <div class="w-full max-w-5xl px-4">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>