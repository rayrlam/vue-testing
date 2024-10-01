<template>
    <div 
        v-show="props.isOpen"
        data-testid="flyout-backer"
        @click="$event => emit('update:is-open', false)"
    />

    <div v-show="props.isOpen"><slot /></div>
</template>

<script setup lang="ts">

const props = defineProps<{
    isOpen: boolean;

}>();

const emit = defineEmits<{
    (e: "update:is-open", boolean): void;
}>();

</script>