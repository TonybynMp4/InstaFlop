<script setup lang="ts">
import ButtonComponent from './ButtonComponent.vue';
import FieldComponent from './FieldComponent.vue';
import type { FormComponent } from '../types';

defineProps<FormComponent>();
const emit = defineEmits(['fieldChange']);

const handleFieldChange = (payload: { id: string, val: string }) => {
    emit('fieldChange', payload);
};
</script>

<template>
    <form v-on:submit="onSubmit">
        <fieldset>
            <legend>{{ formLegend }}</legend>

            <FieldComponent v-for="field in fields" :key="field.id" :id="field.id" :label="field.label"
            @fieldChange="handleFieldChange"
            :placeholder="field.placeholder" :type="field.type" :required="field.required" />

            <section class="actions">
                <ButtonComponent v-for="action in actions" :key="action.id" :id="action.id" :label="action.label"
                    :type="action.type" />
            </section>
        </fieldset>
    </form>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

form {
    font-family: monospace;
    width: 50%;
}

fieldset {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.actions {
    flex-direction: row;
    gap: 1rem;
}

#login {
    flex: 1 1 auto;
}

#reset {
    flex: 0 1 auto;
}
</style>