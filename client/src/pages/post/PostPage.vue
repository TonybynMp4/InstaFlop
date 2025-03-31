<script setup lang="ts">
import PostComponent from '@/components/post/PostComponent.vue';
import type { PostComponentProps } from '@/types/components';

const post: PostComponentProps = {
	id: 1,
	content: 'Enjoying a beautiful day at the beach! 🏖️ #summer #vacation',
	images: ['/images/1.jpg'],
	comments: [],
	liked: true,
	likes: 10,
	createdAt: '2023-10-01T12:00:00Z',
	user: {
		username: 'JohnDoe',
		displayname: 'John Doe',
		profilePicture: '/images/1.jpg',
	}
}
</script>

<template>
	<main class="flex flex-col gap-4 items-center">
		<PostComponent :post="post" />
	</main>
</template>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
	width: 80%;
	margin: 2rem auto;
}

p {
	margin: 0;
}
</style>