<script setup lang="ts">
import PostComponent from '@/components/post/PostComponent.vue';

const post = {
	id: 1,
	content: 'Enjoying a beautiful day at the beach! 🏖️ #summer #vacation',
	image: '/images/1.jpg',
	comments: [
		{ id: 1, username: 'JohnDoe', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus molestias quo delectus modi nihil earum recusandae facere dignissimos, reprehenderit id, tenetur, blanditiis aspernatur architecto nemo expedita. Odit aliquid commodi expedita.' },
		{ id: 2, username: 'JaneDoe', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus molestias quo delectus modi nihil earum recusandae facere dignissimos, reprehenderit id, tenetur, blanditiis aspernatur architecto nemo expedita. Odit aliquid commodi expedita.' },
	],
	liked: true,
	username: 'JohnDoe',
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