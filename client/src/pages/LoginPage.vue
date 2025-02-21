<script setup lang="ts">
    import { reactive } from 'vue';
    import FormComponent from '../components/FormComponent.vue';
    import type { ButtonComponent, FieldComponent } from '../types';
    import useAuthStore from '../stores/auth-store';

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

    const onSubmit = (event: Event) => {
        event.preventDefault();
        const authStore = useAuthStore();

        authStore.login({
            email: (event.target as HTMLFormElement).email.value,
            password: (event.target as HTMLFormElement).password.value
        });
    }

    const rFormData = reactive({}) as { [key: string]: string };
    const onFieldChange = ({ id, val }: { id: string, val: string }) => {
        rFormData[id] = val;
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