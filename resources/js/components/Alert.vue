<template>
  <div v-if="isVisible" data-testid="alert">
    Alert content
    <button @click="close" data-testid="close">Close</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true
    }
  },
  methods: {
    close() {
      this.isVisible = false
    }
  }
}
</script>