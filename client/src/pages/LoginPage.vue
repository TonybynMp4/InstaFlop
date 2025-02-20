<script setup lang="ts">
    import { reactive } from 'vue';
    import FormComponent from '../components/FormComponent.vue';
    import type { ButtonComponent, FieldComponent } from '../types';
    import useAuthStore from '../stores/auth-store';
    import { storeToRefs } from 'pinia';

    const formData = reactive<{
        formLegend: string;
        fields: FieldComponent[];
        actions: ButtonComponent[];
    }>({
        formLegend: 'Login',
        fields: [
            { id: 'email', label: 'Email', placeholder: 'Email', type: 'email', required: true },
            { id: 'password', label: 'Password', placeholder: 'Password', type: 'password', minLength: 8, required: true }
        ],
        actions: [
            { id: 'login', label: 'Login' },
            { id: 'reset', label: 'Reset', type: 'reset' }
        ]
    });

    const authStore  = useAuthStore()
    const { getToken } = storeToRefs(authStore)

    const onSubmit = (event: Event) => {
        event.preventDefault();
        console.log('formData', formData)
        console.log('getToken', getToken.value)
    }

    const onFieldChange = ({ id, val }:{ id: string, val: string }) => {
        console.log('id', id)
        console.log('val', val)
    }
</script>

<template>
    <main>
        <FormComponent
            :formLegend="formData.formLegend"
            :fields="formData.fields"
            :actions="formData.actions"
            @fieldChange="onFieldChange"
            :onSubmit="onSubmit"
        />
    </main>
</template>

<style scoped>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        margin: 3rem auto;
    }
</style>