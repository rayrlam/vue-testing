<template>
  <div
    v-if="isVisible"
    class="modal-overlay"
  >
    <div class="modal-content">
      <p>{{ message }}</p>
      <button @click="close" class="px-4 py-1 bg-stone-800 text-white mt-4">
        Close
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { message } = defineProps<{
    message: string;
}>();

const isVisible = ref(false);

const show = () => {
    isVisible.value = true;
};

const close = () => {
    isVisible.value = false;
};

defineExpose({ show, close });
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
}
</style>