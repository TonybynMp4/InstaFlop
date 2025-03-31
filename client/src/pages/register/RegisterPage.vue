<script setup lang="ts">
import { reactive } from 'vue';
import FormComponent from '@/components/FormComponent.vue';
import type { ButtonComponentProps, FieldComponentProps } from '@/types/components';
import baseURL from '@/baseUrl';
import { useRouter } from 'vue-router';
const router = useRouter()

const formData = reactive<{
	formLegend: string;
	fields: FieldComponentProps[];
	actions: ButtonComponentProps[];
}>({
	formLegend: 'Créer un compte',
	fields: [
		{ id: 'username', label: 'Handle @', placeholder: 'john_68', type: 'text', required: true },
		{ id: 'displayname', label: 'Nom d\'utilisateur', placeholder: 'John Doe', type: 'text', required: true },
		{ id: 'email', label: 'Email', placeholder: 'Email', type: 'email', required: true },
		{ id: 'password', label: 'Password', placeholder: 'Password', type: 'password', minLength: 8, required: true }
	],
	actions: [
		{ id: 'register', label: 'Créer un compte' },
		{ id: 'reset', label: 'Reset', type: 'reset' }
	]
});

function onsubmit(event: Event) {
	event.preventDefault();
	const data = JSON.stringify({
		email: (event.target as HTMLFormElement).email.value,
		username: (event.target as HTMLFormElement).username.value.trim().toLowerCase(),
		displayname: (event.target as HTMLFormElement).displayname.value,
		password: (event.target as HTMLFormElement).password.value
	})
	fetch(baseURL + '/api/user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: data
	})
		.then(response => {
			return response.json()
		})
		.then(response => {
			if (!response.ok || response.errors) {
				console.error('Custom errors:', response.errors, "Server error:", response.error);
				alert('An error occurred, please try again.');
				return;
			}
			console.log('Success:', response);

			router.push('/login');
			alert('Registration successful! You can now log in.');
		})
	}
	/* TODO: error handling (console log c'pas très user friendly) */
</script>

<template>
	<main>
		<FormComponent :formLegend="formData.formLegend" :fields="formData.fields" :actions="formData.actions"
			:onSubmit="onsubmit" />
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