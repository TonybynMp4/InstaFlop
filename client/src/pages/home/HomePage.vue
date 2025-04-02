<script setup lang="ts">
	import PostComponent from '@/components/post/PostComponent.vue';
	import PostComposer from '@/components/post/PostComposer.vue';
	import type { PostComponentProps } from '@/types/components';
	import { onMounted, reactive } from 'vue';
	import baseURL from '@/baseUrl';
	import { handleEmitLikePost, handleEmitDislikePost, handleEmitEditComment, handleAddPost, handleAddComment } from '@/utils/postUtils';

	const posts = reactive<PostComponentProps[]>([]);
	type getFeedResponse = {error: string} | PostComponentProps[];
	onMounted(async () => {
		await fetch(baseURL + '/api/post/getFeed', {
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
			posts.push(...data);
		}).catch((error) => {
			console.error('Error fetching posts:', error);
		});
	});
</script>

<template>
	<main class="flex flex-col gap-4 items-center">
		<section id="feed">
			<PostComposer @postPublished="(post) => handleAddPost(posts, post)" />
			<PostComponent
				v-for="post in posts"
				:key="post.id"
				@likePost="(postId) => handleEmitLikePost(posts, postId)"
				@dislikePost="(postId) => handleEmitDislikePost(posts, postId)"
				@editComment="(data) => handleEmitEditComment(posts, data)"
				@submitComment="(postId, comment) => handleAddComment(posts, postId, comment)"
				:post="post"
				/>
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