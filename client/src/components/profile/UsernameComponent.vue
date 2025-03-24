<script setup lang="ts">
	import { defineProps } from 'vue';
	import type { UsernameComponent } from '@/types';

	const props = defineProps<UsernameComponent>();
	const { username } = props;
</script>

<template>
	<router-link :to="`/profile/${username}`" class="username">
		@{{ username }}
	</router-link>
</template>

<style scoped>
	.username {
		text-decoration: none;
		color: var(--primary);
		font-weight: bold;
	}
	.username:hover {
		text-decoration: underline;
		color: var(--secondary);
	}
</style>