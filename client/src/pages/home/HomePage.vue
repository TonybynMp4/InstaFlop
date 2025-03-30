<script setup lang="ts">
	import PostComponent from '@/components/post/PostComponent.vue';
	import { reactive } from 'vue';

	const posts = reactive([
		{
			id: 1,
			content: 'Enjoying a beautiful day at the beach! 🏖️ #summer #vacation',
			image: '/images/1.jpg',
			comments: [
				{
					id: 1,
					username: 'JohnDoe',
					content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus molestias quo delectus modi nihil earum recusandae facere dignissimos, reprehenderit id, tenetur, blanditiis aspernatur architecto nemo expedita. Odit aliquid commodi expedita.',
					createdAt: new Date().toISOString(),
				},
				{
					id: 2,
					username: 'JaneDoe',
					content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus molestias quo delectus modi nihil earum recusandae facere dignissimos, reprehenderit id, tenetur, blanditiis aspernatur architecto nemo expedita. Odit aliquid commodi expedita.',
					createdAt: new Date().toISOString(),
				},
			],
			liked: true,
			username: 'JohnDoe',
		},
		{
			id: 2,
			content: 'Enjoying a beautiful day at the beach! 🏖️ #summer #vacation',
			image: '/images/2.jpg',
			comments: [
				{
					id: 1,
					username: 'JohnDoe',
					content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus molestias quo delectus modi nihil earum recusandae facere dignissimos, reprehenderit id, tenetur, blanditiis aspernatur architecto nemo expedita. Odit aliquid commodi expedita.',
					createdAt: new Date().toISOString(),
				},
				{
					id: 2,
					username: 'JaneDoe',
					content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus molestias quo delectus modi nihil earum recusandae facere dignissimos, reprehenderit id, tenetur, blanditiis aspernatur architecto nemo expedita. Odit aliquid commodi expedita.',
					createdAt: new Date(1995, 11, 17, 3, 24, 0).toISOString(),
				},
			],
			liked: false,
			username: 'JohnDoe',
		},
	]);
</script>

<template>
	<main class="flex flex-col gap-4 items-center">
		<section id="feed">
			<h2>Suivis</h2>
			<div id="post-form">
				<textarea name="post" id="post" cols="30" rows="3" placeholder="Raconte ta vie.."></textarea>
				<button>Publier</button>
			</div>
			<PostComponent v-for="post in posts" :key="post.id" :post="post"/>
		</section>
	</main>
</template>

<style scoped>
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	#feed {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		width: 80%;
	}
</style>