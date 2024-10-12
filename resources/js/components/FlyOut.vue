<template>
  <div 
    v-show="props.isOpen"
    data-testid="flyout-backer"
    class=" fixed top-0 left-0 right-0 bottom-0 z-10"
    @click="$event => emit('update:is-open', false)"
  />

  <div 
    v-show="props.isOpen" 
    class="absolute z-10 py-2 -mt-8"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    isOpen: boolean;

}>();

const emit = defineEmits<{
    (e: "update:is-open", boolean): void;
}>();

</script>