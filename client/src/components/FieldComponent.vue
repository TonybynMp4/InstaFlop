<script setup lang="ts">
    import type { FieldComponent } from '../types';

    defineProps<FieldComponent>();
</script>

<template>
    <section>
        <label :for="id">{{label}}</label>
        <input @input="(event:any) => $emit('fieldChange', {
                id: id,
                val: event.target!.value
            })"
			:value="defaultValue"
            :type="type ?? 'text'" :id="id" :name="id" :required="required" :placeholder="placeholder" :minlength="minLength" />
   </section>
</template>

<style>
    input:user-invalid {
        border: 2px inset red;
        border-radius: 2px;
    }
</style>