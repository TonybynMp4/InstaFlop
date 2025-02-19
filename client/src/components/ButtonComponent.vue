<script setup lang="ts">
    import type { ButtonComponent } from '../types';

    defineProps<ButtonComponent>();
</script>

<template>
    <button :id="id" :type="type ?? 'submit'" :class="className" :style="style" :disabled="disabled">
        {{ label }}
    </button>
</template>

<style scoped>
</style>