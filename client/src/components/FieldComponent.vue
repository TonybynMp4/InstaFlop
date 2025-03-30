<script setup lang="ts">
    import type { FieldComponentProps } from '../types/components';

    defineProps<FieldComponentProps>();
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
        border-radius: 0.5rem;
    }

	input {
		background-color: #f5f5f5;
		color: #333;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		padding: 0.5rem;
		width: 100%;
		font-size: smaller;
	}

	label {
		font-size: medium;
		color: #333;
		display: block;
	}
</style>