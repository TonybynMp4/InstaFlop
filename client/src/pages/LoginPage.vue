<script setup lang="ts">
    import { reactive } from 'vue';
    import FormComponent from '../components/FormComponent.vue';
    import type { ButtonComponent, FieldComponent } from '../types';

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

    function onsubmit(event: Event) {
        event.preventDefault();
        fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: (event.target as HTMLFormElement).email.value,
                password: (event.target as HTMLFormElement).password.value
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }
</script>

<template>
    <main>
        <FormComponent
            :formLegend="formData.formLegend"
            :fields="formData.fields"
            :actions="formData.actions"
            :onSubmit="onsubmit"
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