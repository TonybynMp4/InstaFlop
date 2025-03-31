<script setup lang="ts">
	import PostComponent from '@/components/post/PostComponent.vue';
	import PostComposer from '@/components/post/PostComposer.vue';
	import type { serverPost } from '@/types/apiResponses';
	import type { PostComponentProps } from '@/types/components';
	import { onMounted, reactive } from 'vue';
	import sanitizePosts from '@/utils/sanitizePosts';

	const posts = reactive<PostComponentProps[]>([]);
	type getFeedResponse = serverPost[] | { error: string };
	onMounted(async () => {
		await fetch('http://localhost:3000/api/post/getFeed', {
			method: 'GET',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
		}).then((response) => {
			return response.json();
		}).then((data: getFeedResponse) => {
			if ('error' in data) {
				console.error('Error fetching posts:', data.error);
				return;
			}
			posts.push(...sanitizePosts(data));
		}).catch((error) => {
			console.error('Error fetching posts:', error);
		});
	});

	const addPost = (post: serverPost) => {
		if (!post) return;
		posts.unshift(sanitizePosts([post])[0]);
	};

</script>

<template>
	<main class="flex flex-col gap-4 items-center">
		<section id="feed">
			<PostComposer @postPublished="addPost" />
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
		margin: 2rem 0;
	}

	#feed {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		width: 80%;
	}

	@media (max-width: 1024px) {
		#feed {
			width: 95%;
		}
	}
</style>