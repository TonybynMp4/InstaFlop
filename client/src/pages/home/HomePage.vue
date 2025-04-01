<script setup lang="ts">
	import PostComponent from '@/components/post/PostComponent.vue';
	import PostComposer from '@/components/post/PostComposer.vue';
	import type { serverPost } from '@/types/apiResponses';
	import type { PostComponentProps } from '@/types/components';
	import { onMounted, reactive } from 'vue';
	import sanitizePosts from '@/utils/sanitizePosts';
	import baseURL from '@/baseUrl';
	import { createComment, dislikePost, likePost } from '@/utils/postUtils';

	const posts = reactive<PostComponentProps[]>([]);
	type getFeedResponse = serverPost[] | { error: string };
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
			posts.push(...sanitizePosts(data));
		}).catch((error) => {
			console.error('Error fetching posts:', error);
		});
	});

	const addPost = (post: serverPost) => {
		if (!post) return;
		posts.unshift(sanitizePosts([post])[0]);
	};

	async function handleEmitLikePost(postId: number) {
		const liked = await likePost(postId);
		const post = posts.find((post) => post.id === postId);

		if (!post) return;

		if (liked) {
			post.liked = true;
			post.likes += 1;
		}
	}

	async function handleEmitDislikePost(postId: number) {
		const disliked = await dislikePost(postId);
		const post = posts.find((post) => post.id === postId);

		if (!post) return;

		if (disliked) {
			post.liked = false;
			post.likes -= 1;
		}
	}

	async function addComment(postId: number, comment: string) {
		const post = posts.find((post) => post.id === postId);
		if (!post) return;
		const newComment = await createComment(postId, comment);
		if (newComment) {
			post.comments.push(newComment);
		}
	}
</script>

<template>
	<main class="flex flex-col gap-4 items-center">
		<section id="feed">
			<PostComposer @postPublished="addPost" />
			<PostComponent
				v-for="post in posts"
				:key="post.id"
				@likePost="handleEmitLikePost"
				@dislikePost="handleEmitDislikePost"
				@submitComment="addComment"
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