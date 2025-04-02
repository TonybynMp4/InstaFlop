<script setup lang="ts">
	import PostComponent from '@/components/post/PostComponent.vue';
	import PostComposer from '@/components/post/PostComposer.vue';
	import type { PostComponentProps } from '@/types/components';
	import { onMounted, reactive } from 'vue';
	import baseURL from '@/baseUrl';
	import { createComment, dislikePost, editComment, likePost, deleteComment } from '@/utils/postUtils';

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

	const addPost = (post: PostComponentProps) => {
		if (!post) return;
		posts.unshift(post);
	};

	async function handleEmitLikePost(postId: number) {
		const liked = await likePost(postId);
		const post = posts.find((post) => post.id === postId);

		if (!post) return;

		if (!liked) return;

		post.liked = true;
		post.likes += 1;
	}

	async function handleEmitDislikePost(postId: number) {
		const disliked = await dislikePost(postId);
		const post = posts.find((post) => post.id === postId);

		if (!post) return;
		if (!disliked) return;

		post.liked = false;
		post.likes -= 1;
	}

	async function addComment(postId: number, comment: string) {
		const post = posts.find((post) => post.id === postId);
		if (!post) return;
		const newComment = await createComment(postId, comment);
		if (!newComment) return;
		post.comments.push(newComment);
	}

	async function handleEmitEditComment({
		commentId,
		newContent,
		postId,
	}: {
		commentId: number;
		newContent: string | null;
		postId: number;
	}) {
		if (!newContent) {
			const post = posts.find((post) => post.id === postId);
			if (!post) return;
			const deleted = await deleteComment(commentId);
			if (!deleted) return;
			post.comments = post.comments.filter((comment) => comment.comment.id !== commentId);
			return;
		}

		const newComment = await editComment(commentId, newContent);
		const post = posts.find((post) => post.id === postId);

		if (!post) return;
		if (!newComment) return;

		const comment = post.comments.find((comment) => comment.comment.id === commentId);
		if (!comment) return;

		comment.comment.content = newContent;

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
				@editComment="handleEmitEditComment"
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