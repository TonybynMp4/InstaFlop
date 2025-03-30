<script setup lang="ts">
	import PostComponent from '@/components/post/PostComponent.vue';
	import type { PostComponentProps } from '@/types/components';
	import { reactive } from 'vue';

	const posts = reactive<PostComponentProps[]>([]);
	await fetch('http://localhost:3000/api/post/getFeed', {
			method: 'GET',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
		}).then((response) => {
			return response.json();
		}).then((data) => {
			posts.push(...data.posts);
		}).catch((error) => {
			console.error('Error fetching posts:', error);

		});
	console.log(posts);
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