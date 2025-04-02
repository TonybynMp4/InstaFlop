<script setup lang="ts">
	import PostComponent from '@/components/post/PostComponent.vue';
	import PostComposer from '@/components/post/PostComposer.vue';
	import type { PostComponentProps } from '@/types/components';
	import { onMounted, reactive } from 'vue';
	import baseURL from '@/baseUrl';
	import { handleEmitLikePost, handleEmitDislikePost, handleEmitEditComment, handleAddPost, handleAddComment, handleEmitEditPost } from '@/utils/postUtils';

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

	async function editPost(postId: number, newContent: string) {
		const result = await handleEmitEditPost(posts, postId, newContent);
		console.log('result', result);
		if (result) {
			const postIndex = posts.findIndex((post) => post.id === postId);
			if (postIndex !== -1) {
				posts[postIndex].content = newContent;
			}
		} else {
			alert('Error editing post. Please try again later.');
		}
	}

	async function editComment(data: { commentId: number; newContent: string, postId: number }) {
		const result = await handleEmitEditComment(posts, data);
		if (result) {
			const postIndex = posts.findIndex((post) => post.id === data.postId);
			if (postIndex !== -1) {
				const commentIndex = posts[postIndex].comments.findIndex((comment) => comment.comment.id === data.commentId);
				if (commentIndex !== -1) {
					posts[postIndex].comments[commentIndex] = result;
					// marche pas alors que ça devrais, flemme de chercher + il est 6h
				} else {
					alert('Comment not found.');
				}
			}
		} else {
			alert('Error editing comment. Please try again later.');
		}
	}
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
				@editComment="editComment"
				@submitComment="(postId, comment) => handleAddComment(posts, postId, comment)"
				@editPost="editPost"
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