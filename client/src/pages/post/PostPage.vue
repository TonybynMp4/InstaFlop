<script setup lang="ts">
import PostComponent from '@/components/post/PostComponent.vue';

const post = {
	id: 1,
	content: 'Enjoying a beautiful day at the beach! 🏖️ #summer #vacation',
	image: '/images/1.jpg',
	comments: [],
	liked: true,
	likes: 10,
	username: 'JohnDoe',
	profilePicture: '/images/1.jpg',
	createdAt: '2023-10-01T12:00:00Z'
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